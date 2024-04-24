import { QueryClient } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';

const MAX_RETRIES = 3;
const HTTP_STATUS_CODES_TO_NOT_RETRY = [400, 401, 403, 404];

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: AxiosError;
    }
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry(failureCount, error) {
                if (failureCount > MAX_RETRIES) {
                    return false;
                }

                if (isAxiosError(error) && HTTP_STATUS_CODES_TO_NOT_RETRY.includes(error.response?.status ?? 0)) {
                    return false;
                }

                return true;
            },
        },
    },
});
