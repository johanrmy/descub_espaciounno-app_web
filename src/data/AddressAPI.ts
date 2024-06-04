import axios from "axios";
import api from "./api"


export const setUpdateAddressByMuralId = async (id: string, addressData: AddressRequest): Promise<boolean> => {
    try {
        await api.put(`/addresses/${id}`, addressData);
        return true
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return false
        } else {
            return false;
        }
    }
};

export const setCreateAddressByMural = async (addressData: AddressRequest): Promise<boolean> => {
    try {
        await api.post(`/addresses/`, addressData);
        return true
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return false
        } else {
            return false;
        }
    }
};