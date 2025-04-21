import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MediaCard } from '../../components/cards/MediaCard';
import { searchMovies, searchTVShows, MediaItem } from '../../services/apiService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/styles';
import Icon from '@react-native-vector-icons/ionicons';

type SearchResult = MediaItem & { type: 'movie' | 'tv' };

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // it can be a costom hook
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const [movieResults, tvResults] = await Promise.all([
        searchMovies(query),
        searchTVShows(query),
      ]);

      const combinedResults: SearchResult[] = [
        ...movieResults.data.results.map((item: MediaItem) => ({ ...item, type: 'movie' as const })),
        ...tvResults.data.results.map((item: MediaItem) => ({ ...item, type: 'tv' as const })),
      ];

      setResults(combinedResults);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // it can be a component
  const renderItem = ({ item }: { item: SearchResult }) => (
    <View style={styles.cardContainer}>
      <MediaCard
        title={item.title}
        posterPath={item.poster_path}
        voteAverage={item.vote_average}
        onPress={() => navigation.navigate('Details', { id: item.id, type: item.type })}
      />
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor={COLORS[0].background} barStyle={'light-content'}/>
      <View style={styles.searchContainer}>
        <View style={styles.inputWithIcon}>
          <Icon name="search" size={20} color={COLORS[0].inputPlaceholder} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies and TV shows..."
          placeholderTextColor={COLORS[0].inputPlaceholder}
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color={COLORS[0].primary} />
      ) : results.length > 0 ? (
        // it can be a compoenent
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.resultsList}
        />
      ) : searchQuery.length > 0 ? (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      ) : (
      <View style={styles.noResults}>
          <Text style={styles.noResultsText}>Start search now!!</Text>
        </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS[0].background,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: COLORS[0].background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS[0].border,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS[0].cardBackground,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
    color: COLORS[0].text,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resultsList: {
    padding: 8,
  },
  cardContainer: {
    flex: 1,
    margin: 8,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS[0].primary,
  },
});