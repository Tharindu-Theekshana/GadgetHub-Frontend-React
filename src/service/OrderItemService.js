import api from "./api";

export const addTOCart = async (product, userId) => {
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



