import React, { useContext, useRef } from 'react';
import styles from './Login.module.css';
import Form from '@bit/react-bootstrap.react-bootstrap.form';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import { AuthContext } from '../../context/authenticationContext/authContext';
import Alert from '@bit/react-bootstrap.react-bootstrap.alert';
import { Link } from 'react-router-dom';

const Register = () => {

    const { authStatus, register } = useContext(AuthContext);

    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(usernameRef.current.value, emailRef.current.value, passwordRef.current.value);

        emailRef.current.disabled = true; passwordRef.current.disabled = true; usernameRef.current.disabled = true;
    }

    return (
        <div className={styles.container}>
            <div style={{ height: '80vh' }} className='d-flex justify-content-center align-items-center flex-column'>
                <div className={styles.loginBox}>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label htmlFor='username'>Username</Form.Label>
                            <Form.Control id='username' type='text' required ref={usernameRef} disabled={authStatus.isAuthenticated} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='email'>Email</Form.Label>
                            <Form.Control id='email' type='email' required ref={emailRef} disabled={authStatus.isAuthenticated} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='email'>Password</Form.Label>
                            <Form.Control id='password' type='password' required ref={passwordRef} disabled={authStatus.isAuthenticated} />
                        </Form.Group>
                        <Form.Group>
                            <Button loading={authStatus.isVerifying} disabled={authStatus.isVerifying} fluid type='submit' color='blue'>Register</Button>
                        </Form.Group>
                    </Form>
                    <div className='mt-5'>
                        <div className='d-flex flex-column justify-content-center'>
                            <div>
                                <p>Already have an account?</p>
                                <Link to='/login'><a href='#'>Login</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
                {authStatus.isAuthenticated &&
                    <div className='mt-4'>
                        <Alert variant='success'>
                            <p className='pr-2 pl-2'>Register Successfull! You're now Logged In.</p>
                        </Alert>
                    </div>
                }
                {authStatus.authenticationError &&
                    <div className='mt-4'>
                        <Alert variant='danger'>
                            <p className='pr-2 pl-2'>There was a problem registering. Try again.</p>
                        </Alert>
                    </div>
                }
            </div>
        </div>
    );
}

export default Register;