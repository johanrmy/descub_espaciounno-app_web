import api from "@data/api";
import { AxiosResponse } from "axios";

export const getAllPartnerships = async (): Promise<PartnershipsResponse> => {
    try {
        const response: AxiosResponse<Partnership[]> = await api.get('/partnerships');
        return { data: response.data };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: (error as any).response.data.error || 'Unknown error occurred' };
    }
};

export const getPartnershipById = async (id: string): Promise<PartnershipResponse> => {
    const response: AxiosResponse<Partnership> = await api.get(`/partnerships/${id}`);
    return { data: response.data };
};

export const setUpdatePartnershipById = async (id: string, partnershipData: FormData): Promise<PartnershipUpdateResponse> => {
    try {
        const response: AxiosResponse<PartnershipUpdateResponse> = await api.put(`/partnerships/${id}`, partnershipData);
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Actualización exitosa',
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
            message: (error as any).response?.data?.message || 'Error al actualizar la asociación',
        };
    }
}

export const setCreatePartnershipById = async (partnershipData: FormData): Promise<PartnershipUpdateResponse> => {
    try {
        const response: AxiosResponse<PartnershipUpdateResponse> = await api.post(`/partnerships`, partnershipData);
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Registro exitoso',
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
            message: (error as any).response?.data?.message || 'Error al registrar la asociación',
        };
    }
}