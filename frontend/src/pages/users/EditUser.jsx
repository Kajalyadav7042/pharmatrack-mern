import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/ui/Input";

import Select from "../../components/ui/Select";

import {
  getUserById,
  updateUser,
} from "../../api/userApi";

function EditUser() {

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
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {

      const response =
await getUserById(id);

reset({
  ...response,
  password: "",
});

    } catch (error) {

      toast.error("User not found");

    }
  };


  const onSubmit = async (data) => {

    try {

      setLoading(true);

    await updateUser(id, data);

toast.success(
  "User Updated Successfully"
);

navigate("/users");

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

Edit User

</h1>

<form
onSubmit={handleSubmit(onSubmit)}
className="grid md:grid-cols-2 gap-5"
>

<Input
  label="Name"
  name="name"
  register={register}
  rules={{
    required: "Required",
  }}
  error={errors.name}
/>

<Input
  label="Email"
  name="email"
  type="email"
  register={register}
  rules={{
    required: "Required",
  }}
  error={errors.email}
/>

<Input
  label="Password"
  name="password"
  type="password"
  placeholder="Leave blank to keep same password"
  register={register}
  error={errors.password}
/>

<Select
  label="Role"
  name="role"
  register={register}
  rules={{
    required: "Required",
  }}
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
  rules={{
    required: "Required",
  }}
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

{
loading
?
"Updating..."
:
"Update User"
}

</button>

</div>

</form>

</div>

  );
}

export default EditUser;