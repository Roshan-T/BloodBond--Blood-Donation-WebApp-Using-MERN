/* eslint-disable react/prop-types */
import { Gift, CircleChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DonorListReward from "../../../components/reward/hospital/DonorsListReward";
import { useQuery } from "react-query";

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

import * as apiClient from "../../../api-client.js";
import LoaderSpinner from "../../../components/LoaderSpinner.jsx";
const RewardDetailScreen = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ["reward", id],
    () => apiClient.getReward(id),
    {
      retry: false,
    }
  );

  console.log(data);

  return !isLoading ? (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <CircleChevronLeft
        onClick={() => {
          navigate(-1);
        }}
        className="mt-5 ml-2 mb-4 w-8 h-8 text-red-700 focus:text-red-300 transition-colors cursor-pointer"
      ></CircleChevronLeft>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <Gift className="text-red-500" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
              <p className="text-gray-600">{data.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Points Required" value={data.points_required} />
            <Stat label="Total Claims" value={data.usedQuantity} />
            <Stat
              label="Remaining Claims"
              value={data.quantity - data.usedQuantity}
            />
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <DonorListReward
          id={id}
          all_donors={data.all_donors}
          used_donors={data.redeemed_donors}
          isActive={true}
        />
      </div>
    </div>
  ) : (
    <LoaderSpinner></LoaderSpinner>
  );
};

const Stat = ({ label, value, valueClassName = "text-gray-900" }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="text-sm text-gray-600 mb-1">{label}</div>
    <div className={`text-lg font-semibold ${valueClassName}`}>{value}</div>
  </div>
);

export default RewardDetailScreen;
