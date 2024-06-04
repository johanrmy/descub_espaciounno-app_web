import api from "@data/api";
import axios, { AxiosResponse } from "axios";

export const getAllArtists = async (): Promise<ArtistsResponse> => {
    try {
        const response: AxiosResponse<Artist[]> = await api.get('/artists');
        return { data: response.data };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: (error as any).response.data.error || 'Unknown error occurred' };
    }
};

export const getArtistById = async (id:string): Promise<ArtistResponse> => {
    try {
        const response: AxiosResponse<Artist> = await api.get(`/artists/${id}`);
        return { data: response.data };
    } catch (error) {
        return { error: (error as any).response.data.error || 'Unknown error occurred' };
    }
};

export const setUpdateArtist = async(id:string, artistData: FormData): Promise<boolean> => {
    try {
        await api.put(`/artists/${id}`, artistData)
        return true
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return false
        } else {
            return false;
        }
    }
}

export const setCreateArtist = async(artistData: FormData): Promise<boolean> => {
    try {
        await api.post(`/artists`, artistData)
        return true
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return false
        } else {
            return false;
        }
    }
}
