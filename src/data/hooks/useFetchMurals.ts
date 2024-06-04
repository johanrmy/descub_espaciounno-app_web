import { getAllMurals, getCountByArtistId, getMuralById, setCreateMural, setUpdateMural } from '@data/MuralAPI';
import { getCurrentMonthTotalMurals, getTotalMurals, getTotalMuralsByDistrict } from '@data/Statistics.API';
import { initialMuralStatistics } from '@data/initial/initials';
import { useState, useEffect } from 'react';

export const useFetchMurals = () => {
    const [murals, setMurals] = useState<Mural[]>([]);
    const [columnHeaders, setColumnHeaders] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const muralsFetch = await getAllMurals();
                if (muralsFetch.error) {
                    setLoading(false);
                    setError(muralsFetch.error);
                } else {
                    setMurals(muralsFetch.data || []);
                    setLoading(false);
                    if (muralsFetch.data) {
                        setColumnHeaders(['ID','Name','Creation date','Address','Record update', 'Actions'])
                    }
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { murals, columnHeaders, loading, error };
};

export const useFetchMuralById = (id:string) => {
    const [mural, setMural] = useState<Mural | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const muralFetch = await getMuralById(id);
                if (muralFetch.error) {
                    setLoading(false);
                    setError(muralFetch.error);
                } else {
                    setMural(muralFetch.data || null);
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { mural, loading, error };
};

export const useFetchCountMuralByArtistId = (id:string) => {
    const [count, setCount] = useState<{count: number} | null>(null);
    const [errorCount, setErrorCount] = useState<string>('');
    const [loadingCount, setLoadingCount] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countFetch = await getCountByArtistId(id);
                setCount(countFetch)
            } catch (error) {
                setErrorCount('Error fetching data');
            } finally {
                setLoadingCount(false)
            }
        };

        fetchData();
    }, []);

    return { count, loadingCount, errorCount };
};

export const useUpdateMuralById = () => {
    const [errorUpdateMural, setErrorUpdateMural] = useState<boolean>(true);
    const handleUpdateMural = async (id: string, muralData: FormData): Promise<void> => {

        try {
            const response = await setUpdateMural(id, muralData);
            setErrorUpdateMural(!response)
        } catch (error) {
            setErrorUpdateMural(true);
        }
    };

    useEffect(() => {
    }, [errorUpdateMural]);
    
    return { handleUpdateMural, errorUpdateMural};
};

export const useCreateMural = () => {
    const [errorCreateMural, setErrorCreateMural] = useState<boolean>(true);

    const handleCreateMural = async (muralData: FormData): Promise<void> => {
        try {
            const response = await setCreateMural(muralData);
            setErrorCreateMural(!response)
        } catch (error) {
            setErrorCreateMural(true);
        }
    };

    useEffect(() => {
    }, [errorCreateMural]);
    
    return { handleCreateMural, errorCreateMural};
};

export const useMuralsStatisticsData = () => {
    const [totalMurals, setTotalMurals] = useState<CouponStatisticsResponse>(initialMuralStatistics);
    const [currentMonthMurals, setCurrentMonthMurals] = useState<CouponStatisticsResponse>(initialMuralStatistics);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const total = await getTotalMurals();
            setTotalMurals(total);
        } catch (error) {
            setTotalMurals(initialMuralStatistics)
        }
        try {
            const currentMonth = await getCurrentMonthTotalMurals();
            setCurrentMonthMurals(currentMonth);
        } catch (error) {
            setCurrentMonthMurals(initialMuralStatistics);
        }
        };

        fetchData();
    }, []);
    
    return {totalMurals, currentMonthMurals}
}

export const useMuralsInputStatisticsData = () => {
    const [statusTotalMuralsByDistrict, setStatusTotalMuralsByDistrict] = useState<CouponStatisticsResponse>(initialMuralStatistics);

    const handleTotalMuralsByDistrict= async (id: string): Promise<void> => {
        try {
            const response = await getTotalMuralsByDistrict(id);
            setStatusTotalMuralsByDistrict(response)
        } catch (error) {
            setStatusTotalMuralsByDistrict(initialMuralStatistics)
        }
    };
    
    useEffect(() => {
    }, [statusTotalMuralsByDistrict]);

    return {handleTotalMuralsByDistrict, statusTotalMuralsByDistrict}
};