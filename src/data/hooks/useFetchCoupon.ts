import { getAllCouponsGenerate, getCouponGenerateById, setCreateCouponGenerate, setUpdateCouponGenerateById } from "@data/CouponGenerateAPI";
import { getAllCoupons, getCouponById, getVerifyCouponById, setClaimCouponById, setUpdateCouponById } from "@data/CouponAPI";
import { useEffect, useState } from "react";
import { initialCouponGenerateStatistics, initialCouponStatistics } from "@data/initial/initials";
import { getCouponsGenerateByPeriod, getCurrentMonthTotalCoupons, getTotalCoupons } from "@data/Statistics.API";

export const useCreateCouponGenerate = () => {
    const [statusCreateCouponGenerate, setStatusCreateCouponGenerate] = useState<CouponGenerateCUResponse>({success: true, message: 'Ocurrió un incidente al registrar'});

    const handleCreateCouponGenerate = async (couponGenerateData: FormData): Promise<void> => {
        try {
            const response = await setCreateCouponGenerate(couponGenerateData);
            setStatusCreateCouponGenerate(response)
        } catch (error) {
            setStatusCreateCouponGenerate({success: false, message: 'Error fetching data'})
        }
    };

    useEffect(() => {
    }, [statusCreateCouponGenerate]);

    return {handleCreateCouponGenerate, statusCreateCouponGenerate}
}

export const useFetchCoupons = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [columnHeaders, setColumnHeaders] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const couponsFetch = await getAllCoupons();
                if (!couponsFetch.success) {
                    setLoading(false);
                    setError(couponsFetch.message);
                } else {
                    setCoupons(couponsFetch.coupons);
                    setLoading(false);
                    if (couponsFetch.coupons) {
                        setColumnHeaders(['ID', 'Coupon generate' ,'Record creation', 'Discount','Status','Validity range','Record update','Actions'])
                    }
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { coupons, columnHeaders, loading, error };
};

export const useFetchCouponsGenerate = () => {
    const [couponsGenerate, setCouponsGenerate] = useState<CouponGenerate[]>([]);
    const [columnHeaders, setColumnHeaders] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const couponsFetch = await getAllCouponsGenerate();
                if (!couponsFetch.success) {
                    setLoading(false);
                    setError(couponsFetch.message);
                } else {
                    setCouponsGenerate(couponsFetch.coupons_generate);
                    setLoading(false);
                    if (couponsFetch.coupons_generate) {
                        setColumnHeaders(['ID','Validity range','Amount','Status','Record update','Actions'])
                    }
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { couponsGenerate, columnHeaders, loading, error };
};

export const useFetchCouponGenerateById = (id:string) => {
    const [couponGenerate, setCouponGenerate] = useState<CouponGenerate | null>(null);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [columnHeaders, setColumnHeaders] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const couponGenerateFetch = await getCouponGenerateById(id);
                if (!couponGenerateFetch.success) {
                    setLoading(false);
                    setError(couponGenerateFetch.message);
                } else {
                    setCouponGenerate(couponGenerateFetch.coupon_generate || null);
                    setCoupons(couponGenerateFetch.coupons)
                    setLoading(false);
                    setColumnHeaders(['ID','Record creation', 'Discount','Status','Record update','Actions'])
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { couponGenerate, coupons, columnHeaders, loading, error };
};

export const useUpdateCouponGenerateById = () => {
    const [statusUpdateCouponGenerate, setStatusUpdateCouponGenerate] = useState<CouponGenerateCUResponse>({success: false, message: ''});

    const handleUpdateCouponGenerate = async (id: string, couponGenerateData: FormData): Promise<void> => {
        try {
            const response = await setUpdateCouponGenerateById(id, couponGenerateData);
            setStatusUpdateCouponGenerate(response)
        } catch (error) {
            setStatusUpdateCouponGenerate({success: false, message: 'Error fetching data'})
        }
    };

    useEffect(() => {
    }, [statusUpdateCouponGenerate]);

    return {handleUpdateCouponGenerate, statusUpdateCouponGenerate}
}

export const useUpdateCouponById = () => {
    const [statusUpdateCoupon, setStatusUpdateCoupon] = useState<CouponCUResponse>({success: false, message: ''});

    const handleUpdateCoupon = async (id: string, couponData: FormData): Promise<void> => {
        try {
            const response = await setUpdateCouponById(id, couponData);
            setStatusUpdateCoupon(response)
        } catch (error) {
            setStatusUpdateCoupon({success: false, message: 'Error fetching data'})
        }
    };

    useEffect(() => {
    }, [statusUpdateCoupon]);

    return {handleUpdateCoupon, statusUpdateCoupon}
}

export const useFetchCouponById = (id:string) => {
    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const couponFetch = await getCouponById(id);
                if (!couponFetch.success) {
                    setLoading(false);
                    setError(couponFetch.message);
                } else {
                    setCoupon(couponFetch.coupon || null);
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { coupon, loading, error };
};

export const useVerifyCouponById = () => {
    const [statusVerifyCoupon, setStatusVerifyCoupon] = useState<CouponCUResponse>({success: false, message: ''});

    const handleVerifyCoupon = async (id: string): Promise<void> => {
        try {
            const response = await getVerifyCouponById(id);
            setStatusVerifyCoupon(response)
        } catch (error) {
            setStatusVerifyCoupon({success: false, message: 'Error fetching data'})
        }
    };

    useEffect(() => {
    }, [statusVerifyCoupon]);

    return {handleVerifyCoupon, statusVerifyCoupon}
};

export const useClaimCouponById = () => {
    const [statusClaimCoupon, setStatusClaimCoupon] = useState<CouponCUResponse>({success: false, message: ''});

    const handleClaimCoupon = async (couponData: FormData): Promise<void> => {
        try {
            const response = await setClaimCouponById(couponData);
            setStatusClaimCoupon(response)
        } catch (error) {
            setStatusClaimCoupon({success: false, message: 'Error fetching data'})
        }
    };

    useEffect(() => {
    }, [statusClaimCoupon]);

    return {handleClaimCoupon, statusClaimCoupon}
};

export const useCouponsStatisticsData = () => {
    const [totalCoupons, setTotalCoupons] = useState<CouponStatisticsResponse>(initialCouponStatistics);
    const [currentMonthCoupons, setCurrentMonthCoupons] = useState<CouponStatisticsResponse>(initialCouponStatistics);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const total = await getTotalCoupons();
            setTotalCoupons(total);
        } catch (error) {
            setTotalCoupons(initialCouponStatistics)
        }
        try {
            const currentMonth = await getCurrentMonthTotalCoupons();
            setCurrentMonthCoupons(currentMonth);
        } catch (error) {
            setCurrentMonthCoupons(initialCouponStatistics);
        }
        };

        fetchData();
    }, []);
    
    return {totalCoupons, currentMonthCoupons}
}

export const useCouponsGenerateStatisticsData = () => {
    const [couponsGenerateByPeriod, setCouponsGenerateByPeriod] = useState<CouponGenerateStatisticsResponse>(initialCouponGenerateStatistics);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const periodFetch = await getCouponsGenerateByPeriod();
            setCouponsGenerateByPeriod(periodFetch);
        } catch (error) {
            setCouponsGenerateByPeriod(initialCouponGenerateStatistics);
        }
        };

        fetchData();
    }, []);
    
    return {couponsGenerateByPeriod}
}