import api from "./api";

export const addTOCart = async (product, userId) => {
    try{
        const response = await api.post("/orderItems/addToCart", {
            userId: userId,
            productId: product.id,
            quantity: product.quantity
        })

    }catch(e){
        console.error("cant add products to cart ",e) 
        throw e;
    }
} 
