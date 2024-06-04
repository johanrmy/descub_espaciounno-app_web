export const initialMuralData: MuralRequestEntry = {
    mural: {
        name: '',
        creation_date: '',
        description: '',
        lat: 0,
        lng: 0,
        file_a: null,
        file_b: null,
        file_c: null
    },
    address: {
        name: '',
        district_id: ''
    }
};

export const initialCreateMuralData: MuralCreateRequestEntry = {
    mural: {
        name: '',
        creation_date: '',
        description: '',
        lat: 0,
        lng: 0,
        file_a: null,
        file_b: null,
        file_c: null
    },
    address: {
        name: '',
        district_id: '',
        mural_id: ''
    }
};

export const initialClickedCoords: marker = {
    lat: 0.000,
    lng: 0.000
}


export const initialClickedStoreCoords: marker = {
    lat: -12.149374516383128,
    lng: -77.0228599011898
}

export const initialArtistData: ArtistRequestEntry = {
    name: '',
    last_name: '',
    nickname: '',
    email: '',
    user_instagram: '',
    user_facebook: '',
    user_tiktok: '',
    is_partner: false,
    employment: '',
    description: '',
    file_a: null,
    file_b: null,
    file_c: null,
}

export const initialPartnershipData: PartnershipRequestEntry = {
    artist_id: '',
    mural_id: '',
}

export const initialCouponGenerateData: CouponGenerateRequestEntry = {
    valid_from: '',
    valid_until: '',
    amount: 1,
    description: '',
    discount: 10,
    status: false,
}

export const initalCouponCUResponse: CouponCUResponse = {
    message: '',
    success: false,
    coupon: null
}

export const initialUserData: UserRequestEntry = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    is_admin: false,
    is_superadmin: false,
    file_a: null
}

export const initialCouponStatistics: CouponStatisticsResponse = {
    success: false,
    message: '',
    value: null
}

export const initialCouponGenerateStatistics: CouponGenerateStatisticsResponse = {
    success: false,
    message: '',
    value: {}
}

export const initialMuralStatistics: MuralStatisticsResponse = {
    success: false,
    message: '',
    value: null
}

export const initialArtistStatistics: ArtistStatisticsResponse = {
    success: false,
    message: '',
    value: null
}

export const initialPartnershipStatistics: PartnershipStatisticsResponse = {
    success: false,
    message: '',
    value: null
}

export const initialTopPartnershipStatistics: PartnershipTopStatisticsResponse = {
    success: false,
    message: '',
    value: []
}

export const initialScanStatistics: ScanStatisticsResponse = {
    success: false,
    message: '',
    value: null
}

export const initialTopScanStatistics: ScanTopStatisticsResponse = {
    success: false,
    message: '',
    value: []
}
