import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { MediaItem } from '../../services/apiService';
import { MediaCardTopRated } from '../cards/MediaCardTopRated';
import { useNavigation } from '@react-navigation/native';

type TopRatedListProps = {
    topRated: MediaItem[];
    type: 'movie' | 'tv'
};

const TopRateedList: React.FC<TopRatedListProps> = ({
    topRated,
    type,
}) => {
    const navigation = useNavigation();
    // memoized handler to navigate to detail screen
    const handleCardPress = useCallback((to: string, id: string, type: string) => {
        navigation.navigate(to, { id, type }); // not properly typed not an issue since we know the params
    }, [navigation]);
    // top rated card
    const renderTopShowCard = ({ item }: { item: MediaItem }) => (
        <View style={styles.cardContainer}>
            <MediaCardTopRated
                title={item.title}
                posterPath={item.poster_path}
                voteAverage={item.vote_average}
                original_language={item.original_language}
                release_date={item.release_date}
                onPress={() => handleCardPress('Details', item.id, type)}
            />
        </View>
    );
    return (
        <FlatList
            data={topRated}
            renderItem={renderTopShowCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
        />
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 8,
    },
    horizontalList: {
        paddingRight: 16,
    },
});

export default TopRateedList;
