import React, { useContext, useRef } from 'react';
import styles from './Login.module.css';
import Form from '@bit/react-bootstrap.react-bootstrap.form';
import Button from '@bit/semantic-org.semantic-ui-react.button';
import { AuthContext } from '../../context/authenticationContext/authContext';
import Alert from '@bit/react-bootstrap.react-bootstrap.alert';
import { Link } from 'react-router-dom';

const Login = (props) => {

    const { authStatus, login } = useContext(AuthContext);

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(emailRef.current.value, passwordRef.current.value);

        if (response.status === 200) {
            emailRef.current.disabled = true; passwordRef.current.disabled = true;

            if (props.location.state) {
                props.history.push(props.location.state.from.pathname);
            } else {
                props.history.push('/');
            }
        }
    };

    return (
        <div className={styles.container}>
            <div style={{ height: '80vh' }} className='d-flex justify-content-center align-items-center flex-column'>
                <div className={styles.loginBox}>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label htmlFor='email'>Email</Form.Label>
                            <Form.Control id='email' type='email' required ref={emailRef} disabled={authStatus.isAuthenticated} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='email'>Password</Form.Label>
                            <Form.Control id='password' type='password' required ref={passwordRef} disabled={authStatus.isAuthenticated} />
                        </Form.Group>
                        <Form.Group>
                            <Button loading={authStatus.isVerifying} disabled={authStatus.isVerifying} fluid type='submit' color='blue'>Login</Button>
                        </Form.Group>
                    </Form>
                    <div className='mt-5'>
                        <div className='d-flex flex-column justify-content-center'>
                            <div>
                                <p>Don't have an account?</p>
                                <Link to='/register'><a href='#'>Register</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
                {authStatus.isAuthenticated &&
                    <div className='mt-4'>
                        <Alert variant='success'>
                            <p className='pr-2 pl-2'>Login Successfull!</p>
                        </Alert>
                    </div>
                }
                {authStatus.authenticationError &&
                    <div className='mt-4'>
                        <Alert variant='danger'>
                            <p className='pr-2 pl-2'>There was a problem logging in. Try again.</p>
                        </Alert>
                    </div>
                }
            </div>
        </div>
    );
}

export default Login;