import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EmergencyRequest from "../../components/EmergencyRequest";
import CampaignBox from "../../components/CampaignBox";
import LoaderSpinner from "../../components/LoaderSpinner.jsx";
import * as apiClient from "../../api-client.js";
import EmptyList from "../../components/EmptyList.jsx";

const HomePage = () => {
  const containerRef = useRef(null);
  const containerRef1 = useRef(null);
  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 200; // Adjust this value to control scroll distance
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const scroll1 = (direction) => {
    if (containerRef1.current) {
      const scrollAmount = 200; // Adjust this value to control scroll distance
      containerRef1.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const { data: requests, isLoading } = useQuery(
    "requests",
    apiClient.getAllActiveRequest,
    {
      retry: false,
    }
  );
  const { data: campaigns, isCLoading } = useQuery(
    "campaigns",
    apiClient.getAllActiveCampaigns,
    {
      retry: false,
    }
  );
  return (
    <div className="px-6 flex flex-col">
      <HeroSection></HeroSection>
      <StatsBar></StatsBar>
      <div className="text-2xl text-black font-semibold pb-4">
        Emergency Requests
        {isLoading ? (
          <LoaderSpinner></LoaderSpinner>
        ) : requests?.length > 0 ? (
          <div className="relative max-w-full">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={containerRef}
              className="flex overflow-x-auto gap-4 px-4 py-4 hide-scrollbar"
            >
              {requests.requests.map((item) => (
                <Link
                  key={item._id}
                  to={`/request/${item._id}`}
                  state={{ item }}
                >
                  <EmergencyRequest request={item}></EmergencyRequest>
                </Link>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        ) : (
          <EmptyList message="No Emergency Request Yet"></EmptyList>
        )}
      </div>
      <p className="text-2xl text-black font-semibold pb-4">Active Campagins</p>
      {isCLoading ? (
        <LoaderSpinner></LoaderSpinner>
      ) : campaigns?.length > 0 ? (
        <div className="relative max-w-full">
          {/* Left Arrow */}
          <button
            onClick={() => scroll1("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <div
            ref={containerRef1}
            className="flex overflow-x-auto gap-4 px-4 py-4 hide-scrollbar"
          >
            {campaigns.campaigns.map((item) => (
              <Link
                key={item._id}
                to={`/campaign/${item._id}`}
                state={{ item }}
              >
                <CampaignBox key={item._id} campgain={item}></CampaignBox>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll1("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      ) : (
        <EmptyList message="No Campaigns Yet"> </EmptyList>
      )}
    </div>
  );
};

export default HomePage;
import { Users, Droplet, Building2 } from "lucide-react";

const StatsBar = () => {
  const stats = [
    {
      icon: <Users className="text-red-500" size={24} />,
      value: "10+",
      label: "Active Donors",
    },
    {
      icon: <Droplet className="text-red-500" size={24} />,
      value: "40+",
      label: "Lives Saved",
    },
    {
      icon: <Building2 className="text-red-500" size={24} />,
      value: "5+",
      label: "Partner Hospitals",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-red-200 transition-colors"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            {stat.icon}
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

import { Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white p-8 rounded-2xl mb-8 overflow-hidden relative">
      <div className="absolute right-0 top-0 opacity-10">
        <Droplets size={240} />
      </div>
      <div className="relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 max-w-xl">
          Every Drop Counts: Be a Hero in Someones Story
        </h1>
        <p className="text-red-100 max-w-lg text-lg mb-6">
          Join our blood donation campaign and make a difference in your
          community. Your donation can save up to three lives.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center space-x-2">
            <span>Donate a blood</span>
          </button>
        </div>
      </div>
    </div>
  );
};
