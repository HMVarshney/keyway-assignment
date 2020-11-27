import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from './context/authenticationContext/authContext';
import './styles/semantic-ui-css/semantic.min.css';
import Navbar from './components/navbar/Navbar';
const Login = lazy(() => import('./pages/login/login'));
const CreatePost = lazy(() => import('./pages/posts/createPost'));
const Register = lazy(() => import('./pages/login/register'));
const ListPosts = lazy(() => import('./pages/posts/listPosts'));
const PostDisplay = lazy(() => import('./pages/posts/postDisplay'));

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
          <Route exact path='/login' render={() => <LazyLoadComponent><Login /></LazyLoadComponent>} />
          <Route exact path='/register' render={() => <LazyLoadComponent><Register /></LazyLoadComponent>} />
          <Route exact path='/createPost' render={() => <LazyLoadComponent><CreatePost /></LazyLoadComponent>} />
          <Route exact path='/myPosts' render={() => <LazyLoadComponent><ListPosts /></LazyLoadComponent>} />
          <Route exact path='/postDisplay/:id' render={(props) => <LazyLoadComponent><PostDisplay {...props} /></LazyLoadComponent>} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;