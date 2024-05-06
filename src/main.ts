import { api } from './api/apiService';
import './pages/RegistrationPage/registrationStyles.scss';
import router from './router/router';

await api.init();
router.handleLocationChange();
