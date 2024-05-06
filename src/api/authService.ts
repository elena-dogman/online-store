import { apiPOST, apiGETTOKEN } from './apiService';
import router from '../router/router';
export async function authService<T>(
  body: Record<string, string>,
): Promise<T | undefined> {
  try {
    const response = await apiPOST<Customer>('login', body);
    if (response) {
      console.log(response);
      router.navigate('/');
    }
    const userId = response?.customer.id;
    console.log(userId);
    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'password');
    requestBody.append('username', body.email);
    requestBody.append('password', body.password);
    requestBody.append('manage_my_orders', 'valenki-store');
    requestBody.append('manage_my_profile', 'valenki-store');
    requestBody.append('scope', 'view_products:valenki-store');
    const token = await apiGETTOKEN<T>(
      'valenki-store/customers/token',
      requestBody,
    );
    console.log(token);
  } catch (error) {
    //обработку вариантов всех ошибок сделаю в другом тикете(toast.ts)
    console.error('There was a problem with the authentication:', error);
    return undefined;
  }
}
//vremennoe
interface Customer {
  customer: {
    id: string;
  };
}
