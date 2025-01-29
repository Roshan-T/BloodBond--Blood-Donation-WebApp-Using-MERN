import {
  User,
  Mail,
  Phone,
  MapPin,
  Droplet,
  Calendar,
  Award,
} from "lucide-react";
import { useQuery } from "react-query";

import * as apiClient from "../../api-client.js";
import LoaderSpinner from "../../components/LoaderSpinner.jsx";

const ProfileDonor = () => {
  const { data, isLoading } = useQuery(["user"], () => apiClient.getUser(), {
    retry: false,
  });

  if (isLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }
  const userData = data?.user;
  console.log(userData);
  const DOB = new Date(userData.DOB);
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r m-4 rounded-t-xl from-red-600 to-red-700" />

        <div className="px-8 pb-8">
          <div className="flex  flex-col sm:flex-row items-center sm:items-end -mt-16 gap-6">
            <img
              src={userData?.profilePic}
              alt={userData.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                {userData.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{userData.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-red-600" />
                  <span>{userData.bloodGroup}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{userData.city}</span>
                </div>
              </div>
            </div>

            <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{userData.phone_number}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-900">
                  {DOB.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 m-2 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Full Name
            </label>
            <p className="mt-1 text-gray-900">{userData.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <p className="mt-1 text-gray-900">{userData.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Phone Number
            </label>
            <p className="mt-1 text-gray-900">{userData.phone_number}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Gender
            </label>
            <p className="mt-1 text-gray-900">{userData.gender}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Blood Group
            </label>
            <p className="mt-1 text-gray-900">{userData.bloodGroup}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Role
            </label>
            <p className="mt-1 text-gray-900">{userData.role}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Date of Birth
            </label>
            <p className="mt-1 text-gray-900">
              {DOB.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Location
            </label>
            <p className="mt-1 text-gray-900">{userData.city}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="bg-red-50 m-4 w-full rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Last Donation</h3>
            <Calendar className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-semibold text-red-600">
            {new Date(userData.lastDonated).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="bg-red-50 m-4 w-full rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Available Points</h3>
            <Award className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-semibold text-red-600">
            {userData.reward}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileDonor;
