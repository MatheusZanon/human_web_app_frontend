import React, { ComponentType, ComponentProps, PropsWithChildren } from 'react';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import router from '@/router';
import { AuthenticatedUserProvider } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Providers = [ComponentType<any>, ComponentProps<any>?][];

const combineProviders = (providers: Providers): React.FC =>
    providers.reduce(
        (AccumulatedProviders, [Provider, props = {}]) =>
            ({ children }: PropsWithChildren) => (
                <AccumulatedProviders>
                    <Provider {...props}>
                        <>{children}</>
                    </Provider>
                </AccumulatedProviders>
            ),
        ({ children }: PropsWithChildren) => <>{children}</>,
    );

export const AllProviders = combineProviders([
    [ThemeProvider, { defaultTheme: 'light', storageKey: 'ui-theme' }],
    [QueryClientProvider, { client: queryClient }],
    [AuthenticatedUserProvider],
    [RouterProvider, { router: router }],
]);
