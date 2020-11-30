import Form from '@bit/react-bootstrap.react-bootstrap.form';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import React, { useContext, useState } from 'react';
import { createPost } from '../../api/createPost';
import { AuthContext } from '../../context/authenticationContext/authContext';
import styles from './Posts.module.css';
import Alert from '@bit/react-bootstrap.react-bootstrap.alert';
import Icon from '@bit/semantic-org.semantic-ui-react.icon';

const CreatePostForm = () => {

    const [title, setTitle] = useState('');
    const [content, changeContent] = useState('');
    const [uploadStatus, setStatus] = useState({
        uploading: false,
        uploadStatus: '',
        error: null
    });

    const { authStatus } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus((current) => ({ ...current, uploading: true }));

        const response = await createPost({ title, content, author: authStatus?.userDetails?._id }, authStatus.jwt);

        if (response.status === 200) {
            return setStatus({ uploadStatus: 'success', error: null, uploading: false });
        } else {
            return setStatus({ uploadStatus: 'error', error: response, uploading: false });
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.uploadForm}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control as='textarea' rows={10} value={content} onChange={(e) => changeContent(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Button type='submit' primary loading={uploadStatus.uploading} disabled={uploadStatus.uploadStatus === 'success'}>
                            <Icon name='pencil' />Compose
                        </Button>
                    </Form.Group>
                </Form>
            </div>
            {uploadStatus.uploadStatus === 'success' &&
                <div className='mt-5'>
                    <Alert variant='success'>
                        <p className='text-center p-1'>
                            Your post has been uploaded!
                        </p>
                    </Alert>
                </div>
            }
            {uploadStatus.uploadStatus === 'error' &&
                <div className='mt-5'>
                    <Alert variant='danger'>
                        <p className='text-center p-1'>
                            There was a problem uploading your post. Please try again.
                        </p>
                    </Alert>
                </div>
            }
        </div>
    );
}

export default CreatePostForm;