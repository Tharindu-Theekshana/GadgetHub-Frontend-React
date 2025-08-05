import api from "./api";

export const getMyOrders = async (userId) => {
    try{
        const response = await api.get(`/orderItems/confirmedItems/${userId}`)
        return response.data;

    }catch(e){
        console.error("cant get my orders ",e);
        throw e;
    }

}; 