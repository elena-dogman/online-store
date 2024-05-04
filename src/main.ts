import { api } from './api/apiService';
import { createAuthPage } from './pages/AuthPage/AuthPage';
import router from './router/router';

await api.init();
router.handleLocationChange();
createAuthPage();
