import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../constants/api';
import { COLORS } from '../../constants/styles';

interface MediaCardProps {
  title: string;
  posterPath: string;
  voteAverage: number;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const CARD_HEIGHT = 250;

export const MediaCard: React.FC<MediaCardProps> = ({
  title,
  posterPath,
  voteAverage,
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
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{voteAverage.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: 'relative',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 50,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoContainer: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS[0].text,
  },
  rating: {
    position: 'absolute',
    right: 10,
    bottom: 50,
    backgroundColor: COLORS[0].primary,
    padding: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 16,
    color: COLORS[0].text,
    fontWeight: 'bold',
  },
});
