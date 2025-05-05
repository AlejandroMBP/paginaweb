import { useState, useEffect } from 'react';
import axios from 'axios';
import { Video } from './types';

export function useVideos() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_URL = 'https://serviciopagina.upea.bo/api/VideosAll/10';

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(API_URL);
                setVideos(response.data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching videos:', err);
            }
        };

        fetchVideos();
    }, []);

    return { videos, loading, error };
}
