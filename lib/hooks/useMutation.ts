import { useState, useEffect } from 'react';

const useMutation = (
    apiUrl: string,
    payload: any,
    headers: Record<string, string> = {},
    options: { timeout?: number } = {},
    onSuccess?: (data: any) => void,
    onError?: (error: string) => void
) => {
    const [loading, setLoading] = useState<boolean>(false); // Task: Track the loading state of the mutation request
    const [response, setResponse] = useState<any | null>(null); // Task: Store the response data from the server
    const [error, setError] = useState<string | null>(null); // Task: Store any error that occurs during the mutation request

    useEffect(() => {
        let isMounted = true; // Task: Flag to track if the component is still mounted
        const timeoutId = options.timeout
            ? setTimeout(() => {
                if (isMounted) {
                    setLoading(false);
                    setError('Request timed out'); // Task: Handle request timeout and set appropriate error message
                }
            }, options.timeout)
            : undefined;

        setLoading(true); // Task: Set loading to true when the mutation request starts
        setError(null); // Task: Reset the error state when the mutation request starts

        fetch(apiUrl, {
            method: 'PUT', // Task: The useMutation hook should be able to perform a PUT request to update data on the server using the provided API URL.
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(payload), // Task: It should allow customization of the request payload and headers to send along with the PUT request.

        })
            .then((response) => {
                clearTimeout(timeoutId); // Task: Clear the timeout when the response is received
                if (!response.ok) {
                    throw new Error('Request failed'); // Task: Handle server errors by throwing an error
                }
                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setLoading(false); // Task: Set loading to false when the response is received
                    setResponse(data); // Task: Save the response data in the state
                    if (onSuccess) {
                        onSuccess(data); // Task: Call the success callback with the response data
                    }
                }
            })
            .catch((error) => {
                if (isMounted) {
                    setLoading(false); // Task: Set loading to false if an error occurs
                    setError(error.message || 'Something went wrong'); // Task: Set the error state with the appropriate error message
                    if (onError) {
                        onError(error.message || 'Something went wrong'); // Task: Call the error callback with the error message
                    }
                }
            });

        return () => {
            isMounted = false; // Task: Clean up function to set isMounted to false when the component is unmounted
            if (timeoutId) {
                clearTimeout(timeoutId); // Task: Clear the timeout if the component is unmounted before the response is received
            }
        };
    }, [apiUrl, payload, headers, options.timeout, onSuccess, onError]);

    return { loading, response, error }; // Task: Return the loading state, response data, and error from the hook
};

export default useMutation;
