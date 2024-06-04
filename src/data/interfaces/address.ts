interface City {
    id: string;
    name: string;
    create_datetime: string;
    update_datetime: string;
}

interface District {
    id: string;
    name: string;
    create_datetime: string;
    update_datetime: string;
    city: City;
}

interface Address {
    id: string;
    name: string;
    create_datetime: string;
    update_datetime: string;
    district: District;
}

interface AddressRequest {
    name: string;
    district_id: string
}

interface AddressCreateRequest {
    name: string;
    district_id: string
    mural_id: string
}
