import { api } from './api/apiService';
import router from './router/router';

await api.init();
router.handleLocationChange();
