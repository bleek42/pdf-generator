import { useState, useEffect } from 'react';

import { API_URL, API_TOKEN } from '../config';

export const useGetEmployees = () => {
  const [getAll, setAll] = useState([]);
  const [getById, setById] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
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
        setLoading(false);
        setError(true);
      }
    };
    fetchAll();
  }, []);

  const fetchOne = async (idx) => {
    try {
      const req = {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      };
      const res = await fetch(`${API_URL}/employee${idx}`);
      if (!res.ok) {
        throw new Error(`${res.status}${res.statusText}`);
      }
      const data = await res.json();
      if (data) {
        setLoading(false);
        setError(false);
        setById(idx);
      }
    } catch (err) {
      console.error('some error');
      setLoading(false);
      setError(true);
    }
  };

  return { getAll, getById, loading, error };
};
