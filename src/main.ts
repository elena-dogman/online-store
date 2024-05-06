import { api } from './api/apiService';
import { createAuthPage } from './pages/AuthPage/AuthPage';
// import { buildRegistrationPage } from './pages/RegistrationPage/registrationPage';
// import './components/registrationForm/countryList';
import './pages/RegistrationPage/registrationStyles.scss';
import router from './router/router';
// import { buildRegistrationPage } from './pages/RegistrationPage/registrationPage';

await api.init();
router.handleLocationChange();
createAuthPage();
// buildRegistrationPage();
