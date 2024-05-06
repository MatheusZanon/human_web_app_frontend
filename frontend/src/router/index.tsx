import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import RequireAuth from './require_auth';

/**
 * Layout
 */
import NotFound from '@/pages/layout/not-found';
import MainLayout from '@/pages/layout/main-layout';
import BlankLayout from '@/pages/layout/blank-layout';

/**
 * Auth
 */
import Login from '@/pages/login';
import Register from '@/pages/register';

/**
 * Funcionários
 */
import Funcionarios from '@/pages/rh/funcionarios';
import Profile from '@/pages/profile';
import ActivateUsersTable from '@/pages/activate-users-table';
import FuncionarioProfile from '@/pages/funcionario-profile';

/**
 * Robos
 */
import Robos from '@/pages/robos';
import RoboDetalhes from '@/pages/robos/detalhes';

/**
 * Financeiro
 */
import Relatorios from '@/pages/financeiro/relatorios';
import ClientesFinanceiro from '@/pages/financeiro/clientes';
import ClienteFinanceiroProfile from '@/pages/clientes-financeiro-profile';
import PastasGoogleDrive from '@/pages/financeiro/pastas-google-drive';

/**
 * Dashboard
 */
import Dashboard from '@/pages/dashboard';
import { ProfileCardProvider } from '@/components/profile-card/profile-card-provider';

type route = {
    path: string;
    element: React.ReactNode;
};

const allRoutes: route[] = [
    {
        path: '',
        element: <Dashboard />,
    },
    {
        path: 'robos',
        element: <Robos />,
    },
    {
        path: 'robos/:roboId',
        element: <RoboDetalhes />,
    },
    {
        path: 'financeiro/clientes',
        element: <ClientesFinanceiro />,
    },
    {
        path: 'financeiro/clientes/profile/:clienteId',
        element: <ClienteFinanceiroProfile />,
    },
    {
        path: 'financeiro/relatorios',
        element: <Relatorios />,
    },
    {
        path: 'financeiro/drive',
        element: <PastasGoogleDrive />,
    },
    {
        path: 'rh/funcionarios',
        element: <Funcionarios />,
    },
    {
        path: 'profile',
        element: (
            <ProfileCardProvider>
                <Profile />
            </ProfileCardProvider>
        ),
    },
    {
        path: 'activate-users',
        element: <ActivateUsersTable />,
    },
    {
        path: 'rh/funcionarios/:funcionarioId',
        element: (
            <ProfileCardProvider>
                <FuncionarioProfile />
            </ProfileCardProvider>
        ),
    },
];

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <BlankLayout>
                <Login />
            </BlankLayout>
        ),
    },
    {
        path: '/register',
        element: (
            <BlankLayout>
                <Register />
            </BlankLayout>
        ),
    },
    {
        path: '/main',
        element: (
            <RequireAuth>
                <MainLayout />
            </RequireAuth>
        ),
        children: allRoutes.map(({ path, element }) => ({
            path,
            element,
        })),
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
