import client from "./client";

export const createTicket = async(ticketInfo) =>{

    try {
        const {data} = await client.post('/tickets/create',ticketInfo);
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}


export const createBulkTicket = async(ticketInfoArr) =>{

    try {
        const {data} = await client.post('/tickets/createbulk',ticketInfoArr);
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}


export const getSingleTicket = async(ticketNo) =>{

    try {
        const {data} = await client.get('/tickets/gteSingleticket',ticketNo);
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}


export const getAllTickets = async() =>{

    try {
        const {data} = await client.get('/tickets/getAllTickets');
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}