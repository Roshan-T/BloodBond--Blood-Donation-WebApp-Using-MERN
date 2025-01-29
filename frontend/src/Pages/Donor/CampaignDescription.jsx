/* eslint-disable react/prop-types */
// const campaign = {
//   name: "World Blood Donor Day Drive",
//   description:
//     "Join us for our annual blood donation drive in celebration of World Blood Donor Day. Your donation can help save up to three lives. We'll have medical professionals on site to ensure a safe and comfortable donation experience.",
//   banner:
//     "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1000",
//   address: "123 Medical Center Drive, Downtown",
//   start_time: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
//   end_time: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days from now
//   hospital: {
//     name: "City General Hospital",
//     address: "123 Medical Center Drive, Downtown",
//   },
// };

import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  Building2,
  Clock,
  MapPin,
  FileText,
  CircleChevronLeft,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiClient from "../../api-client.js";
import LoaderSpinner from "../../components/LoaderSpinner";
import EmptyList from "../../components/EmptyList.jsx";
import { useAppContext } from "../../context/AppContext.jsx";

const CampaignDescription = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ["campaign", id],
    () => apiClient.getCampaign(id),
    {
      retry: false,
    }
  );
  const campaign = data?.campaign;

  const queryClient = useQueryClient();
  const { showToast, user } = useAppContext();
  const alreadyRegistered = campaign?.interested_donors.includes(user._id);

  const mutation = useMutation(apiClient.registerForCampaign, {
    onSuccess: async () => {
      showToast({
        message: "Campaign Registered Successfully",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries(["campaign", id]);
    },
    onError: (error) => {
      console.log(error);
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const onSubmit = () => mutation.mutate(campaign._id);
  return (
    <>
      <CircleChevronLeft
        onClick={() => {
          navigate(-1);
        }}
        className="mt-5 ml-6 w-8 h-8 text-red-700 focus:text-red-300 transition-colors cursor-pointer"
      ></CircleChevronLeft>
      {isLoading ? (
        <LoaderSpinner></LoaderSpinner>
      ) : campaign !== null ? (
        <div className="max-full mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Banner Image */}
            <div className="relative h-48 md:h-64">
              <img
                src={campaign.banner}
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h1 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                {campaign.name}
              </h1>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-6">
              {/* Time and Location Summary */}
              <div className="grid md:grid-cols-2 gap-4">
                <InfoCard
                  icon={<Calendar className="text-red-500" />}
                  title="Campaign Date"
                  content={
                    <div className="space-y-1">
                      <div>Starts: {formatDate(campaign.start_time)}</div>
                      <div>Ends: {formatDate(campaign.end_time)}</div>
                    </div>
                  }
                />
                <InfoCard
                  icon={<MapPin className="text-red-500" />}
                  title="Location"
                  content={campaign.address}
                />
              </div>

              {/* Hospital Information */}
              <InfoCard
                icon={<Building2 className="text-red-500" />}
                title="Organizing Hospital"
                content={
                  <div>
                    <h3 className="font-medium">{campaign.hospital.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {campaign.hospital.city}
                    </p>
                  </div>
                }
              />

              <InfoCard
                icon={<FileText className="text-red-500" />}
                title="About Campaign"
                content={campaign.description}
              />
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <button
                onClick={onSubmit}
                className="w-full py-3 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Clock size={20} />
                <span>
                  {alreadyRegistered
                    ? "Already Registered"
                    : "Register for Campaign"}
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyList message="No campaigns to show"></EmptyList>
      )}
    </>
  );
};

const InfoCard = ({ icon, title, content }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center space-x-2 mb-2">
      {icon}
      <h2 className="font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="text-gray-600">{content}</div>
  </div>
);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default CampaignDescription;
