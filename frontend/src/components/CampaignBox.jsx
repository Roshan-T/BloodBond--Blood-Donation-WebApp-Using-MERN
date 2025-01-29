/* eslint-disable react/prop-types */
import { MapPinCheckInside, CalendarPlus2 } from "lucide-react";

const CampaignBox = ({ campgain }) => {
  const date = new Date(campgain.start_time);
  const time = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex-none  justify-between py-2 px-4 w-80 h-96 bg-white border border-red-100/50 rounded-lg flex flex-col ">
      <img
        src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1000"
        className="w-full h-1/2 border-none rounded-t-xl "
      />

      <p className="text-lg  font-semibold text-black">{campgain.name}</p>
      <p className="flex items-center gap-2 text-lg tracking-tight font-normal text-gray-600">
        <MapPinCheckInside className="text-gray-500 w-5 h-5"></MapPinCheckInside>
        {campgain.address}
      </p>
      <p className="flex items-center gap-2 text-lg tracking-tight font-normal text-gray-600">
        <CalendarPlus2 className="text-gray-500 w-5 h-5"></CalendarPlus2>
        {time}
      </p>

      <button className="bg-red-500/95 hover:bg-red-600 cursor-pointer transition-colors duration-300 rounded-lg text-white text-lg font-normal p-1.5">
        Join Campaign
      </button>
    </div>
  );
};

export default CampaignBox;
