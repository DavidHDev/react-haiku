import axios, { isCancel } from 'axios';
import { useEffect, useState } from 'react';

interface IInputParams {
  url: string;
  requestType: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: { [key: string]: string };
  body?: any;
  enabled: boolean;
}

const useFetch = (props: IInputParams) => {
  const { url, requestType, headers, body, enabled } = props;
  const [fetchedData, setFetchedData] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null); // TODO: need to change type
  const [loading, setLoading] = useState<boolean>(true);

  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const config = {
        method: requestType,
        url,
        headers,
        data: body,
        signal: controller.signal,
      };
      const response = await axios(config);
      if (response.statusText === 'OK') {
        setFetchedData(response);
      } else {
        if (response.status >= 400 && response.status < 500) {
          setError(response?.data || 'Client error');
        } else if (response.status >= 500 && response.status < 600) {
          setError(response?.data || 'Server error');
        } else {
          setError(response?.data || 'Unknown error');
        }
      }
    } catch (err) {
      if (isCancel(error)) {
        setError(error.message);
        console.log('Request canceled', error.message);
      } else {
        setError('Error in catch');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
    return () => {
      // Cancel the request on unmount
      controller.abort();
    };
  }, [url, enabled]);

  return { fetchData, fetchedData, error, loading };
};

export default useFetch;
