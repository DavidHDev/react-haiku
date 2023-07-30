import { useCallback, useEffect, useRef, useState } from "react";
import type { IError, IUseFetchOptions, IUseFetchReturnType } from "../types";

const defaultOptions: IUseFetchOptions = {
    method: "GET",
};

/**
 * The `useFetch` function is a custom hook in TypeScript that handles fetching data from a specified
 * URL and provides the fetched data, loading state, error state, and a refetch function.
 * @param {string} url - The `url` parameter is a string that represents the URL of the API endpoint
 * you want to fetch data from.
 * @param {IUseFetchOptions} options - The `options` parameter is an optional object that allows you to
 * customize the fetch request. It has the following properties:
 * @returns The `useFetch` function returns an object with the following properties:
 */
export function useFetch<T extends object>(
    url: string,
    options: IUseFetchOptions = defaultOptions
): IUseFetchReturnType<T> {
    const [data, setData] = useState<T | unknown>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<IError>(null);
    const cache = useRef<Record<string, T>>({});
    const controller = new AbortController();

    const fetchData = useCallback(
        async (customOptions?: Pick<IUseFetchOptions, "body">) => {
            try {
                setIsFetching(true);

                if (cache.current[url]) {
                    setData(cache.current[url]);
                } else {
                    const response = await fetch(url, {
                        ...options,
                        body: customOptions?.body
                            ? customOptions.body
                            : options.body,
                    });

                    if (response.ok) {
                        const contentType =
                            response.headers.get("content-type");
                        let data;
                        if (contentType?.includes("json")) {
                            data = await response.json();
                        } else if (
                            contentType?.includes("text") ||
                            contentType?.includes("html")
                        ) {
                            data = await response.text();
                        } else {
                            data = await response.blob();
                        }
                        setData(data);
                    } else {
                        throw new Error(response.statusText);
                    }
                }
            } catch (error: any) {
                setError(error);
            } finally {
                setIsFetching(false);
                if (isLoading) setIsLoading(false);
            }
        },
        [isLoading]
    );

    const refetch: IUseFetchReturnType<T>["refetch"] = useCallback(
        (customOptions) =>
            customOptions?.body ? fetchData({ ...customOptions }) : fetchData(),
        [fetchData]
    );

    useEffect(() => {
        fetchData();

        return controller.abort;
    }, [url]);

    return {
        refetch,
        data,
        isLoading,
        isFetching,
        error,
    };
}
