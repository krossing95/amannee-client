import axios from 'axios';
import { baseUrl } from '../static';

const useConnector = () => {
    axios.defaults.withCredentials = true;

    const fetchNews = async (page) => {
        const news = await axios({
            method: 'get',
            url: `${baseUrl}api`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: { page }
        }).then(response => {
            return response?.data?.data;
        }).catch(error => {
            return error?.response?.status;
        });
        return news;
    }

    const searchNews = async (page, query) => {
        const news = await axios({
            method: 'get',
            url: `${baseUrl}api`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: { page, q:query }
        }).then(response => {
            return response?.data?.data;
        }).catch(error => {
            return error?.response?.status;
        });
        return news;
    }

    return { fetchNews, searchNews }
}

export default useConnector;