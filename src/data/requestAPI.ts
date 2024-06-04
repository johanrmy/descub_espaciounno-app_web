import { AxiosResponse } from "axios";
import api from "./api";

export const deleteRecordReq = async (id: string, baseUrl: string) =>{
    try {
        const response: AxiosResponse<{ success: boolean; message: string }> = await api.put(`${baseUrl}/d/${id}`);
        if (response.data && response.data.success) {
            return {
                success: true,
                message: response.data.message || 'Eliminación exitosa',
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Error en la eliminación',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Error al eliminar el registro',
        };
    }
}
