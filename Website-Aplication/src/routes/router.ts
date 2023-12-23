import ForgotPassword from '@/pages/forgotPassword/ForgotPassword';
import Login from '@/pages/login/Login';
import ChangePassword from '@/pages/changePassword/ChangePassword';
import Unauthorized from '@/pages/unauthorized/Unauthorized';
import VnPayReturn from '@/pages/vnPayReturn/VnPayReturn';
import WarrantyInformation from '@/pages/warrantyInformation/WarrantyInformation';

const publicRoutes = [
    {path: 'login',component: Login},
    {path: 'forgot',component: ForgotPassword},
    {path: 'change-password',component: ChangePassword},
    {path:'unauthorized',component: Unauthorized},
    {path:'vnpay-return',component: VnPayReturn},
    {path:'warranty',component: WarrantyInformation},
];

export { publicRoutes};