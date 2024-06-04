import api from "./api";
import { AxiosResponse } from "axios";

export const setCreateCouponGenerate = async (couponGenerateData: FormData): Promise<CouponGenerateCUResponse> => {
    try {
        const response: AxiosResponse<CouponGenerateCUResponse> = await api.post(`/couponGenerates`, couponGenerateData);
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Registro exitoso',
                couponCount: response.data.couponCount
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Error en el registro',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Unknown error occurred',
        };
    }
}

export const getAllCouponsGenerate = async (): Promise<CouponsGenerateResponse> => {
    try {
        const response: AxiosResponse<CouponsGenerateResponse> = await api.get('/couponGenerates');
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Paquetes extraídos exitosamente',
                count: response.data.count,
                coupons_generate: response.data.coupons_generate
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Error al obtener paquetes',
                count: 0,
                coupons_generate: []
            };
        }
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Unknown error occurred',
            count: 0,
            coupons_generate: []
        };
    }
};

export const getCouponGenerateById = async (id: string): Promise<CouponGenerateResponse> => {
    try {
        const response: AxiosResponse<CouponGenerateResponse> = await api.get(`/couponGenerates/${id}`);
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Paquete extraído exitosamente',
                coupon_generate: response.data.coupon_generate,
                coupons: response.data.coupons
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Error al obtene paquete',
                coupon_generate: null,
                coupons: []
            };
        }
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Unknown error occurred',
            coupon_generate: null,
            coupons: []
        };
    }
};

export const setUpdateCouponGenerateById = async (id: string, couponGenerateData: FormData): Promise<CouponGenerateCUResponse> => {
    try {
        const response: AxiosResponse<CouponGenerateCUResponse> = await api.put(`/couponGenerates/${id}`, couponGenerateData);
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Actualización exitosa',
                couponCount: response.data.couponCount
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Error en la actualización',
                couponCount: 0
            };
        }
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Error al actualizar la paquete',
            couponCount: 0
        };
    }
}
