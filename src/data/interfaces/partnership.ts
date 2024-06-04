interface Partnership {
    id: string;
    create_datetime: string;
    update_datetime: string;
    artist: Artist;
    mural: Mural;
}

interface PartnershipsResponse {
    data?: Partnership[];
    error?: string;
}

interface PartnershipResponse {
    data?: Partnership;
    error?: string;
}

interface PartnershipUpdateResponse {
    success: boolean;
    message: string;
}

interface PartnershipRequestEntry {
    artist_id: string;
    mural_id: string;
}
