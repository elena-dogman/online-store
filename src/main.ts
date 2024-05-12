// import { api } from './api/apiService';
import './pages/RegistrationPage/registrationStyles.scss';
import router from './router/router';
import { isUserLogined } from './api/apiService';
isUserLogined();
router.handleLocationChange();
