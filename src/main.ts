// import { api } from './api/apiService';
import './pages/RegistrationPage/registrationStyles.scss';
import router from './router/router';
import { getProject } from './api/apiService';

getProject();

// await api.init();
router.handleLocationChange();
