import * as URL from '../constants';
import Axios from 'axios';

async function createPost(formData, jwt) {
    console.log(formData, jwt);
    try {
        const response = await Axios.post(`${URL.BACKEND_URL}/posts`, formData, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

        return response;

    } catch (error) {
        console.log(error);
        return error;
    }
};

export { createPost };