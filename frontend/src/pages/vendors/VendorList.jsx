import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getVendors,
  deleteVendor,
} from "../../api/vendorApi";

function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await getVendors();

      setVendors(response);
    } catch (error) {
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this vendor?"
    );

    if (!confirmDelete) return;

    try {
      await deleteVendor(id);

      toast.success("Vendor Deleted");

      fetchVendors();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
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
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Vendors
        </h1>

        <Link
          to="/vendors/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Vendor
        </Link>

      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-full">

          <thead className="bg-slate-200">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Address
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {vendors.map((vendor) => (

              <tr
                key={vendor._id}
                className="border-t"
              >

                <td className="p-4">
                  {vendor.name}
                </td>

                <td className="p-4">
                  {vendor.email}
                </td>

                <td className="p-4">
                  {vendor.phone}
                </td>

                <td className="p-4">
                  {vendor.address}
                </td>

                <td className="p-4 text-center">

                  <Link
                    to={`/vendors/edit/${vendor._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(vendor._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default VendorList;