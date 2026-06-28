import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMedicines } from "../../api/medicineApi";
import { deleteMedicine } from "../../api/medicineApi";
import { toast } from "react-toastify";


function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMedicines();
  }, [search,page]);

  const fetchMedicines = async () => {
    try {
     const response = await getMedicines({
  search,page,limit:10
});
      console.log(response);

      setMedicines(response.medicines);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this medicine?"
  );

  if (!confirmDelete) return;

  try {
    await deleteMedicine(id);

    toast.success("Medicine Deleted");

    fetchMedicines();
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
          Medicines
        </h1>

        <Link
          to="/medicines/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Medicine
        </Link>

      </div>

      <div className="my-5">
  <input
    type="text"
    placeholder="Search Medicine..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full md:w-80 border rounded-lg px-4 py-3"
  />
</div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-full">

          <thead className="bg-slate-200">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Quantity
              </th>

              <th className="p-4 text-left">
                Vendor
              </th>

              <th className="p-4 text-left">
                Expiry
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {medicines.map((medicine) => (
              <tr
                key={medicine._id}
                className="border-t"
              >
                <td className="p-4">
                  {medicine.name}
                </td>

                <td className="p-4">
                  {medicine.category}
                </td>

                <td className="p-4">
                  {medicine.quantity}
                </td>

                <td className="p-4">
                  {medicine.vendorId?.name}
                </td>

                <td className="p-4">
                  {new Date(
                    medicine.expiryDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-4 text-center">

                 <Link
  to={`/medicines/edit/${medicine._id}`}
  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
>
  Edit
</Link>

                <button
    onClick={() => handleDelete(medicine._id)}
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

      <div className="flex justify-end gap-3 mt-6">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="bg-slate-300 px-4 py-2 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Next
  </button>

</div>

    </div>
  );
}

export default MedicineList;