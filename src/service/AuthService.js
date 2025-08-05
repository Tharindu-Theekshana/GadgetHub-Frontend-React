import api from "./api";

export const register = async (data,role) => {
    try{
        const response = await api.post("/auth/register", {
            name: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            role: role
        });
        return response.data;

    }catch(e){
        console.error("cant register user ",e);
        throw e;
    }
};

export const login = async (data) => {
    try{
        const response = await api.post("/auth/login", {
            email: data.email,
            password: data.password,
        });
        return response.data;

    }catch(e){
        console.error("cant login user ",e);
        throw e;
    }
};

export const logout = async () => {
    try{
        const response = await api.post("/auth/logout");
        return response.data;

    }catch(e){
        console.error("cant login user ",e);
        throw e;
    }
};