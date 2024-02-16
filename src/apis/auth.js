import client from "./client";

export const signInUser = async(userInfo) =>{

    try {
        const {data} = await client.post('/user/sign-in',userInfo);
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}

export const createNewUser = async(userInfo) =>{

    try {
        const {data} = await client.post('/user/createUserByAdmin',userInfo);
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}

export const getAllUsers = async() =>{

    try {
        const {data} = await client.get('/user/get-all-user');
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}

export const forgetPassword = async(email) =>{

    try {
        const {data} = await client.post('/user/forget-password',{email});
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}