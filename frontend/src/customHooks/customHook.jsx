import { useState, useEffect } from 'react';
import axios from 'axios';

const useCustom = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // To prevent state updates on an unmounted component

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios({
          url,
          method,
          data: body,
        });

        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Something went wrong!');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (method === 'POST') {
      fetchData();
    }

    return () => {
      isMounted = false; // Cleanup function to avoid state updates after unmount
    };
  },[]);

  return { data, loading, error };
};

export default useCustom;
