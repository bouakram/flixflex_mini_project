import { useEffect, useState } from 'react';
import { CreditsResult, MediaDetails, VideoResult } from '../services/apiService';

export const useFetchDetails = (
    id: string,
    type: 'movie' | 'tv',
    getMovieDetails: (id: string) => Promise<any>,
    getTVShowDetails: (id: string) => Promise<any>,
    getMovieVideos: (id: string) => Promise<any>,
    getTVShowVideos: (id: string) => Promise<any>,
    getMovieCredits: (id: string) => Promise<any>,
    getTVShowCredits: (id: string) => Promise<any>
) => {
    const [details, setDetails] = useState<MediaDetails | null>(null);
    const [videos, setVideos] = useState<VideoResult | undefined>(undefined);
    const [credits, setCredits] = useState<CreditsResult | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const loadData = async () => {
            try {
                const [detailsResponse, videosResponse, creditsResponse] = await Promise.all([
                    type === 'movie' ? getMovieDetails(id) : getTVShowDetails(id),
                    type === 'movie' ? getMovieVideos(id) : getTVShowVideos(id),
                    type === 'movie' ? getMovieCredits(id) : getTVShowCredits(id),
                ]);

                setDetails(detailsResponse.data);
                setCredits(creditsResponse.data);

                const filteredVideos = videosResponse.data.results.filter(
                    (video: VideoResult) =>
                        video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
                );
                setVideos(filteredVideos[0]);
                setError(null);
            } catch (err) {
                setError('Failed to load details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, type]);

    return { details, credits, videos, loading, error };
};
