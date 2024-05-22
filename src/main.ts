import './pages/RegistrationPage/registrationStyles.scss';
import router from './router/router';
import {
  fetchProducts,
  isUserLogined,
  getDetailedProduct,
} from './api/apiService';

getDetailedProduct('797ea592-fba5-4d5a-bc90-474d804362a8');
isUserLogined();
await router.handleLocationChange();
fetchProducts();
