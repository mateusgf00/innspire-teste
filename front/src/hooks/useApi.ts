import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { AxiosResponse } from 'axios';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T = any>(url: string, immediate = true) => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response: AxiosResponse<T> = await api.get(url);
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [url, immediate]);

  return {
    ...state,
    execute,
  };
};
