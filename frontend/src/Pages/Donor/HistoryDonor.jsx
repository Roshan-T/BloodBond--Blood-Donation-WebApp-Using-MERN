import { useState } from "react";
import HistoryBoxEmergencyRequest from "../../components/history/HistoryBoxEmergencyRequest";
import CampaignHistory from "../../components/history/CampgainHistory";
// const requestData = [
//   {
//     donorName: "You",
//     recipientName: "John Smith",
//     bloodType: "A+",
//     status: "Completed",
//     date: "Mar 15, 2024",
//     time: "10:30 AM",
//     location: "City Hospital",
//     donationType: "Direct Donation",
//   },
//   {
//     donorName: "You",
//     recipientName: "Sarah Johnson",
//     bloodType: "O-",
//     status: "In Progress",
//     date: "Mar 12, 2024",
//     time: "2:15 PM",
//     location: "Memorial Medical Center",
//     donationType: "Emergency Request",
//   },
//   {
//     donorName: "You",
//     recipientName: "Michael Brown",
//     bloodType: "B+",
//     status: "Completed",
//     date: "Mar 8, 2024",
//     time: "11:45 AM",
//     location: "Community Health Center",
//     donationType: "Direct Donation",
//   },
// ];
// export const campaignData = [
//   {
//     title: "World Blood Donor Day",
//     location: "Central Community Center",
//     date: "Feb 14, 2024",
//     participants: 120,
//     image:
//       "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1000",
//   },
//   {
//     title: "University Blood Drive",
//     location: "State University Campus",
//     date: "Jan 28, 2024",
//     participants: 85,
//     image:
//       "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000",
//   },
//   {
//     title: "Community Blood Drive",
//     location: "Downtown Medical Center",
//     date: "Jan 15, 2024",
//     participants: 95,
//     image:
//       "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=1000",
//   },
// ];
import * as apiClient from "../../api-client.js";
import { useQuery } from "react-query";
import LoaderSpinner from "../../components/LoaderSpinner.jsx";
import EmptyList from "../../components/EmptyList.jsx";

const HistoryDonor = () => {
  const { data: requestDatas, isRLoading } = useQuery(
    ["ownRequests"],
    () => apiClient.getOwnRequests(),
    {
      retry: false,
    }
  );
  const { data: campaignDatas, isCLoading } = useQuery(
    ["ownCampaigns"],
    () => apiClient.getOwnCampaigns(),
    {
      retry: false,
    }
  );
  const isLoading = isRLoading || isCLoading;
  const [selectedTab, setSelectedTab] = useState("request");
  return (
    <div className="p-2">
      <p className=" text-2xl text-black font-semibold pb-4">
        Donation History
      </p>
      <div
        className={`flex  mx-4  items-center overflow-scroll  hide-scrollbar  bg-white `}
      >
        <p
          className={`${
            selectedTab === "request" &&
            "text-red-600  border-b-2 border-red-600 "
          } p-2 font-semibold  w-full text-center cursor-pointer text-xl`}
          onClick={() => {
            setSelectedTab("request");
          }}
        >
          Accepted Requests
        </p>
        <p
          className={`${
            selectedTab === "campaigns" &&
            "text-red-600  border-b-2 border-red-600 "
          } p-2 font-semibold  w-full text-center cursor-pointer text-xl`}
          onClick={() => {
            setSelectedTab("campaigns");
          }}
        >
          Campaign Participations
        </p>
      </div>
      <div>
        {selectedTab === "request" ? (
          <div className="space-y-4">
            {isLoading ? (
              <LoaderSpinner></LoaderSpinner>
            ) : requestDatas?.length > 0 ? (
              requestDatas.requests.map((request, index) => (
                <HistoryBoxEmergencyRequest
                  key={index}
                  index={index}
                  request={request}
                ></HistoryBoxEmergencyRequest>
              ))
            ) : (
              <EmptyList message="You have not accepted request yet!!"></EmptyList>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {isLoading ? (
              <LoaderSpinner></LoaderSpinner>
            ) : campaignDatas?.length > 0 ? (
              campaignDatas?.campaigns?.map((campgain, index) => (
                <CampaignHistory
                  key={index}
                  index={index}
                  campaign={campgain}
                ></CampaignHistory>
              ))
            ) : (
              <EmptyList message="You have not joined campaign yet!!"></EmptyList>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryDonor;
