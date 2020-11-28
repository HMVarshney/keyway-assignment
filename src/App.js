import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from './context/authenticationContext/authContext';
import './styles/semantic-ui-css/semantic.min.css';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';
const Login = lazy(() => import('./pages/login/login'));
const CreatePost = lazy(() => import('./pages/posts/createPost'));
const Register = lazy(() => import('./pages/login/register'));
const ListPosts = lazy(() => import('./pages/posts/listPosts'));
const PostDisplay = lazy(() => import('./pages/posts/postDisplay'));
const EditPost = lazy(() => import('./pages/posts/editPost'));

const LazyLoadComponent = ({ children }) => (
  <Suspense fallback={<div>Loading....</div>}>
    {children}
  </Suspense>
);

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' render={(props) => <LazyLoadComponent><Login {...props} /></LazyLoadComponent>} />
          <Route exact path='/register' render={(props) => <LazyLoadComponent><Register {...props} /></LazyLoadComponent>} />
          <PrivateRoute exact path='/createPost' render={(props) => <LazyLoadComponent><CreatePost {...props} /></LazyLoadComponent>} />
          <PrivateRoute exact path='/myPosts' render={(props) => <LazyLoadComponent><ListPosts {...props} /></LazyLoadComponent>} />
          <PrivateRoute exact path='/postDisplay/:id' render={(props) => <LazyLoadComponent><PostDisplay {...props} /></LazyLoadComponent>} />
          <PrivateRoute exact path='/edit/:postID' render={(props) => <LazyLoadComponent><EditPost {...props} /></LazyLoadComponent>} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;