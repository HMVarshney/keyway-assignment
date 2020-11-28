import Button from '@bit/semantic-org.semantic-ui-react.button';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../api/getPosts';
import Loader from '../../components/loader/Loader';
import PostCard from '../../components/posts/PostCard';
import { AuthContext } from '../../context/authenticationContext/authContext';

const ListPosts = () => {

    const { authStatus } = useContext(AuthContext);

    const [posts, setPosts] = useState({
        loading: true,
        posts: [],
        error: null
    });
    const [loadAgain, setLoadAgain] = useState(false);

    useEffect(() => {
        setPosts((current) => ({ ...current, loading: true }));
        (async () => {
            const response = await getAllPosts(authStatus.jwt);

            if (response?.status === 200) {
                // console.log(response.data);
                const myPosts = response.data.filter((post) => post.author._id === authStatus.userDetails._id)
                setPosts({ loading: false, posts: myPosts, error: null });
                return;
            }

            setPosts({ loading: false, posts: [], error: response });
            return;
        })();
    }, [loadAgain]);

    if (posts.loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className='container'>
            <h2 className='p-3 text-center mt-3'>My Posts</h2>
            {!posts.loading && posts.posts.length === 0 &&
                <div className='mt-5 text-center'>
                    <h3 className='text-center'>You have no posts.</h3>
                    <Link to='/createPost'>
                        <a href='#'>Create One</a>
                    </Link>
                </div>
            }
            <div className='row no-gutters justify-content-center'>
                {posts.posts.map((post) => (
                    <div className='col-10' key={post._id}>
                        <PostCard post={post} setLoadAgain={setLoadAgain} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListPosts;