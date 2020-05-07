import axios from 'axios'

const api = axios.create({
    //  baseURL: 'https://cirsope.herokuapp.com'
     baseURL: 'http://192.168.100.29:8080'
});

export default api;