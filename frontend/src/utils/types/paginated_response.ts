interface PaginatedResponse<T> {
    results: T[];
    count: number;
    next: string | null;
    previous: string | null;
    length: number;
}

export default PaginatedResponse;