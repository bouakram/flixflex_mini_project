/*
moview screen with section of top rated movies and a section for the list of pop movies with pagination
pressing on a card will take you to the detail screen of a specific movie.
*/

import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { COLORS } from '../../constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopRateedList from '../../components/listItem/topRatedList';
import List from '../../components/listItem/list';
import {MoviesResponeType, useGetMoviesQuery, useGetTopRatedMoviesQuery } from '../../store/movies/moviesAPISlice';

export default function MoviesScreen() {
  const insets = useSafeAreaInsets(); // to handlethe top safe area
  const [page, setPage] = React.useState(1);
  const [moviesList, setMoviesList] = useState<MoviesResponeType['results']>([]);
  const { data: mviesList, isFetching: moviesFetching } = useGetMoviesQuery(page);
  const { data: topRatedList, isFetching: topRatedFetching } = useGetTopRatedMoviesQuery();

  useEffect(()=>{
  if (mviesList?.results) {
    if (page === 1) {
      setMoviesList(mviesList.results);
    }else {
      setMoviesList(prevMoviesList =>  [...prevMoviesList, ...mviesList.results] );
    }
  }
  },[mviesList?.results]);

  const loadMore = () => {
  if (mviesList && !moviesFetching && page <= mviesList.total_pages) {
      setPage(page + 1);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor={COLORS[0].background} barStyle={'light-content'} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Rated Movies</Text>
        {
          topRatedFetching ?
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS[0].primary} />
            </View>
            :
            <TopRateedList topRated={topRatedList?.results} type={'movie'} />
        }
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Movies</Text>
        {
          moviesList.length === 0 && moviesFetching ?
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS[0].primary} />
            </View>
            :
            <List loadMore={loadMore} loadingMore={moviesFetching} itemList={moviesList} type={'movie'} />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS[0].background,
  },
  moviesListContainer: { paddingBottom: 350 },
  loadingContainer: {
    // flex: 1,
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
