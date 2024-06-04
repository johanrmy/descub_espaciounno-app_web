interface User {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    profile_photo: string,
    is_admin: boolean,
    is_superadmin: boolean,
    create_datetime: string,
    update_datetime: string
}

interface UsersResponse {
    data?: User[];
    error?: string;
}

interface UserResponse {
    success: boolean;
    message: string;
    user: User | null
}

interface UserCUResponse {
    success: boolean;
    message: string;
}

interface UserRequestEntry {
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
    is_superadmin: boolean;
    password: string;
    confirm_password: string;
    file_a: File | null;
}