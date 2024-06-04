interface Scan {
    id: string;
    create_datetime: string;
    partnership_id: string;
    model: string;
    brand: string;
    scanned_datetime: string;
}

interface ScansResponse {
    success: boolean;
    message: string;
    count?: number;
    scans: Scan[];
}