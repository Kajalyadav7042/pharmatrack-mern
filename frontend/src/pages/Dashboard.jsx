import { useEffect, useState } from "react";

import {
  FaCapsules,
  FaUsers,
  FaExclamationTriangle,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";

import { getDashboardStats } from "../api/dashboardApi";
import StatCard from "../components/dashboard/StatCard";

function Dashboard() {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response =
        await getDashboardStats();

      setStats(response);

    } catch (error) {
      console.log(error);

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
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">

        <StatCard
          title="Medicines"
          value={stats.totalMedicines}
          icon={<FaCapsules />}
          color="text-blue-600"
        />

        <StatCard
          title="Vendors"
          value={stats.totalVendors}
          icon={<FaUsers />}
          color="text-green-600"
        />

        <StatCard
          title="Low Stock"
          value={stats.lowStockCount}
          icon={
            <FaExclamationTriangle />
          }
          color="text-yellow-500"
        />

        <StatCard
          title="Expiring Soon"
          value={
            stats.expiringSoonCount
          }
          icon={<FaClock />}
          color="text-red-500"
        />

        <StatCard
          title="Today's Sales"
          value={`₹${stats.todaySales}`}
          icon={<FaRupeeSign />}
          color="text-emerald-600"
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Low Stock */}

        <div className="bg-white rounded-xl shadow">

          <div className="border-b p-5">

            <h2 className="text-xl font-semibold">

              Low Stock Medicines

            </h2>

          </div>

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-4">
                  Medicine
                </th>

                <th className="text-left p-4">
                  Qty
                </th>

              </tr>

            </thead>

            <tbody>

              {stats.lowStockMedicines
                ?.length ? (

                stats.lowStockMedicines.map(
                  (medicine) => (

                    <tr
                      key={medicine._id}
                      className="border-t"
                    >

                      <td className="p-4">
                        {medicine.name}
                      </td>

                      <td className="p-4">
                        {medicine.quantity}
                      </td>

                    </tr>
                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="2"
                    className="text-center p-6"
                  >
                    No low stock medicines
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* Expiring */}

        <div className="bg-white rounded-xl shadow">

          <div className="border-b p-5">

            <h2 className="text-xl font-semibold">

              Expiring Soon

            </h2>

          </div>

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-4">
                  Medicine
                </th>

                <th className="text-left p-4">
                  Expiry
                </th>

              </tr>

            </thead>

            <tbody>

              {stats.expiringSoonMedicines
                ?.length ? (

                stats.expiringSoonMedicines.map(
                  (medicine) => (

                    <tr
                      key={medicine._id}
                      className="border-t"
                    >

                      <td className="p-4">
                        {medicine.name}
                      </td>

                      <td className="p-4">

                        {new Date(
                          medicine.expiryDate
                        ).toLocaleDateString()}

                      </td>

                    </tr>
                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="2"
                    className="text-center p-6"
                  >
                    No medicines expiring soon
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;