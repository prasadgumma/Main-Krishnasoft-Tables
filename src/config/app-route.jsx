import React from "react";
import App from "./../app.jsx";

import Home from "./../pages/home/home.js";
import Error from "./../pages/error/error.js";
import TableElements from "../components/tables/table-elements.js";
import TablePlugins from "../components/tables/table-plugins.js";
import { Outlet } from "react-router-dom";
import MembersTable from "../components/tables/table-plugins1.js";

const AppRoute = [
  {
    path: "*",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "*", element: <Error /> },
      {
        path: "table/*",
        element: <Outlet />,
        children: [
          { path: "elements", element: <TableElements /> },
          { path: "plugins", element: <TablePlugins /> },
          { path: "plugins1", element: <MembersTable /> },
          // { path: '*', element: <ExtraError /> }
        ],
      },
    ],
  },
];

export default AppRoute;
