import React, { useContext, useEffect, useState } from 'react';
import { getPost } from '../../api/getPosts';
import Loader from '../../components/loader/Loader';
import { AuthContext } from '../../context/authenticationContext/authContext';


const PostDisplay = (props) => {

    const { authStatus } = useContext(AuthContext);

    const [post, setPost] = useState({
        loading: true,
        post: {},
        error: null
    });

    useEffect(() => {
        setPost((current) => ({ ...current, loading: true }));
        (async () => {
            const response = await getPost(props.match.params.id, authStatus.jwt);

            if (response?.status === 200) {
                setPost({ loading: false, post: response.data, error: null });
                return;
            }

            setPost({ loading: false, posts: [], error: response });
            return;
        })();
    }, []);

    if (post.loading) {
        return <Loader />
    }

    if (post.error) {
        return (
            <div className='mt-5'>
                <h2 style={{ color: 'red' }} className='text-center'>There has been an error fetching the post.</h2>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='d-flex flex-column p-4'>
                <h2 style={{ margin: 0, padding: 0 }}>{post.post.title}</h2>
                <h5 style={{ margin: 0, padding: 0 }}>By {post.post.author.username}</h5>
                <div className='mt-4 col-9'>
                    <img style={{ borderRadius: '8px' }} src='/assets/images/blog.jpg' alt='blog' width='100%' />
                </div>
                <div className='mt-4'>
                    <p>{post.post.content}</p>
                </div>
            </div>
        </div>
    );
}

export default PostDisplay;