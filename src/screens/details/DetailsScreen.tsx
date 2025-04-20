import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
  getTVShowCredits,
  getTVShowDetails,
  getTVShowVideos,
  VideoResult,
} from '../../services/apiService';
import { IMAGE_BASE_URL, BACKDROP_SIZE, PROFILE_SIZE } from '../../constants/api';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/styles';
import { useFetchDetails } from '../../hooks/useFetchDetails';

const { width } = Dimensions.get('window');
const videoHeight = width * 0.5625;

const DetailsScreen: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const { id, type } = route.params;
  console.log(id,type)
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoResult | undefined>(undefined);

  const {details, credits, videos, loading, error} = useFetchDetails(
    id,
    type,
    getMovieDetails,
    getTVShowDetails,
    getMovieVideos,
    getTVShowVideos,
    getMovieCredits,
    getTVShowCredits,
  );

  useEffect(()=>{
    if(details){
      navigation.setOptions({
        title: details.title,
      });
    }
  },[details, navigation]);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setIsPlaying(false);
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS[0].primary} />
      </View>
    );
  }

  if (error || !details) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error || 'Failed to load details'}</Text>
      </View>
    );
  }

  const handlePlayVideo = (video: VideoResult | undefined) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  return (
    <ScrollView style={styles.container}>
      {isPlaying && selectedVideo ? (
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={videoHeight}
            play={isPlaying}
            videoId={selectedVideo.key}
            onChangeState={onStateChange}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setIsPlaying(false);
              setSelectedVideo(undefined);
            }}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Image
          source={{
            uri: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${details.backdrop_path}`,
          }}
          style={styles.backdrop}
        />
      )}

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{details.title || details.name}</Text>
          <Text style={styles.rating}>⭐ {details.vote_average.toFixed(1)}</Text>
        </View>
        <View style={styles.inofontainer}>
          <Text style={styles.date}>
            {details.release_date || details.first_air_date}
          </Text>
          <Text style={styles.countryText}>|</Text>
          <Text style={styles.countryText}>{details.original_language}</Text>
          <Text style={styles.countryText}>|</Text>
          <Text style={styles.countryText}>{details.origin_country}</Text>
        </View>
        <View style={styles.devider}/>
      <View>
        <Text style={styles.sectionTitle}>Genres</Text>
        <View style={styles.genres}>
          {details.genres.map((genre) => (
            <View key={genre.id} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.devider}/>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.creditsContainer}>
          {credits && credits.cast.map((actor) => (
                <View key={actor.original_name} style={styles.creditInfoContainer}>
                  <Image
                    source={{ uri: `${IMAGE_BASE_URL}/${PROFILE_SIZE}/${actor.profile_path}` }}
                    style={styles.actorCard}
                  />
                  <Text style={[styles.countryText, {color: COLORS[0].primary}]}>{actor.original_name.split(' ')[0]}</Text>
                  <Text style={styles.countryText}>{actor.original_name.split(' ').slice(1,).join()}</Text>
                </View>
              ))
        }
        </ScrollView>
        <View style={styles.devider}/>
        <View style={styles.overviewContainer}>
          <Text style={styles.overview}>{details.overview}</Text>
          <TouchableOpacity
            style={styles.videoButton}
            onPress={() => handlePlayVideo(videos)}
          >
            <Text style={styles.videoTitle}>{videos ? 'watch trailer' : 'no video to play'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS[0].background,
  },
  devider: {
    width: width - 20,
    height: 1,
    backgroundColor: COLORS[0].cardBackground,
    marginVertical: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS[0].background,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width - 40,
  },
  backdrop: {
    width,
    height: width * 0.5625,
  },
  videoContainer: {
    width,
    height: videoHeight,
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 4,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS[0].text,
    width: 250,
  },
  sectionTitle: {
    color: COLORS[0].text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  rating: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS[0].text,
  },
  inofontainer: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: 8,
  },
  date: {
    fontSize: 14,
    color: COLORS[0].text,
    marginBottom: 12,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  genreTag: {
    backgroundColor: COLORS[0].primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  countryText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: COLORS[0].text,
  },
  genreText: {
    fontSize: 12,
    color: COLORS[0].text,
  },
  creditsContainer: {
    marginVertical: 8,
    gap: 24,
  },
  creditInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  actorCard: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  overviewContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS[0].text,
    marginBottom: 24,
    textAlign: 'justify',
  },
  videoButton: {
    backgroundColor: COLORS[0].primary,
    padding: 16,
    borderRadius: 8,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS[0].text,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default DetailsScreen;