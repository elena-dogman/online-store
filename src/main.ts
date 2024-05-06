import { api } from './api/apiService';
import { createAuthPage } from './pages/AuthPage/AuthPage';
import './pages/RegistrationPage/registrationStyles.scss';
import router from './router/router';
await api.init();
router.handleLocationChange();
createAuthPage();
