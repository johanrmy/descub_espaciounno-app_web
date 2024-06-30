import { getAllScans } from '@data/ScanAPI';
import { getCurrentMonthTotalScans, getTotalScans, getTotalScansByBrand } from '@data/Statistics.API';
import { initialScanStatistics, initialTopScanStatistics } from '@data/initial/initials';
import { useState, useEffect } from 'react';

export const useFetchScans = () => {
    const [scans, setScans] = useState<Scan[]>([]);
    const [columnHeaders, setColumnHeaders] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const scansFetch = await getAllScans();
                if (!scansFetch.success) {
                    setLoading(false);
                    setError(scansFetch.message);
                } else {
                    setScans(scansFetch.scans || []);
                    setLoading(false);
                    if (scansFetch.scans) {
                        setColumnHeaders(['Partnership','Create Record','Model'])
                    }
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { scans, columnHeaders, loading, error };
};

export const useScansStatisticsData = () => {
    const [totalScans, setTotalScans] = useState<ScanStatisticsResponse>(initialScanStatistics);
    const [currentMonthScans, setCurrentMonthScans] = useState<ScanStatisticsResponse>(initialScanStatistics);
    const [totalScansByBrand, setTotalScansByBrand] = useState<ScanTopStatisticsResponse>(initialTopScanStatistics);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const total = await getTotalScans();
            setTotalScans(total);
        } catch (error) {
            setTotalScans(initialScanStatistics)
        }
        try {
            const currentMonth = await getCurrentMonthTotalScans();
            setCurrentMonthScans(currentMonth);
        } catch (error) {
            setCurrentMonthScans(initialScanStatistics);
        }
        try {
            const scansByBrand = await getTotalScansByBrand();
            setTotalScansByBrand(scansByBrand);
        } catch (error) {
            setTotalScansByBrand(initialTopScanStatistics);
        }
        };

        fetchData();
    }, []);
    
    return {totalScans, currentMonthScans, totalScansByBrand}
}