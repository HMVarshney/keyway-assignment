import React from 'react';
import styles from './Posts.module.css';
import CreatePostForm from '../../components/posts/CreatePostForm';

const CreatePost = () => {
    return (
        <div className='container'>
            <div className={styles.container}>
                <div>
                    <h3>Create your own post.</h3>
                </div>
                <div className='mt-5'>
                    <CreatePostForm />
                </div>
            </div>
        </div>
    );
}

export default CreatePost;