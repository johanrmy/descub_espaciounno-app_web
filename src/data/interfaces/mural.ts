interface Mural {
    id: string;
    name: string;
    description: string;
    location: {
        crs: {
            type: string;
            properties: {
                name: string;
            };
        };
        type: string;
        coordinates: [number, number];
    };
    creation_date: string;
    url_photo_1: string;
    url_photo_2: string;
    url_photo_3: string;
    colors: string[];
    create_datetime: string;
    update_datetime: string;
    address: Address;
}

interface MuralsResponse {
    data?: Mural[]; 
    error?: string;
}

interface MuralResponse {
    data?: Mural; 
    error?: string;
}

interface MuralRequest {
    name: string;
    description: string;
    lat: number;
    lng: number
    creation_date: string;
    file_a: File | null;
    file_b: File | null;
    file_c: File | null;
}

interface MuralRequestEntry {
    mural: MuralRequest
    address: AddressRequest
}

interface MuralCreateRequestEntry {
    mural: MuralRequest
    address: AddressCreateRequest
}