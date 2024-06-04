import { AxiosResponse } from "axios";
import api from "./api";

export const getAllCoupons = async (): Promise<CouponsResponse> => {
    try {
        const response: AxiosResponse<CouponsResponse> = await api.get('/coupons');
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Cupones extraídos exitosamente',
                count: response.data.count,
                coupons: response.data.coupons
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Error al obtener cupones',
                count: 0,
                coupons: []
            };
        }
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Unknown error occurred',
            count: 0,
            coupons: []
        };
    }
};

export const getCouponById = async (id: string): Promise<CouponCUResponse> => {
    try {
        const response: AxiosResponse<CouponCUResponse> = await api.get(`/coupons/${id}`);
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Cupón extraído exitosamente',
                coupon: response.data.coupon
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Error al obtener Cupón',
                coupon: null
            };
        }
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Unknown error occurred',
            coupon: null
        };
    }
};

export const setUpdateCouponById = async (id: string, couponData: FormData): Promise<CouponCUResponse> => {
    try {
        const response: AxiosResponse<CouponCUResponse> = await api.put(`/coupons/${id}`, couponData);
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Actualización exitosa'
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Error en la actualización',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Unknown error occurred',
        };
    }
}

export const getVerifyCouponById = async (id: string): Promise<CouponCUResponse> => {
    try {
        const response: AxiosResponse<CouponCUResponse> = await api.get(`/coupons/verify/${id}`);
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Cupón válido',
                coupon: response.data.coupon
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Cupón inválido',
                coupon: null
            };
        }
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Unknown error occurred',
            coupon: null
        };
    }
};

export const setClaimCouponById = async (couponData: FormData): Promise<CouponCUResponse> => {
    try {
        const response: AxiosResponse<CouponCUResponse> = await api.post(`/coupons/claim`,couponData);
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Cupón reclamado',
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Hubo un problema al reclamar cupón',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Unknown error occurred',
        };
    }
};
