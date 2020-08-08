import { useState, useEffect } from 'react';

import { API_URL, API_TOKEN } from '../config';

export const useGetEmployees = () => {
  const [getAll, setAll] = useState([]);
  const [getById, setById] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const req = {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        };
        const res = await fetch(`${API_URL}/employee`, req);
        if (!res.ok) {
          throw new Error(`${res.status}${res.statusText}`);
        }
        const data = await res.json();
        if (data) {
          console.log(data);
          setLoading(false);
          setError(false);
          setAll(data);
        }
      } catch (error) {
        setError(true);
      }
    };
    fetchAll();
  }, []);
  return { getAll, getById, loading, error };
};
