import { appAxios } from "./ApiInterCeptors"

export const createOrder = async (items: any, totalPrice: number) => {
    try {
        const response = await appAxios.post(`/order`, {
            items: items,
            branch: "66ec223d5775755e1651b939",
            totalPrice: totalPrice
        })
        return response.data
    } catch (error) {
        console.log('Create order error', error)
        return null

    }
}

export const getOrderById = async (id: string) => {
    // console.log(`Fetching order with ID: ${id}`);
    try {
        const response = await appAxios.get(`/order/${id}`);
        // console.log("response data", response.data)
        return response.data
    } catch (error) {
        console.log('Fetch order error', error)
        return null

    }
}

export const fetchCustomerOrders = async (userId: string) => {

    try {
        const response = await appAxios.get(`/order?customerId=${userId}`);
        // console.log("response data", response.data)
        return response.data
    } catch (error) {
        console.log('Fetch customer order error', error)
        return null

    }
}

export const fetchOrders = async (status: string, userId: string, branchId: string) => {
    if (!branchId) {
        console.error("Branch ID is missing or invalid.");
        return null;
    }

    let uri = status === 'available' ?
        `/order?status=${status}&branchId=${branchId}` :
        `/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=delivered`;

    try {
        const response = await appAxios.get(uri);
        // console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        console.log('Fetch delivery order error', error);
        return null;
    }
};

export const sendLiveOrderUpdates = async (id: string, location: any, status: string) => {
    try {
        const response = await appAxios.patch(`/order/${id}/status`, {
            deliveryPersonLocation: location,
            status
        });
        // console.log("response data", response.data)
        return response.data
    } catch (error) {
        console.log('sendLiveOrderUpdates error', error)
        return null

    }
}

export const confirmOrder = async (id: string, location: any) => {
    try {
        const response = await appAxios.post(`/order/${id}/confirm`, {
            deliveryPersonLocation: location,
        });
        // console.log("response data", response.data)
        return response.data
    } catch (error) {
        console.log('confirmOrder error', error)
        return null

    }
}