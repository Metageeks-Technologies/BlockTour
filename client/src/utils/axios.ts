import axios from "axios";

const instance = axios.create({
    // development  
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
    headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${cookies().get( "UserToken" )}`
    },
    withCredentials: true, 
} );


export default instance;