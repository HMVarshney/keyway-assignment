import * as URL from '../constants';
import Axios from 'axios';

async function editPost(postID, formData, jwt) {
    console.log(formData, jwt);
    try {
        const response = await Axios.put(`${URL.BACKEND_URL}/posts/${postID}`, formData, {
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

export { editPost };