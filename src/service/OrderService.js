import api from "./api";

export const getMyOrders = async (userId) => {
    try{
        const response = await api.get(`/orderItems/confirmedItems/${userId}`)
        return response.data;

    }catch(e){
        console.error("cant get my orders: ",e);
        throw e;
    }

}; 

export const placeOrder = async (address,userId) => {
    try{
        const response = await api.post("/order/makeBooking",{
            customerId: userId,
            address: address
        });
        return response.data;

    }catch(e){
        console.error("cant place order: ",e);
        throw e;
    }
};