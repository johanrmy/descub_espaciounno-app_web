import { AxiosResponse } from "axios";
import api from "./api";

export const getAllScans = async (): Promise<ScansResponse> => {
    try {
        const response: AxiosResponse<ScansResponse> = await api.get('/scans');
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Cupones extraídos exitosamente',
                count: response.data.count,
                scans: response.data.scans
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Error al obtener cupones',
                count: 0,
                scans: []
            };
        }
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Unknown error occurred',
            count: 0,
            scans: []
        };
    }
};