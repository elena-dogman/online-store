import { apiPOST } from './apiService';

export async function authService<T>(
  body: Record<string, string>,
): Promise<T | undefined> {
  try {
    const response = await apiPOST<T>('login', body);
    return response;
  } catch (error) {
    console.error('There was a problem with the authentication:', error);
    return undefined;
  }
}
