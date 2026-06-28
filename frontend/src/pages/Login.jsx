import { useForm } from "react-hook-form";
import { FaCapsules } from "react-icons/fa";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";

import { loginSuccess } from "../features/auth/authSlice";

import { toast } from "react-toastify";

import { useState } from "react";


function Login() {
    const dispatch = useDispatch();

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

    const response =
      await loginUser(data);

  

    dispatch(loginSuccess(response));

    toast.success("Login Successful");

    navigate("/dashboard");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Login Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left */}

      <div className="hidden lg:flex bg-blue-700 text-white flex-col justify-center px-16">

        <div className="flex items-center gap-4 mb-8">
          <FaCapsules className="text-5xl" />

          <h1 className="text-5xl font-bold">
            PharmaTrack
          </h1>
        </div>

        <h2 className="text-3xl font-semibold mb-5">
          Pharmacy Inventory &
          Management System
        </h2>

        <p className="text-blue-100 text-lg leading-8">
          Manage medicines,
          inventory, vendors,
          purchase orders and sales
          from one place.
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center justify-center bg-slate-100 min-h-screen px-4">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-center">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Login to continue
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

<Input
  label="Email"
  name="email"
  type="email"
  placeholder="Enter your email"
  register={register}
  rules={{
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  }}
  error={errors.email}
/>

<Input
  label="Password"
  name="password"
  type="password"
  placeholder="Enter your password"
  register={register}
  rules={{
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  }}
  error={errors.password}
/>

           <Button loading={loading}>
  Login
</Button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;