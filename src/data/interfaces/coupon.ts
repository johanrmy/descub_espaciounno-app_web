interface CouponGenerate {
    id: string;
    valid_from: string;
    valid_until: string;
    amount: number;
    status: boolean;
    description: string;
    create_datetime: string;
    update_datetime: string;
}

interface Coupon {
    id: string;
    discount: number;
    status: boolean;
    create_datetime: string;
    update_datetime: string;
    coupon_generate: CouponGenerate
}

interface CouponsResponse {
    success: boolean;
    message: string;
    count: number;
    coupons: Coupon[];
}

interface CouponCUResponse {
    success: boolean;
    message: string;
    coupon?: Coupon | null;
}

interface CouponRequestEntry {
    status: boolean;
    discount: number;
}

interface CouponGenerateCUResponse {
    success: boolean;
    message: string;
    couponCount?: number;
}

interface CouponGenerateResponse {
    success: boolean;
    message: string;
    coupon_generate: CouponGenerate | null;
    coupons: Coupon[];
}

interface CouponsGenerateResponse {
    success: boolean;
    message: string;
    count: number;
    coupons_generate: CouponGenerate[];
}

interface CouponGenerateRequestEntry {
    valid_from: string;
    valid_until: string;
    amount: number;
    status: boolean;
    description: string;
    discount: number;
}

interface CouponGenerateUpdateRequestEntry {
    valid_from: string;
    valid_until: string;
    status: boolean;
    description: string;
    discount: number;
}
