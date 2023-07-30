export type IError = {
    message: string;
    stack: string;
    statusCode: number;
} | null;

/**
 * HTTP Request Methods
 */
export type IRequestMethods =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "HEAD"
    | "CONNECT"
    | "OPTIONS";

export type IUseFetchOptions = RequestInit & {
    method: IRequestMethods;
};

export type IUseFetchReturnType<T extends object> = {
    /**
     * The `refetch` function is a callback that allows you to manually trigger a new fetch request
     * with optional custom options.
     * @param options object with `body` property from `IUseFetchOptions` type. This allows you to override the `body`
     * property of the original fetch options when making the new request. `OPTIONAL`
     * @returns void
     */
    refetch: (options?: Pick<IUseFetchOptions, "body">) => void;
    /**
     * The `data` property in the `IUseFetchReturnType` type is defined as `T | unknown`. This means
     * that the `data` property can hold a value of type `T` (which is a generic type parameter) or any
     * other type (`unknown`).
     */
    data: T | unknown;
    /**
     * If the query is in a "hard" loading state. This means there is no cached data and the query is currently fetching.
     */
    isLoading: boolean;
    /**
     * If the query is in a "soft" loading state or refetching state. This means if the query is currently fetching.
     */
    isFetching: boolean;
    /**
     * Defaults to `null`. The error object for the query, if an error was thrown.
     */
    error: IError;
};
