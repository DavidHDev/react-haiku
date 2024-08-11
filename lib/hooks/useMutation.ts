import { useState, useEffect } from 'react';

// Custom hook for making mutation requests to an API endpoint
const useMutation = (
  apiUrl: string,
  payload: any,
  headers: Record<string, string> = {},
  options: { method?: string; timeout?: number } = {},
  onSuccess?: (data: any) => void,
  onError?: (error: string) => void,
) => {
  const [loading, setLoading] = useState<boolean>(false); // Track loading state of the mutation request
  const [response, setResponse] = useState<any | null>(null); // Store the response data from the server
  const [error, setError] = useState<string | null>(null); // Store any error that occurs during the mutation request

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted
    const timeoutId = options.timeout
      ? setTimeout(() => {
          if (isMounted) {
            setLoading(false);
            setError('Request timed out'); // Handle request timeout
          }
        }, options.timeout)
      : undefined;

    setLoading(true); // Set loading to true when the mutation request starts
    setError(null); // Reset the error state when the mutation request starts

    fetch(apiUrl, {
      method: options.method || 'POST', // Use the provided HTTP method or default to 'POST'
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(payload), // Customize the request payload and headers
    })
      .then((response) => {
        clearTimeout(timeoutId); // Clear the timeout when the response is received
        if (!response.ok) {
          throw new Error('Request failed'); // Handle server errors by throwing an error
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setLoading(false); // Set loading to false when the response is received
          setResponse(data); // Save the response data in the state
          if (onSuccess) {
            onSuccess(data); // Call the success callback with the response data
          }
        }
      })
      .catch((error) => {
        if (isMounted) {
          setLoading(false); // Set loading to false if an error occurs
          setError(error.message || 'Something went wrong'); // Set the error state with the appropriate error message
          if (onError) {
            onError(error.message || 'Something went wrong'); // Call the error callback with the error message
          }
        }
      });

    return () => {
      isMounted = false; // Clean up function to set isMounted to false when the component is unmounted
      if (timeoutId) {
        clearTimeout(timeoutId); // Clear the timeout if the component is unmounted before the response is received
      }
    };
  }, [apiUrl, payload, headers, options.timeout, onSuccess, onError]);

  return { loading, response, error }; // Return the loading state, response data, and error from the hook
};

export default useMutation;
