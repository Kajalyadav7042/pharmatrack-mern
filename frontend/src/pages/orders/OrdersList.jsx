import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

import {
  getPurchaseOrders,
  updateOrderStatus,
} from "../../api/purchaseOrderApi";

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response =
        await getPurchaseOrders();

      setOrders(response);

    } catch (error) {

      toast.error(
        "Failed to load orders"
      );

    }
  };

  const handleStatusChange = async (
    orderId,
    selectedStatus
  ) => {
    try {
      await updateOrderStatus(
        orderId,
        selectedStatus.value
      );

      toast.success(
        "Status Updated"
      );

      fetchOrders();

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    }
  };

  const statusOptions = [
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Approved",
      label: "Approved",
    },
    {
      value: "Delivered",
      label: "Delivered",
    },
    {
      value: "Cancelled",
      label: "Cancelled",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-3xl font-bold mb-8">
        Purchase Orders
      </h1>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-200">

            <tr>

              <th className="p-4">
                Vendor
              </th>

              <th className="p-4">
                Medicines
              </th>

              <th className="p-4">
                Total
              </th>

              <th className="p-4">
                Ordered By
              </th>

              <th className="p-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-t"
              >

                <td className="p-4">
                  {order.vendorId.name}
                </td>

                <td className="p-4">

                  {order.medicines.map(
                    (medicine) => (

                      <div
                        key={
                          medicine._id
                        }
                      >

                        {
                          medicine
                            .medicineId
                            .name
                        }

                        {" "}

                        (

                        {
                          medicine.quantity
                        }

                        )

                      </div>

                    )
                  )}

                </td>

                <td className="p-4">

                  ₹
                  {order.totalAmount}

                </td>

                <td className="p-4">

                  {
                    order
                      .orderedBy
                      .name
                  }

                </td>

                <td className="p-4">

                <select
  value={order.status}
  onChange={(e) =>
    handleStatusChange(order._id, {
      value: e.target.value,
    })
  }
  className="border rounded-lg px-4 py-2 w-40 pr-12"
>
  <option>Pending</option>
  <option>Approved</option>
  <option>Delivered</option>
  <option>Cancelled</option>
</select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default OrdersList;