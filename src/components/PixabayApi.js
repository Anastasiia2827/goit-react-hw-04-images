import axios from "axios";
const API_KEY = '33046480-b67f65ece8761789fa0ed8218';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(query, page) {
    try {
        return await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q:  query ,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: 12,
            },
        })
            .then(response => response.data);
    } catch (error) {
        throw new Error(error);
    }
}

export default fetchImages;