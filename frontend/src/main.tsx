import React from 'react';
import ReactDOM from 'react-dom/client';
import { AllProviders } from './utils/Providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './utils/queryClient';
import '@/assets/scss/styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AllProviders />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-right' client={queryClient} />
    </React.StrictMode>,
);
