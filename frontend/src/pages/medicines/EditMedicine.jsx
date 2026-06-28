import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

import {
  getMedicineById,
  updateMedicine,
} from "../../api/medicineApi";

import { getVendors } from "../../api/vendorApi";

function EditMedicine() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchMedicine();
    fetchVendors();
  }, []);

  const fetchMedicine = async () => {
    try {

      const response =
        await getMedicineById(id);

      reset({
        ...response,
        vendorId: response.vendorId._id,
      });

    } catch (error) {

      toast.error("Medicine not found");

    }
  };

  const fetchVendors = async () => {

    const response =
      await getVendors();

    const vendorOptions =
      response.map((vendor) => ({
        value: vendor._id,
        label: vendor.name,
      }));

    setVendors(vendorOptions);

  };

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      await updateMedicine(id, data);

      toast.success(
        "Medicine Updated Successfully"
      );

      navigate("/medicines");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Update Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

<div className="bg-white rounded-xl shadow p-6">

<h1 className="text-3xl font-bold mb-8">

Edit Medicine

</h1>

<form
onSubmit={handleSubmit(onSubmit)}
className="grid md:grid-cols-2 gap-5"
>

<Input
label="Medicine Name"
name="name"
register={register}
rules={{required:"Required"}}
error={errors.name}
/>

<Input
label="Category"
name="category"
register={register}
rules={{required:"Required"}}
error={errors.category}
/>

<Input
label="Manufacturer"
name="manufacturer"
register={register}
rules={{required:"Required"}}
error={errors.manufacturer}
/>

<Input
label="Batch Number"
name="batchNumber"
register={register}
rules={{required:"Required"}}
error={errors.batchNumber}
/>

<Input
label="Purchase Price"
name="purchasePrice"
type="number"
register={register}
rules={{required:"Required"}}
error={errors.purchasePrice}
/>

<Input
label="Selling Price"
name="sellingPrice"
type="number"
register={register}
rules={{required:"Required"}}
error={errors.sellingPrice}
/>

<Input
label="Discount"
name="discount"
type="number"
register={register}
error={errors.discount}
/>

<Input
label="Quantity"
name="quantity"
type="number"
register={register}
rules={{required:"Required"}}
error={errors.quantity}
/>

<Input
label="Reorder Level"
name="reorderLevel"
type="number"
register={register}
rules={{required:"Required"}}
error={errors.reorderLevel}
/>

<Input
label="Expiry Date"
name="expiryDate"
type="date"
register={register}
rules={{required:"Required"}}
error={errors.expiryDate}
/>

<Select
label="Vendor"
name="vendorId"
register={register}
rules={{required:"Select Vendor"}}
options={vendors}
error={errors.vendorId}
/>

<Select
label="Status"
name="status"
register={register}
rules={{required:"Required"}}
options={[
{
value:"active",
label:"Active"
},
{
value:"inactive",
label:"Inactive"
}
]}
error={errors.status}
/>

<div className="md:col-span-2">

<button
disabled={loading}
className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
>

{
loading
?
"Updating..."
:
"Update Medicine"
}

</button>

</div>

</form>

</div>

  );
}

export default EditMedicine;