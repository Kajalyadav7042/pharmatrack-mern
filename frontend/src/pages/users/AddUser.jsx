import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/ui/Input";

import Select from "../../components/ui/Select";

import { createUser } from "../../api/userApi";

function AddUser() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  defaultValues: {
    role: "pharmacist",
    status: "active",
  },
});
  

  

 const onSubmit = async (data) => {
  try {
    setLoading(true);

  await createUser(data);

toast.success("User Created Successfully");

navigate("/users");

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
        Add User
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-5"
      >
<Input
  label="Name"
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
  label="Password"
  name="password"
  type="password"
  register={register}
  rules={{
    required: "Required",
    minLength: {
      value: 6,
      message: "Minimum 6 characters",
    },
  }}
  error={errors.password}
/>

<Select
  label="Role"
  name="role"
  register={register}
  rules={{ required: "Required" }}
  options={[
    {
      value: "pharmacist",
      label: "Pharmacist",
    },
  ]}
  error={errors.role}
/>

<Select
  label="Status"
  name="status"
  register={register}
  rules={{ required: "Required" }}
  options={[
    {
      value: "active",
      label: "Active",
    },
    {
      value: "inactive",
      label: "Inactive",
    },
  ]}
  error={errors.status}
/>

<div className="md:col-span-2">

<button
  disabled={loading}
  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
>

{loading
? "Saving..."
: "Create User"}

</button>

</div>

      </form>

    </div>
  );
}

export default AddUser;