import React, { useContext } from 'react';
import { AuthContext } from '../context/authenticationContext/authContext';
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ render, path }) => {

    const { authStatus: { isAuthenticated } } = useContext(AuthContext);

    console.log(render, typeof path);

    return (
        <Route exact path={path} render={(props) =>
            isAuthenticated ?
                render(props)
                :
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        />
    )
};


export default PrivateRoute;