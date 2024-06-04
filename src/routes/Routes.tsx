import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import Dashboard from "../components/dashboard/Dashboard";
import {ProtectedRoute} from "./ProtectedRoute";

interface PublicRoute {
  path: string;
  element: React.ReactNode;
}

interface AuthenticatedRoute {
  path: string;
  element: React.ReactNode;
  children?: Array<PublicRoute>;
}

const AppRoutes: React.FC = () => {
  const publicRoutes: PublicRoute[] = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const authenticatedRoutes: AuthenticatedRoute[] = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard/>,
        },
      ],
    },
  ];

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {authenticatedRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children?.map((childrenRoute)=>(
            <Route key={childrenRoute.path} element={childrenRoute.element}/>
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default AppRoutes;
