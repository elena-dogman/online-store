import { api } from './api/apiService';
import { createAuthPage } from './pages/AuthPage/AuthPage';
import { buildRegistrationPage } from './pages/RegistrationPage/registrationPage';
import './pages/RegistrationPage/registrationStyles.scss';
import router from './router/router';

await api.init();
router.handleLocationChange();
createAuthPage();
buildRegistrationPage();
