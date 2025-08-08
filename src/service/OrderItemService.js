import api from "./api";

export const addTOCart = async (product, userId) => {
    console.log(product,userId);
    try{
        const response = await api.post("/orderItems/addToCart", {
            userId: userId,
            productId: product.id,
            quantity: product.quantity
        });
        return response.data;

    }catch(e){
        console.error("cant add products to cart ",e) 
        throw e;
    }
};

export const getOrderItems = async (userId) => {
    try{
        const response = await api.get(`/orderItems/cart/${userId}`)
        return response.data;

    }catch(e){
        console.error("cant get order items ",e);
        throw e;
    }

}; 

export const removeFromCart = async (itemId) => {
    try{
        const response = await api.delete(`/orderItems/deleteFromCart/${itemId}`)
        return response.data;

    }catch(e){
        console.error("cant remove items ",e);
        throw e;
    }

}; 
export const getConfirmedOrders = async () => {
    try{
        const response = await api.get(`/orderItems/confirmedOrderItems`)
        return response.data;

    }catch(e){
        console.error("cant get confirmed order items ",e);
        throw e;
    }

}; 

export const getApprovedOrders = async (id) => {
    try{
        const response = await api.get(`/orderItems/distributorOrderItems/${id}`)
        return response.data;

    }catch(e){
        console.error("cant get orders ",e);
        throw e;
    }

}; 


