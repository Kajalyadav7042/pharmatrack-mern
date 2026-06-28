import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/ui/Input";

import { addVendor } from "../../api/vendorApi";

function AddVendor() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  

  

 const onSubmit = async (data) => {
  try {
    setLoading(true);

    await addVendor(data);

    toast.success(
      "Vendor Added Successfully"
    );

    navigate("/vendors");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-3xl font-bold mb-8">
        Add Vendor
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-5"
      >
       <Input
  label="Vendor Name"
  name="name"
  register={register}
  rules={{ required: "Required" }}
  error={errors.name}
/>

<Input
  label="Email"
  name="email"
  type="email"
  register={register}
  rules={{ required: "Required" }}
  error={errors.email}
/>

<Input
  label="Phone"
  name="phone"
  register={register}
  rules={{ required: "Required" }}
  error={errors.phone}
/>

<div className="md:col-span-2">

<Input
  label="Address"
  name="address"
  register={register}
  rules={{ required: "Required" }}
  error={errors.address}
/>

</div>
<div className="md:col-span-2">

<Input
  label="GST Number"
  name="gstNumber"
  placeholder="Enter GST Number"
  register={register}
  rules={{ required: "GST Number is required" }}
  error={errors.gstNumber}
/>

</div>

<div className="md:col-span-2">

<button
  disabled={loading}
  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
>

{loading
? "Saving..."
: "Add Vendor"}

</button>

</div>

      </form>

    </div>
  );
}

export default AddVendor;