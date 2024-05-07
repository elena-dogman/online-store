// import { apiPOST, apiGETTOKEN } from './oldservicetodelete';
// import router from '../router/router';
// // import { showToast } from '../components/toast/toast';

// function isServerResponse(
//   response: Customer | ServerResponse | undefined,
// ): response is ServerResponse {
//   return (
//     typeof response === 'object' &&
//     response !== null &&
//     'statusCode' in response
//   );
// }
// export async function authService<T>(
//   body: Record<string, string>,
// ): Promise<T | undefined> {
//   try {
//     const response = await apiPOST<Customer | ServerResponse>('login', body);

//     // const data = await response.json();
//     if (
//       isServerResponse(response) &&
//       !(response.statusCode > 200) &&
//       !(response.statusCode < 200)
//     ) {
//       console.log(response);
//       router.navigate('/');

//       const userId = response?.customer.id;
//       console.log(userId);
//       const requestBody = new URLSearchParams();
//       const params = {
//         grant_type: 'password',
//         username: body.email,
//         password: body.password,
//         manage_my_orders: 'valenki-store',
//         manage_my_profile: 'valenki-store',
//         scope: 'view_products:valenki-store',
//       };
//       Object.entries(params).forEach(([key, value]) => {
//         requestBody.append(key, value);
//       });
//       const token = await apiGETTOKEN<T>(
//         'valenki-store/customers/token',
//         requestBody,
//       );
//       console.log(token);
//     }
//   } catch (error) {
//     //обработку вариантов всех ошибок сделаю в другом тикете(toast.ts)
//     console.error('There was a problem with the authentication:', error);
//     return undefined;
//   }
// }
// //vremennoe

// interface Customer {
//   customer: {
//     id: string;
//   };
// }
// interface ServerResponse {
//   statusCode: number;
//   message: string;
//   errors: { code: string; message: string }[];
//   customer: {
//     id: string;
//   };
// }
