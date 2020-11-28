import React from 'react';
import EditPostForm from '../../components/posts/EditPostForm';
import styles from './Posts.module.css';

const EditPost = (props) => {
    console.log(props.match.params.postID);
    return (
        <div className='container'>
            <div className={styles.container}>
                <div>
                    <h3>Edit Post.</h3>
                </div>
                <div className='mt-5'>
                    <EditPostForm postID={props.match.params.postID} history={props.history} />
                </div>
            </div>
        </div>
    );
}

export default EditPost;