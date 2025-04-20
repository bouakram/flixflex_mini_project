/*
tv show screen with section for top 5 rated tv show and a list of tvshow
when press on a card it will take you to the tv show detail screen.
*/

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { getTopRatedTVShows, getPopularTVShows } from '../../services/apiService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/styles';
import useFetch from '../../hooks/useFetch';
import TopRateedList from '../../components/lists/topRatedList';
import List from '../../components/lists/list';

export default function TVShowsScreen() {
  const insets = useSafeAreaInsets(); // to handle the safe area view


  // costum hook to fetch data and fetch data when loading more (pagination)
  const {topRated, popular, loading, loadMore, loadingMore} = useFetch(getTopRatedTVShows, getPopularTVShows);
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
        <Text style={styles.sectionTitle}>Top Rated TV Shows</Text>
        <TopRateedList topRated={topRated} type={'tv'}/>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular TV Shows</Text>
        <List loadMore={loadMore} loadingMore={loadingMore} itemList={popular} type={'tv'}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS[0].background,
  },
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
});
