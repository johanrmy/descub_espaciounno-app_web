import { AxiosResponse } from "axios";
import api from "./api";

export const getAllUsers = async (): Promise<UsersResponse> => {
    try {
        const response: AxiosResponse<User[]> = await api.get('/descub/getUsers');
        return { data: response.data };
    } catch (error) {
        return { error: (error as any).response.data.error || 'Unknown error occurred' };
    }
};

export const getUserById = async (id: string): Promise<UserResponse> => {
    try {
        const { data }: AxiosResponse<UserResponse> = await api.get(`/descub/user/${id}`);
        
        return {
            success: data.success,
            message: data.message || (data.success ? 'Usuario extraído exitosamente' : 'Error al obtener usuario'),
            user: data.success ? data.user : null
        };
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Unknown error occurred',
            user: null
        };
    }
};

export const setUserById = async ( userData: FormData): Promise<UserCUResponse> => {
    try {
        const response: AxiosResponse<UserCUResponse> = await api.post(`/descub/register`, userData);
        const { success, message } = response.data;
        
        return {
            success,
            message: message || (success ? 'registro exitoso' : 'Error en al registrar'),
        };
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Error al registrar',
        };
    }
};

export const setUpdateUserById = async (id: string, userData: FormData): Promise<UserCUResponse> => {
    try {
        const response: AxiosResponse<UserCUResponse> = await api.put(`/descub/user/${id}`, userData);
        const { success, message } = response.data;
        
        return {
            success,
            message: message || (success ? 'Actualización exitosa' : 'Error en la actualización'),
        };
    } catch (error) {
        return {
            success: false,
            message: (error as any).response?.data?.message || 'Error al actualizar el paquete',
        };
    }
}
