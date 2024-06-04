interface BaseResponse {
    success: boolean;
    message: string;
    value: any;
}

interface ValueCouponGenerateStatistics {
    coupon_generate_id: string;
    total_coupons: number;
}

interface ValuePartnershipStatistics {
    partnershipCount: string;
    artist: {
        id: string;
        nickname: string;
    };
}

interface ValueScanStatistics {
    brand: string;
    scanCount: number
}

interface MuralStatisticsResponse extends BaseResponse {
    value: number | null;
}

interface CouponStatisticsResponse extends BaseResponse {
    value: number | null
}

interface ArtistStatisticsResponse extends BaseResponse {
    value: number | null
}

interface CouponGenerateStatisticsResponse extends BaseResponse {
    value: { [key: string]: ValueCouponGenerateStatistics[] };
}

interface PartnershipStatisticsResponse extends BaseResponse {
    value: number | null;
}

interface PartnershipTopStatisticsResponse extends BaseResponse {
    value: ValuePartnershipStatistics[]
}

interface ScanStatisticsResponse extends BaseResponse {
    value: number | null;
}

interface ScanTopStatisticsResponse extends BaseResponse {
    value: ValueScanStatistics[]
}