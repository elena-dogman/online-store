import './pages/RegistrationPage/registrationStyles.scss';
import router from './router/router';
import { fetchProducts, isUserLogined } from './api/apiService';
isUserLogined();
router.handleLocationChange();
fetchProducts();
