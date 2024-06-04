import { AxiosResponse } from "axios";
import api from "./api";

export const getCities = async (): Promise<City[]> => {
    const response: AxiosResponse<City[]> = await api.get('/cities');
    return response.data;
};

export const getDistrictsByCityId = async (id: string): Promise<District[]> => {
    const response: AxiosResponse<District[]> = await api.get(`/districts/byCity/${id}`);
    return response.data
};