import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../constants/api';
import { COLORS } from '../../constants/styles';

interface MediaCardTopRatedProps {
  title: string;
  posterPath: string;
  voteAverage: number;
  release_date?: string;
  original_language?: string;
  onPress: () => void;
}

const CARD_WIDTH = 260;
const CARD_HEIGHT = 200;

export const MediaCardTopRated: React.FC<MediaCardTopRatedProps> = ({
  title,
  posterPath,
  voteAverage,
  release_date,
  original_language,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: `${IMAGE_BASE_URL}/${POSTER_SIZE}${posterPath}`,
        }}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.detailsInfoContainer}>
          <Text style={styles.ratingText}>⭐ {voteAverage.toFixed(1)} - </Text>
          <Text style={styles.releaseDate}>{release_date} - </Text>
          <Text style={styles.originalLanguage}>{original_language}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 8,
    width: CARD_WIDTH,
    backgroundColor: COLORS[0].cardBackground,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS[0].text,
  },
  detailsInfoContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  ratingText: {color: COLORS[0].text},
  releaseDate: {color: COLORS[0].text},
  originalLanguage: {color: COLORS[0].text},
});
