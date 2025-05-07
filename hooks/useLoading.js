import { useState } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = async (promiseFn) => {
    setIsLoading(true);
    try {
      return await promiseFn();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, withLoading };
};
