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
import AdminRoute from "../components/AdminRoute";
import Profile from "../pages/Profile"





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
    element:<AdminRoute>
      <AddMedicine/>
    </AdminRoute>
},
{
    path:"/medicines/edit/:id",
    element:<AdminRoute>
      <EditMedicine/>
    </AdminRoute>
},
{
    path:"/orders",
    element:<AdminRoute>
      <PurchaseOrder/>
    </AdminRoute>
},

{
   path:"/orders/list",
   element:<AdminRoute>
    <OrdersList/>
   </AdminRoute>
},
{
    path:"/sales",
    element:<CreateSale/>
},
{
  path: "/vendors",
  element:   <AdminRoute>
      <VendorList />
    </AdminRoute>
},
{
    path:"/vendors/add",
    element: <AdminRoute>
      <AddVendor />
    </AdminRoute>
},

{
  path: "/vendors/edit/:id",
  element:   <AdminRoute>
      <EditVendor />
    </AdminRoute>
},
{
  path:"/sales/history",
  element:<SalesHistory/>

},
{
  path: "/users",
  element: <AdminRoute>
    <UserList />
  </AdminRoute>,
},
{
  path: "/users/add",
  element: <AdminRoute>
    <AddUser />
  </AdminRoute>,
},
{
  path: "/users/edit/:id",
  element: <AdminRoute>
    <EditUser />
  </AdminRoute>,
},
{
  path: "/profile",
  element: <Profile />,
},


    ],
  },
]);

export default router;