import { setCreateAddressByMural, setUpdateAddressByMuralId } from "@data/AddressAPI";
import { getCities, getDistrictsByCityId } from "@data/Location";
import { useEffect, useState } from "react";

export const useUpdateAddressById = () => {
    const [errorUpdateAddress , setErrorUpdateAddress ] = useState<boolean>(true);

    const updateAddress = async (id: string, addressData: AddressRequest): Promise<void> => {
        try {
            const response = await setUpdateAddressByMuralId(id, addressData);
            setErrorUpdateAddress(!response); 
        } catch (error) {
            setErrorUpdateAddress(true);
        }
    };

    useEffect(() => {
    }, [errorUpdateAddress]);

    return { updateAddress, errorUpdateAddress };
};

export const useCreateAddress = () => {
    const [errorCreateAddress , setErrorCreateAddress ] = useState<boolean>(true);

    const handleCreateAddress = async (addressData: AddressCreateRequest): Promise<void> => {
        try {
            const response = await setCreateAddressByMural(addressData);
            setErrorCreateAddress(!response); 
        } catch (error) {
            setErrorCreateAddress(true);
        }
    };

    useEffect(() => {
    }, [errorCreateAddress]);

    return { handleCreateAddress, errorCreateAddress };
};

export const UseFetchCities = () => {
    const [cities, setCities] = useState<City[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const citiesFetch = await getCities();
                setCities(citiesFetch);
            } catch (error) {
                setCities([])
            }
        };

        fetchData();
    }, []);

    return cities;
};

export const UseFetchDistrictByCityId = (selectedCity: string) => {
    const [districts, setDistricts] = useState<District[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const districtsFetch = await getDistrictsByCityId(selectedCity);
                setDistricts(districtsFetch);
            } catch (error) {
                setDistricts([])
            }
        };

        fetchData();
    }, [selectedCity]);

    return districts;
};