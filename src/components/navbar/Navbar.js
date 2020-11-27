import Button from '@bit/semantic-org.semantic-ui-react.button';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authenticationContext/authContext';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const { logout, authStatus } = useContext(AuthContext);

    return (
        <div className={styles.container}>
            <div>
                <div className='d-flex'>
                    <div>Logo</div>
                    <div style={{ flexGrow: 1 }} />
                    <div>
                        <div className='d-flex align-items-center'>
                            {authStatus.isAuthenticated ?
                                <>
                                    <div className='pr-4 pl-4'>
                                        <Link to='/createPost'>
                                            <a href='#'>Create Post</a>
                                        </Link>
                                    </div>
                                    <div className='pr-4 pl-4'>
                                        <Link to='/myPosts'>
                                            <a href='#'>My Posts</a>
                                        </Link>
                                    </div>
                                    <div className='pr-4 pl-4'>
                                        <Button color='red' onClick={() => logout()}>Logout</Button>
                                    </div>
                                </>
                                :
                                <Link to='/login'>
                                    <Button secondary>Login</Button>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;