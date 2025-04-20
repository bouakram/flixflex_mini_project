import { useEffect, useState } from 'react';
import { MediaItem } from '../services/apiService';

const useFetch = (
    getTopRated: () => Promise<any>,
    getPopularList: (page?: number) => Promise<any>
) => {
    const [topRated, setTopRated] = useState<MediaItem[]>([]);
    const [popular, setPopular] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [topRatedResponse, popularResponse] = await Promise.all([
                    getTopRated(),
                    getPopularList(),
                ]);

                setTopRated(topRatedResponse.data.results.slice(0, 5));
                setPopular(popularResponse.data.results);
            } catch (err: any) { // it's better to set it unkown and hanndle it inside the catch block but i'm runing out of time.
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [getTopRated, getPopularList]);

    // handling pagination
      const loadMore = async () => {
        if (loadingMore) return;
        setLoadingMore(true);
        try {
          const nextPage = page + 1;
          const response = await getPopularList(nextPage);
          setPopular((prevPopular) => [...prevPopular, ...response.data.results]);
          setPage(nextPage);
        } catch (err) {
          setError(error);
        } finally {
          setLoadingMore(false);
        }
      };

    return {
        topRated,
        popular,
        loading,
        error,
        loadMore,
        loadingMore,
    };
};

export default useFetch;
