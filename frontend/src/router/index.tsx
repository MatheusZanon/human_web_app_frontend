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
import ClienteFinanceiroProfile from '@/pages/financeiro/clientes/clientes-financeiro-profile';
import PastasGoogleDrive from '@/pages/financeiro/pastas-google-drive';

/**
 * Dashboard
 */
import Dashboard from '@/pages/dashboard';
import { ProfileCardProvider } from '@/components/profile-card/profile-card-provider';
import { ClienteProfileCardProvider } from '@/components/update-cliente-modal/cliente-profile-card-provider';
import PreviewArquivo from '@/pages/financeiro/pastas-google-drive/preview_arquivo';

type route = {
    path: string;
    element: React.ReactNode;
};

const allRoutes: route[] = [
    {
        path: 'dashboard',
        element: <Dashboard />,
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
        path: 'financeiro/clientes/:clienteId',
        element: (
            <ClienteProfileCardProvider>
                <ClienteFinanceiroProfile />
            </ClienteProfileCardProvider>
        ),
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
        path: 'financeiro/drive/preview/:parentFolderId/:arquivoId',
        element: <PreviewArquivo />,
    },
    {
        path: 'rh/funcionarios',
        element: <Funcionarios />,
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
