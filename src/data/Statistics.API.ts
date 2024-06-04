import { AxiosResponse } from 'axios';
import api from './api';
interface BaseResponse {
    success: boolean;
    message: string;
    value: any;
}

const fetchStatistics = async <T extends BaseResponse>(url: string): Promise<T> => {
    const response: AxiosResponse<T> = await api.get(url);
    const { value } = response.data;

    return {
        ...response.data,
        value: value,
    };
};

//Murals
export const getTotalMurals = async (): Promise<MuralStatisticsResponse> => {
    return fetchStatistics<MuralStatisticsResponse>('/murals/totalMurals');
};

export const getCurrentMonthTotalMurals = async (): Promise<MuralStatisticsResponse> => {
    return fetchStatistics<MuralStatisticsResponse>('/murals/currentMonthTotalMurals');
};

export const getTotalMuralsByDistrict = async (district_id: string): Promise<MuralStatisticsResponse> => {
    return fetchStatistics<MuralStatisticsResponse>(`/murals/totalMuralsByDistrict/${district_id}`);
};

//Coupons
export const getTotalCoupons = async (): Promise<CouponStatisticsResponse> => {
    return fetchStatistics<CouponStatisticsResponse>('/coupons/totalCoupons');
};

export const getCurrentMonthTotalCoupons = async (): Promise<CouponStatisticsResponse> => {
    return fetchStatistics<CouponStatisticsResponse>('/coupons/currentMonthTotalCoupons');
};

//Coupons Generate
export const getCouponsGenerateByPeriod = async (): Promise<CouponGenerateStatisticsResponse> => {
    return fetchStatistics<CouponGenerateStatisticsResponse>('/couponGenerates/byPeriod');
};

//Artists
export const getTotalArtists = async (): Promise<ArtistStatisticsResponse> => {
    return fetchStatistics<ArtistStatisticsResponse>('/artists/totalArtists');
};

export const getCurrentMonthTotalArtists = async (): Promise<ArtistStatisticsResponse> => {
    return fetchStatistics<ArtistStatisticsResponse>('/artists/currentMonthTotalArtist');
};

export const getTotalPartnerArtists = async (): Promise<ArtistStatisticsResponse> => {
    return fetchStatistics<ArtistStatisticsResponse>('/artists/totalPartnerArtists');
};

//Partnerships
export const getTotalPartnerships = async (): Promise<PartnershipStatisticsResponse> => {
    return fetchStatistics<PartnershipStatisticsResponse>('/partnerships/totalPartnerships');
};

export const getCurrentMonthTotalPartnerships = async (): Promise<PartnershipStatisticsResponse> => {
    return fetchStatistics<PartnershipStatisticsResponse>('/partnerships/currentMonthTotalPartnerships');
};

export const getTopArtistByPartnership = async (): Promise<PartnershipTopStatisticsResponse> => {
    return fetchStatistics<PartnershipTopStatisticsResponse>('/partnerships/topArtistByPartnership');
};

//Scans
export const getTotalScans = async (): Promise<ScanStatisticsResponse> => {
    return fetchStatistics<ScanStatisticsResponse>('/scans/totalScans');
};

export const getCurrentMonthTotalScans= async (): Promise<ScanStatisticsResponse> => {
    return fetchStatistics<ScanStatisticsResponse>('/scans/currentMonthTotalScans');
};

export const getTotalScansByBrand = async (): Promise<ScanTopStatisticsResponse> => {
    return fetchStatistics<ScanTopStatisticsResponse>('/scans/totalScansByBrand');
};