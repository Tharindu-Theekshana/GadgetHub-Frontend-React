import api from "./api";

export const sendQuotation = async (data,distributorId,itemId) => {

    try{
        const response = await api.post("/quotation/sendQuotation",{
            price: data.price,
            estimatedDeliveryTime: data.estimatedDeliveryTime,
            availabilityStock: data.availabilityStock,
            distributorId: distributorId,
            orderItemId: itemId
        });
        return response.data;

    }catch(e){
        console.error("cant send quotation : ",e);
        throw e;
    }
};

export const getQuotations = async (id) => {
    try{
        const response = await api.get(`/quotation/byDistributor/${id}`)
        return response.data;

    }catch(e){
        console.error("cant get quotations ",e);
        throw e;
    }

}; 