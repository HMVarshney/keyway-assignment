import * as URL from '../constants';
import Axios from 'axios';

function createPost(formData, jwt) {
    console.log(formData, jwt);
    try {
        const response = Axios.post(`${URL.BACKEND_URL}/posts`, formData, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

        return response;

    } catch (error) {
        console.log(error.response);
        return error.response
    }
};

export { createPost };