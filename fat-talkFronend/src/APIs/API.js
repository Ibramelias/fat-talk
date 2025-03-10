import axios from "axios";

// const API = axios.create({
//     baseURL: "https://jsonplaceholder.typicode.com", // Base URL for all requests
//     timeout: 5000, // Timeout in milliseconds
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });


//   export default API;


export default {
    searchGifs: function(query){
        return axios.get(`https://jsonplaceholder.typicode.com${query}`)
    }
}