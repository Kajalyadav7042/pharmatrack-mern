import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getProfile } from "../api/profileApi";
import { toast } from "react-toastify";

function Profile() {
  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response =
        await getProfile();

      setProfile(response);

    } catch (error) {

      toast.error(
        "Failed to load profile"
      );

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
    <div className="max-w-3xl mx-auto">

      <div className="bg-white rounded-xl shadow p-8">

        <div className="flex flex-col items-center">

          <FaUserCircle className="text-8xl text-blue-600" />

          <h2 className="text-3xl font-bold mt-4">
            {profile.name}
          </h2>

          <p className="text-gray-500">
            {profile.role}
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div>

            <label className="text-gray-500">
              Name
            </label>

            <p className="font-semibold text-lg">
              {profile.name}
            </p>

          </div>

          <div>

            <label className="text-gray-500">
              Email
            </label>

            <p className="font-semibold text-lg">
              {profile.email}
            </p>

          </div>

          <div>

            <label className="text-gray-500">
              Role
            </label>

            <p className="font-semibold text-lg capitalize">
              {profile.role}
            </p>

          </div>

          <div>

            <label className="text-gray-500">
              Joined
            </label>

            <p className="font-semibold text-lg">

              {new Date(
                profile.createdAt
              ).toLocaleDateString()}

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;