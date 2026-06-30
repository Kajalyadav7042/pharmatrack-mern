import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getSales } from "../../api/saleApi";

function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await getSales();

      setSales(response);

    } catch (error) {

      toast.error("Failed to load sales");

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <h2 className="text-center text-2xl">
        Loading...
      </h2>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Sales History
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-full">

          <thead className="bg-slate-200">

            <tr>

              <th className="p-4 text-left">
                Medicines
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Sold By
              </th>

              <th className="p-4 text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {sales.map((sale) => (

              <tr
                key={sale._id}
                className="border-t"
              >

                <td className="p-4">

                  {sale.medicines.map(
                    (medicine) => (

                      <div
                        key={medicine.medicineId._id}
                      >
                        {medicine.medicineId.name}

                        {" - "}

                        Qty :
                        {medicine.quantity}
                      </div>

                    )
                  )}

                </td>

                <td className="p-4">

                  ₹
                  {sale.totalAmount.toLocaleString(
                    "en-IN"
                  )}

                </td>

                <td className="p-4">

                  {sale.soldBy?.name}

                </td>

                <td className="p-4">

                  {new Date(
                    sale.createdAt
                  ).toLocaleDateString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default SalesHistory;