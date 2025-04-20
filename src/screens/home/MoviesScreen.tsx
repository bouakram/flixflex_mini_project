/*
moview screen with section of top rated movies and a section for the list of pop movies with pagination
pressing on a card will take you to the detail screen of a specific movie.
*/

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { getTopRatedMovies, getPopularMovies } from '../../services/apiService';
import { COLORS } from '../../constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useFetch from '../../hooks/useFetch';
import TopRateedList from '../../components/lists/topRatedList';
import List from '../../components/lists/list';

export default function MoviesScreen() {
  const insets = useSafeAreaInsets(); // to handlethe top safe area
    // costum hook to fetch data and fetch data when loading more (pagination)
    const {topRated, popular, loading, loadMore, loadingMore} = useFetch(getTopRatedMovies, getPopularMovies);

  // handling when fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS[0].primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <StatusBar backgroundColor={COLORS[0].background} barStyle={'light-content'}/>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Rated Movies</Text>
        <TopRateedList topRated={topRated} type={'movie'}/>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Movies</Text>
        <List loadMore={loadMore} loadingMore={loadingMore} itemList={popular} type={'movie'}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS[0].background,
  },
  moviesListContainer: {paddingBottom: 350},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS[0].background,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS[0].text,
    marginBottom: 8,
  },
  horizontalList: {
    paddingRight: 16,
  },
  cardContainer: {
    marginHorizontal: 8,
  },
  loader: {
    marginVertical: 16,
  },
});
