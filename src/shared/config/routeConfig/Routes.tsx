import { RouteProps } from 'react-router-dom';
// components
import { TimerPage } from 'pages/TimerPage';
import { NotFound } from 'pages/NotFound';

export enum AppRoutes {
    TIMER_PAGE = 'TimerPage',
    NOT_FOUND = 'NotFound',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.TIMER_PAGE]: '/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.TIMER_PAGE]: {
        path: RoutePath.TimerPage,
        element: <TimerPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.NotFound,
        element: <NotFound />,
    },
};
