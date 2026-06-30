import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import MedicineList from "../pages/medicines/MedicineList";
import AddMedicine from "../pages/medicines/AddMedicine";
import EditMedicine from "../pages/medicines/EditMedicine"
import PurchaseOrder from "../pages/orders/PurchaseOrder";
import OrdersList from "../pages/orders/OrdersList";
import CreateSale from "../pages/sales/CreateSale";
import VendorList from "../pages/vendors/VendorList";
import AddVendor from "../pages/vendors/AddVendor";
import EditVendor from "../pages/vendors/EditVendor";
import SalesHistory from "../pages/sales/SaleHistory";
import UserList from "../pages/users/UserList";
import AddUser from "../pages/users/AddUser";
import EditUser from "../pages/users/EditUser";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
   path:"/medicines",
   element:<MedicineList/>
},
{
    path:"/medicines/add",
    element:<AddMedicine/>
},
{
    path:"/medicines/edit/:id",
    element:<EditMedicine/>
},
{
    path:"/orders",
    element:<PurchaseOrder/>
},

{
   path:"/orders/list",
   element:<OrdersList/>
},
{
    path:"/sales",
    element:<CreateSale/>
},
{
  path: "/vendors",
  element: <PrivateRoute>
    <VendorList />
  </PrivateRoute>
},
{
    path:"/vendors/add",
    element:<PrivateRoute>
      <AddVendor/>
    </PrivateRoute>
},

{
  path: "/vendors/edit/:id",
  element: <PrivateRoute>
    <EditVendor />
  </PrivateRoute>,
},
{
  path:"/sales/history",
  element:<SalesHistory/>

},
{
  path: "/users",
  element: <UserList />,
},
{
  path: "/users/add",
  element: <AddUser />,
},
{
  path: "/users/edit/:id",
  element: <EditUser />,
},


    ],
  },
]);

export default router;