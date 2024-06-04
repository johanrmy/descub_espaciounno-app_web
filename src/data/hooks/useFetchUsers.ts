import { getAllUsers, getUserById, setUpdateUserById, setUserById } from "@data/UserAPI";
import { useEffect, useState } from "react";

export const useFetchUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersFetch = await getAllUsers();
                if (usersFetch.error) {
                    setLoading(false);
                    setError(usersFetch.error);
                } else {
                    setUsers(usersFetch.data || []);
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { users, loading, error };
};

export const useFetchUserById = (id:string) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userFetch = await getUserById(id);
                if (!userFetch.success) {
                    setLoading(false);
                    setError(userFetch.message);
                } else {
                    setUser(userFetch.user || null);
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { user, loading, error };
};

export const useUpdateUserById = () => {
    const [statusUpdateUser, setStatusUpdateUser] = useState<UserCUResponse>({success: false, message: ''});

    const handleUpdateUser = async (id: string, userData: FormData): Promise<void> => {
        try {
            const response = await setUpdateUserById(id, userData);
            setStatusUpdateUser(response)
        } catch (error) {
            setStatusUpdateUser({success: false, message: 'Error fetching data'})
        }
    };

    useEffect(() => {
    }, [statusUpdateUser]);

    return {handleUpdateUser, statusUpdateUser}
}

export const useCreateUser = () => {
    const [statusCreateUser, setStatusCreateUser] = useState<UserCUResponse>({success: true, message: 'Ocurrió un incidente al registrar'});

    const handleCreateUser = async (userData: FormData): Promise<void> => {
        try {
            const response = await setUserById(userData);
            setStatusCreateUser(response)
        } catch (error) {
            setStatusCreateUser({success: false, message: 'Error fetching data'})
        }
    };

    useEffect(() => {
    }, [statusCreateUser]);

    return {handleCreateUser, statusCreateUser}
}