import { getPartnershipById, getAllPartnerships, setCreatePartnershipById, setUpdatePartnershipById } from '@data/PartnershipAPI';
import { getCurrentMonthTotalPartnerships, getTopArtistByPartnership, getTotalPartnerships } from '@data/Statistics.API';
import { initialPartnershipStatistics, initialTopPartnershipStatistics } from '@data/initial/initials';
import { useState, useEffect } from 'react';

export const useFetchPartnerships = () => {
    const [partnerships, setPartnerships] = useState<Partnership[]>([]);
    const [columnHeaders, setColumnHeaders] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const partnershipsFetch = await getAllPartnerships();
                if (partnershipsFetch.error) {
                    setLoading(false);
                    setError(partnershipsFetch.error);
                } else {
                    setPartnerships(partnershipsFetch.data || []);
                    setLoading(false);
                    if (partnershipsFetch.data) {
                        setColumnHeaders(['ID','Record creation','Nickname','Mural ID','Name','Actions'])
                    }
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { partnerships, columnHeaders, loading, error };
};

export const useFetchPartnershipById = (id:string) => {
    const [partnership, setPartnership] = useState<Partnership | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const partnershipFetch = await getPartnershipById(id);
                if (partnershipFetch.error) {
                    setLoading(false);
                    setError(partnershipFetch.error);
                } else {
                    setPartnership(partnershipFetch.data || null);
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { partnership, loading, error };
};

export const useUpdatePartnershipById = () => {
    const [errorUpdatePartnership, setErrorUpdatePartnership] = useState<PartnershipUpdateResponse>({success: false, message: ''});

    const handleUpdatePartnership = async (id: string, partnershipData: FormData): Promise<void> => {
        try {
            const response = await setUpdatePartnershipById(id, partnershipData);
            setErrorUpdatePartnership(response)
        } catch (error) {
            setErrorUpdatePartnership({success: false, message: 'Error fetching data'})
        }
    };

    useEffect(() => {
    }, [errorUpdatePartnership]);

    return {handleUpdatePartnership, errorUpdatePartnership}
}

export const useCreatePartnershipById = () => {
    const [errorCreatePartnership, setErrorCreatePartnership] = useState<PartnershipUpdateResponse>({success: true, message: 'Ocurrió un incidente al registrar'});

    const handleCreatePartnership = async (partnershipData: FormData): Promise<void> => {
        try {
            const response = await setCreatePartnershipById(partnershipData);
            setErrorCreatePartnership(response)
        } catch (error) {
            setErrorCreatePartnership({success: false, message: 'Error fetching data'})
        }
    };

    useEffect(() => {
    }, [errorCreatePartnership]);

    return {handleCreatePartnership, errorCreatePartnership}
}

export const usePartnershipsStatisticsData = () => {
    const [totalPartnerships, setTotalPartnerships] = useState<PartnershipStatisticsResponse>(initialPartnershipStatistics);
    const [currentMonthPartnerships, setCurrentMonthPartnerships] = useState<PartnershipStatisticsResponse>(initialPartnershipStatistics);
    const [topArtistByPartnership, setTopArtistByPartnership] = useState<PartnershipTopStatisticsResponse>(initialTopPartnershipStatistics);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const total = await getTotalPartnerships();
            setTotalPartnerships(total);
        } catch (error) {
            setTotalPartnerships(initialPartnershipStatistics)
        }
        try {
            const currentMonth = await getCurrentMonthTotalPartnerships();
            setCurrentMonthPartnerships(currentMonth);
        } catch (error) {
            setCurrentMonthPartnerships(initialPartnershipStatistics);
        }
        try {
            const topArtist = await getTopArtistByPartnership();
            setTopArtistByPartnership(topArtist);
        } catch (error) {
            setTopArtistByPartnership(initialTopPartnershipStatistics);
        }
        };

        fetchData();
    }, []);
    
    return {totalPartnerships, currentMonthPartnerships, topArtistByPartnership}
}