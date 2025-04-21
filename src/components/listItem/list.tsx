import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { MediaItem } from '../../services/apiService';
import { useNavigation } from '@react-navigation/native';
import { MediaCard } from '../cards/MediaCard';
import { COLORS } from '../../constants/styles';

type ListProps = {
    itemList: MediaItem[];
    loadMore?: () => Promise<void>
    loadingMore?: boolean;
    type: 'movie' | 'tv',
};

const List: React.FC<ListProps> = ({
    itemList,
    loadMore,
    loadingMore,
    type,
}) => {
    const navigation = useNavigation();
    // memoized handler to navigate to detail screen
    const handleCardPress = useCallback((to: string, id: string, type: string) => {
        navigation.navigate(to, { id, type }); // not properly typed not an issue since we know the params
    }, [navigation]);
    // list card
    const renderShowCard = ({ item }: { item: MediaItem }) => (
        <View style={styles.cardContainer}>
          <MediaCard
            title={item.title || item.name}
            posterPath={item.poster_path}
            voteAverage={item.vote_average}
            onPress={() => handleCardPress('Details', item.id,  type)}
          />
        </View>
      );
    return (
        <FlatList
        data={itemList}
        renderItem={renderShowCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.moviesListContainer}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" color={COLORS[0].primary} style={styles.loader} />
          ) : null
        }
      />
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
    },
    moviesListContainer: {paddingBottom: 300},
    loader: {
        marginVertical: 16,
      },
});

export default List;
