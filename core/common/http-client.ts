import axios from "axios";

const httpClient = axios.create({
    baseURL: process.env.apiUrl
});


//tratamento das http response 
httpClient.interceptors.response.use(response => {
    return response.data
})

export default httpClient;
