/* eslint-disable react/prop-types */
import { MapPin, CheckCircle, Users } from "lucide-react";

const CampaignHistory = ({ campaign }) => {
  const date = new Date(campaign.start_time);

  return (
    <div className="border m-2 bg-blue-50/50 border-blue-200  rounded-lg p-4 hover:border-red-100 transition-colors">
      <div className="flex items-start gap-4">
        <img
          src={campaign.banner}
          alt={campaign.name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between space-x-2 mb-2">
            <span className="text-lg flex items-center  text-gray-500">
              <CheckCircle
                size={16}
                className="mr-2 selection:text-green-500"
              />
              {date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-lg font-medium ${
                campaign.isDonated === true
                  ? "bg-green-50 text-green-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {campaign.isDonated === true ? "Participated" : "Registered"}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{campaign.name}</h3>
          <div className="space-y-1">
            <div className="flex items-center text-gray-600 text-lg">
              <MapPin size={16} className="mr-2 text-red-500" />
              <span>{campaign.address}</span>
            </div>
            <div className="flex items-center text-gray-600 text-lg">
              <Users size={16} className="mr-2 text-red-500" />
              <span>
                {campaign.interested_donors.length} Interested and{" "}
                {campaign.donated_donors.length} Participated
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CampaignHistory;
