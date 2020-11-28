import * as URL from '../constants';
import Axios from 'axios';

function editPost(postID, formData, jwt) {
    console.log(formData, jwt);
    try {
        const response = Axios.put(`${URL.BACKEND_URL}/posts/${postID}`, formData, {
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

export { editPost };