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