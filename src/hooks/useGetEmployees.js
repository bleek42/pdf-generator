import { useState, useEffect } from 'react';

import { API_URL, API_TOKEN } from '../config';

export const useGetEmployees = (url, options) => {
  const [getAll, setAll] = useState([]);
  const [getById, setById] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const req = options({
          Headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const res = await fetch(`${API_URL}/employee`, options);
        if (!res.ok) {
          throw new Error(`${res.status}${res.statusText}`);
        }
        const data = await res.json();
        setAll(data);
      } catch (error) {
        setError(true);
      }
    };
    fetchAll();
  }, [url]);
  return { getAll, getById, loading, error };
};
