import api from "./api";

export const getAllProducts = async () => {
    try{

        const response = await api.get("/product/getAllProducts");
        return response.data;

    }catch(e){
        console.error("cant get all products ",e);
        throw e;
    }
}

export const searchProduct = async (name) => {

    try{

        const response = await api.get(`/product/search`, {
            params: {
                name: name
            }
        });
        return response.data;

    }catch(e){
        console.error("cant search product ",e);
        throw e;
    }
}

export const getById = async (id) => {

    try{

        const response = await api.get(`/product/getById/${id}`);
        return response.data;

    }catch(e){
        console.error("cant get product ",e);
        throw e;
    }
}

