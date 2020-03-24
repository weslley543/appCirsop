import axios from 'axios'

const api = axios.create({
    baseURL: 'https://cirsope.herokuapp.com'
});

export default api;