import React from 'react';
import style from './loading-screen.module.scss';

function LoadingScreen() {
    return (
        <div className='d-flex justify-content-center align-items-center h-100 w-100'>
            <div className='spinner-border text-primary'>
                <span className='sr-only'>.</span>
            </div>
        </div>
    );
}

export default LoadingScreen;
