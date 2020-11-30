import * as URL from '../constants';
const { default: Axios } = require("axios");

async function getAllPosts(jwt) {
    try {
        const response = await Axios.get(`${URL.BACKEND_URL}/posts/`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    };
};

async function getPost(id, jwt) {
    try {
        const response = await Axios.get(`${URL.BACKEND_URL}/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    };
};

async function deletePost(id, jwt) {
    try {
        const response = await Axios.delete(`${URL.BACKEND_URL}/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    };
}

export { getAllPosts, getPost, deletePost };