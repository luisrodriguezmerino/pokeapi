import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar"


function Layout() {
  return (
    <>
      <head className="block">
      </head>
      <body >
        <NavBar />
        <div className="lg:grid lg:grid-cols-5">
          <div className="lg:grid lg:col-span-3 lg:col-start-2">
            <Outlet />
          </div>
        </div>
      </body>
    </>
  );
}

export default Layout;
