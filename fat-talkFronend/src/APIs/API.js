import axios from "axios";

export default {
    callAllItems: function (query) {
        return axios.get('http://localhost:5262/items')
    },

    saveNewItem: function (userId, items) {
        return axios.post(`http://localhost:5262/users/${userId}/items`, items); 
    },

    createNewUser: function (newUser) {
        return axios.post(`http://localhost:5262/signup`, newUser); 
    },
}



