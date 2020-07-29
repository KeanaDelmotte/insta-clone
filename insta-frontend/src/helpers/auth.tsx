import React from 'react';

export const retrieveToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const fetchWithAuth = async (
  input: RequestInfo,
  token: string | null,
  init?: RequestInit | undefined,
) => {
  const options =
    token === null
      ? {
          ...init,
          headers: {
            ...init?.headers,
            'Content-Type': 'application/json',
          },
        }
      : {
          ...init,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...init?.headers,
          },
        };

  return await fetch(input, options);
};
