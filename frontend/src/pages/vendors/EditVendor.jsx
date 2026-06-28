import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/ui/Input";

import {
  getVendorById,
  updateVendor,
} from "../../api/vendorApi";

function EditVendor() {

  const { id } = useParams();

  const navigate = useNavigate();



  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchVendor();
  }, []);

  const fetchVendor = async () => {
    try {

      const response =
await getVendorById(id);

reset(response);;

    } catch (error) {

      toast.error("Vendor not found");

    }
  };


  const onSubmit = async (data) => {

    try {

      setLoading(true);

     await updateVendor(id,data);

toast.success(
"Vendor Updated Successfully"
);

navigate("/vendors");

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

Edit Vendor

</h1>

<form
onSubmit={handleSubmit(onSubmit)}
className="grid md:grid-cols-2 gap-5"
>

<Input
  label="Vendor Name"
  name="name"
  register={register}
  rules={{
    required:"Required"
  }}
  error={errors.name}
/>

<Input
  label="Email"
  name="email"
  type="email"
  register={register}
  rules={{
    required:"Required"
  }}
  error={errors.email}
/>

<Input
  label="Phone"
  name="phone"
  register={register}
  rules={{
    required:"Required"
  }}
  error={errors.phone}
/>

<div className="md:col-span-2">

<Input
  label="GST Number"
  name="gstNumber"
  register={register}
  rules={{
    required:"Required"
  }}
  error={errors.gstNumber}
/>

</div>

<div className="md:col-span-2">

<Input
  label="Address"
  name="address"
  register={register}
  rules={{
    required:"Required"
  }}
  error={errors.address}
/>

</div>

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
"Update Vendor"
}

</button>

</div>

</form>

</div>

  );
}

export default EditVendor;