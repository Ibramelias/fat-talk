import axios from "axios";

export default {
    callAllItems: function(query){
        return axios.get('http://localhost:5262/items')
    }
}