/* eslint-disable react/prop-types */
// const campaign = {
//   name: "World Blood Donor Day Drive",
//   description:
//     "Join us for our annual blood donation drive. Your contribution can save lives!",
//   banner:
//     "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1000",
//   address: "123 Medical Center Blvd, City, State",
//   start_time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Started yesterday
//   end_time: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // Ends in 2 days
//   hospital: {
//     name: "City General Hospital",
//     address: "123 Medical Center Blvd, City, State",
//   },
//   interested_donors: [
//     {
//       id: "1",
//       name: "John Doe",
//       blood_group: "A+",
//       phone: "+1 (555) 123-4567",
//       has_donated: false,
//     },
//     {
//       id: "2",
//       name: "Jane Smith",
//       blood_group: "O-",
//       phone: "+1 (555) 234-5678",
//       has_donated: true,
//     },
//   ],
//   donated_donors: [
//     {
//       id: "2",
//       name: "Jane Smith",
//       blood_group: "O-",
//       phone: "+1 (555) 234-5678",
//       donation_time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
//     },
//   ],
// };

import {
  Calendar,
  MapPin,
  Building2,
  FileText,
  Users,
  CircleChevronLeft,
} from "lucide-react";
import DonorLists from "../../components/campaign/DonorList";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client.js";
import LoaderSpinner from "../../components/LoaderSpinner.jsx";

const CampaignDetailHospital = () => {
  const { id } = useParams();

  const { data: campaigns, isLoading } = useQuery(
    ["campaign", id],
    () => apiClient.getCampaign(id),
    {
      retry: false,
    }
  );
  const campaignData = campaigns?.campaign;
  const isActive = isCampaignActive(
    campaignData?.start_time,
    campaignData?.end_time
  );
  const navigate = useNavigate();
  console.log(campaignData);
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
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Campaign Details */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Banner Image */}
                <div className="relative h-48">
                  <img
                    src={campaignData?.banner}
                    alt={campaignData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h1 className="text-xl font-bold text-white">
                      {campaignData.name}
                    </h1>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <InfoCard
                    icon={<Calendar className="text-red-500" />}
                    title="Campaign Period"
                    content={
                      <div className="space-y-1 text-sm">
                        <div>Start: {formatDate(campaignData.start_time)}</div>
                        <div>End: {formatDate(campaignData.end_time)}</div>
                      </div>
                    }
                  />

                  <InfoCard
                    icon={<MapPin className="text-red-500" />}
                    title="Location"
                    content={campaignData.address}
                  />

                  <InfoCard
                    icon={<Building2 className="text-red-500" />}
                    title="Hospital"
                    content={
                      <div className="text-sm">
                        <div className="font-medium">
                          {campaignData.hospital.name}
                        </div>
                        <div className="text-gray-600">
                          {campaignData.hospital.city}
                        </div>
                      </div>
                    }
                  />

                  <InfoCard
                    icon={<FileText className="text-red-500" />}
                    title="Description"
                    content={campaignData.description}
                  />

                  <InfoCard
                    icon={<Users className="text-red-500" />}
                    title="Participation"
                    content={
                      <div className="space-y-1 text-sm">
                        <div>
                          Interested: {campaignData.interested_donors.length}
                        </div>
                        <div>Donated: {campaignData.donated_donors.length}</div>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Donor Lists */}
            <div className="lg:col-span-2">
              <DonorLists
                interestedDonors={campaignData.interested_donors}
                donatedDonors={campaignData.donated_donors}
                campaignId={id}
                isActive={isActive}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const InfoCard = ({ icon, title, content }) => (
  <div className="flex space-x-3">
    <div className="mt-0.5">{icon}</div>
    <div>
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <div className="text-gray-600">{content}</div>
    </div>
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

const isCampaignActive = (startTime, endTime) => {
  const now = new Date().getTime();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  return now >= start && now <= end;
};
export default CampaignDetailHospital;
