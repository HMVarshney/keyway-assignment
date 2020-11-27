import Icon from '@bit/semantic-org.semantic-ui-react.icon';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import styles from './Posts.module.css';
import { Link } from 'react-router-dom';
import { deletePost } from '../../api/getPosts';
import { useContext } from 'react';
import { AuthContext } from '../../context/authenticationContext/authContext';

const PostCard = ({ post, setLoadAgain }) => {

    const { authStatus } = useContext(AuthContext);

    const handleDelete = async () => {
        const response = await deletePost(post._id, authStatus.jwt);
        console.log(response);
        if (response?.status === 200) {
            setLoadAgain((current) => (!current));
            return;
        }

        return;
    }

    return (
        <div className={styles.blogCard}>
            <div className='row no-gutters align-items-center'>
                <div className='col-3'>
                    <img src='/assets/images/blog.jpg' alt='sky' width='100%' style={{ borderRadius: '8px' }} />
                </div>
                <div className='col-9 p-3'>
                    <div className='row no-gutters align-items-center justify-content-between'>
                        <div>
                            <div className='d-flex'>
                                <h3 className={styles.blueText}>{post.title}</h3>
                            </div>
                            <div className='d-flex align-items-center'>
                                <div style={{ color: '#0da6c8' }} className='mr-4'>
                                    <Icon name='gripfire' color='orange' />
                                    18
                                </div>
                                <div>
                                    <p>by {post.author.username}</p>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex align-items-center'>
                            <span onClick={() => handleDelete()} style={{ cursor: 'pointer' }} className='d-flex mr-4'>
                                <Icon color='blue' name='pencil' />
                                <p>Edit</p>
                            </span>
                            <Link to={`/postDisplay/${post._id}`}>
                                <Button inverted primary>
                                    Read More
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div style={{ maxHeight: '100px', overflow: 'hidden' }} className='mt-2'>
                        <p>{post.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
