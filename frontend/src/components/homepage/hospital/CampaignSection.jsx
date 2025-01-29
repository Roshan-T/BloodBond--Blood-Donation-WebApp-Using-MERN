import { Calendar, Plus, Users } from "lucide-react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

// const campaigns = [
//   {
//     id: "1",
//     name: "World Blood Donor Day Drive",
//     banner:
//       "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1000",
//     start_time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
//     end_time: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
//     interested_donors: [
//       { id: "1", name: "John Doe" },
//       { id: "2", name: "Jane Smith" },
//     ],
//     donated_donors: [
//       {
//         id: "2",
//         name: "Jane Smith",
//         donation_time: new Date().toISOString(),
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "University Blood Drive",
//     banner:
//       "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000",
//     start_time: new Date(Date.now()).toISOString(),
//     end_time: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
//     interested_donors: [
//       { id: "3", name: "Mike Johnson" },
//       { id: "4", name: "Sarah Wilson" },
//     ],
//     donated_donors: [],
//   },
// ];

import * as apiClient from "../../../api-client.js";
import LoaderSpinner from "../../LoaderSpinner.jsx";
import EmptyList from "../../EmptyList.jsx";

const CampaignSection = () => {
  const { data: campaigns, isLoading } = useQuery(
    "campgain",
    () => apiClient.getOwnCampaigns("false"),
    {
      retry: false,
    }
  );
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Active Campaigns</h2>
          <p className="text-gray-500 mt-1">
            Manage your blood donation campaigns
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/create-campaign");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Campaign</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <LoaderSpinner></LoaderSpinner>
        ) : campaigns?.length > 0 ? (
          campaigns?.campaigns?.map((campaign) => {
            const interestedCount = campaign.interested_donors.length;
            const donatedCount = campaign.donated_donors.length;

            return (
              <div
                key={campaign._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={campaign.banner}
                    alt={campaign.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white">
                      {campaign.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span>
                        {new Date(campaign.start_time).toLocaleDateString()} -
                        {new Date(campaign.end_time).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Users size={16} className="mr-1" />
                        <span>{interestedCount} interested</span>
                      </div>
                      <div className="text-green-600 text-sm font-medium">
                        {donatedCount} donated
                      </div>
                    </div>
                  </div>
                  <Link to={`/campaign/${campaign._id}`} state={campaign}>
                    <button className="w-full mt-4 bg-red-500/95 hover:bg-red-600 cursor-pointer transition-colors duration-300 rounded-lg text-white text-lg font-normal p-1.5">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <EmptyList message="Empty Campagin List"></EmptyList>
        )}
      </div>
    </div>
  );
};

export default CampaignSection;
