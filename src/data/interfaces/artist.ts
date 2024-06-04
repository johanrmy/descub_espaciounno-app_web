interface Artist {
    id: string;
    name: string;
    last_name: string;
    nickname: string;
    email: string;
    user_instagram: string;
    user_facebook: string;
    user_tiktok: string;
    is_partner: boolean;
    description: string;
    employment: string;
    url_photo1: string;
    url_photo2: string;
    url_photo3: string;
    create_datetime: string;
    update_datetime: string;
}

interface ArtistsResponse {
    data?: Artist[];
    error?: string;
}

interface ArtistResponse {
    data?: Artist; 
    error?: string;
}

interface ArtistRequestEntry {
    name: string;
    last_name: string;
    nickname: string;
    email: string;
    user_instagram: string;
    user_facebook: string;
    user_tiktok: string;
    is_partner: boolean;
    description: string;
    employment: string;
    file_a: File | null;
    file_b: File | null;
    file_c: File | null;
}
