import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { routes, parentRoutes } from './RoutesStructure';
import Notfound from '../pages/Notfound';

import RouteProtection from './RouteProtection';

const RouterComponent = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {routes.map((route, i) => {
                    if (
                        RouteProtection({
                            isAdminRoute: route.isAdminRoute
                        })
                    ) {
                        return (
                            <React.Fragment key={i}>
                                {route.parent ? (
                                    parentRoutes.map((parentRoute, i) => (
                                        <Route key={i} path={parentRoute.path} element={parentRoute.component && <parentRoute.component />}>
                                            {route.parent === parentRoute.path && (
                                                <Route key={i} path={route.path} element={<route.component />} />
                                            )}
                                        </Route>
                                    ))
                                ) : (
                                    <Route key={i} path={route.path} element={<route.component />} />
                                )}
                            </React.Fragment>
                        );
                    }
                })}
                <Route path="*" element={<Notfound />} />
            </>
        )
    );

    return router;
};

export default RouterComponent;