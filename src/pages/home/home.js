import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import Icon from '@bit/semantic-org.semantic-ui-react.icon';
import styles from './Home.module.css';

function Home() {
    return (
        <div className='container mt-5'>
            <div className='row no-gutters'>
                <div className='col-6 p-3'>
                    <div className={styles.homepageBox}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div>
                                <h3>Create Post</h3>
                            </div>
                            <div>
                                <Link to='/createPost'>
                                    <Button secondary>
                                        <Icon name='pencil' />Compose
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-6 p-3'>
                    <div className={styles.homepageBox}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div>
                                <h3>My Posts</h3>
                            </div>
                            <div>
                                <Link to='/myPosts'>
                                    <Button color='blue'>
                                        <Icon name='telegram' />Have a look
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;