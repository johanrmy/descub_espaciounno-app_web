import api from "@data/api";
import axios, { AxiosResponse } from "axios";

export const getAllMurals = async (): Promise<MuralsResponse> => {
    try {
        const response: AxiosResponse<Mural[]> = await api.get('/murals');
        return { data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { error: error.response?.data?.error || 'An unexpected error occurred' };
        } else {
            return { error: 'An unexpected error occurred' };
        }
    }
};


export const getMuralById = async (id:string): Promise<MuralResponse> => {
    try {
        const response: AxiosResponse<Mural> = await api.get(`/murals/${id}`);
        return { data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { error: error.response?.data?.error || 'An unexpected error occurred' };
        } else {
            return { error: 'An unexpected error occurred' };
        }
    }
};

export const getCountByArtistId = async (id:string): Promise<{count: number}> => {
    const response: AxiosResponse<{count: number}> = await api.get(`/murals/countByArtistId/${id}`);
    return  response.data;
};

export const setUpdateMural = async (id: string, muralData: FormData): Promise<boolean> => {
    try {
        await api.put(`/murals/${id}`, muralData);
        return true
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return false
        } else {
            return false;
        }
    }
};

export const setCreateMural = async (muralData: FormData): Promise<boolean> => {
    try {
        await api.post(`/murals/wAddress`, muralData);
        return true
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return false
        } else {
            return false;
        }
    }
};
