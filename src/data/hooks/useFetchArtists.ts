import { getAllArtists, getArtistById, setCreateArtist, setUpdateArtist } from '@data/ArtistAPI';
import { getCurrentMonthTotalArtists, getTotalArtists, getTotalPartnerArtists } from '@data/Statistics.API';
import { initialArtistStatistics } from '@data/initial/initials';
import { useState, useEffect } from 'react';

export const useFetchArtists = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [columnHeaders, setColumnHeaders] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artistsFetch = await getAllArtists();
                if (artistsFetch.error) {
                    setLoading(false);
                    setError(artistsFetch.error);
                } else {
                    setArtists(artistsFetch.data || []);
                    setLoading(false);
                    if (artistsFetch.data) {
                        setColumnHeaders(['ID','Nickname','Fullname','Email','Partner','Record update','Actions'])
                    }
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { artists, columnHeaders, loading, error };
};

export const useFetchArtistById = (id:string) => {
    const [artist, setArtist] = useState<Artist | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artistFetch = await getArtistById(id);
                if (artistFetch.error) {
                    setLoading(false);
                    setError(artistFetch.error);
                } else {
                    setArtist(artistFetch.data || null);
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { artist, loading, error };
};

export const useUpdateArtistById = () => {
    const [errorUpdateArtist, setErrorUpdateArtist] = useState<boolean>(true);

    const handleUpdateArtist = async (id: string, artistData: FormData): Promise<void> => {
        try {
            const response = await setUpdateArtist(id, artistData);
            setErrorUpdateArtist(!response)
        } catch (error) {
            setErrorUpdateArtist(true)
        }
    };

    useEffect(() => {
    }, [errorUpdateArtist]);
    return {handleUpdateArtist, errorUpdateArtist}
}

export const useCreateArtist = () => {
    const [errorCreateArtist, setErrorCreateArtist] = useState<boolean>(true);

    const handleCreateArtist = async (artistData: FormData): Promise<void> => {
        try {
            const response = await setCreateArtist(artistData);
            setErrorCreateArtist(!response)
        } catch (error) {
            setErrorCreateArtist(true)
        }
    };

    useEffect(() => {
    }, [errorCreateArtist]);
    return {handleCreateArtist, errorCreateArtist}
}

export const useArtistsStatisticsData = () => {
    const [totalArtists, setTotalArtists] = useState<ArtistStatisticsResponse>(initialArtistStatistics);
    const [totalPartnerArtists, setTotalPartnerArtists] = useState<ArtistStatisticsResponse>(initialArtistStatistics);
    const [currentMonthArtists, setCurrentMonthArtists] = useState<ArtistStatisticsResponse>(initialArtistStatistics);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const total = await getTotalArtists();
            setTotalArtists(total);
        } catch (error) {
            setTotalArtists(initialArtistStatistics);
        }
        try {
            const totalPartner = await getTotalPartnerArtists();
            setTotalPartnerArtists(totalPartner);
        } catch (error) {
            setTotalPartnerArtists(initialArtistStatistics);
        }
        try {
            const currentMonth = await getCurrentMonthTotalArtists();
            setCurrentMonthArtists(currentMonth);
        } catch (error) {
            setCurrentMonthArtists(initialArtistStatistics);
        }
        };

        fetchData();
    }, []);
    
    return {totalArtists, totalPartnerArtists, currentMonthArtists}
}