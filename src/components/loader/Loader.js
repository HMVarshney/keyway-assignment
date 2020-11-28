import React from 'react';
import RiseLoader from '@bit/davidhu2000.react-spinners.rise-loader';

const Loader = () => {
    return (
        <div style={{ marginTop: '5em' }} className='d-flex justify-content-center'>
            <RiseLoader size='50' color='black' />
        </div>
    );
}

export default Loader;