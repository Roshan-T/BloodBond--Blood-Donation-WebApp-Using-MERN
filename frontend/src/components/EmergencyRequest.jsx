/* eslint-disable react/prop-types */
import { Droplets, MapPinCheckInside, ClockAlert } from "lucide-react";

const calculateMinuteDifference = (givenTime) => {
  const currentTime = new Date(); // Get the current time
  const providedTime = new Date(givenTime); // Convert given time to a Date object

  // Calculate the difference in milliseconds
  const differenceInMs = Math.abs(currentTime - providedTime);

  // Convert milliseconds to minutes
  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

  return differenceInMinutes;
};
const EmergencyRequest = ({ request }) => {
  const createdMinutes = calculateMinuteDifference(request?.createdAt);
  return (
    <div className="flex-none justify-between py-2 px-4 w-80 h-52 bg-red-200/30 border border-red-300 rounded-lg flex flex-col ">
      <div className="flex justify-between items-center">
        <p className="text-lg  font-semibold text-red-600 ">
          Emergency Request
        </p>
        <p className="text-sm text-red-600 bg-red-200/70 p-1 rounded-2xl">
          Urgent
        </p>
      </div>
      <p className="flex items-center gap-2 text-lg tracking-tight font-normal text-gray-600">
        <Droplets className="text-red-400 w-5 h-5"></Droplets> Blood Type:
        {request?.blood_group}
      </p>
      <p className="flex items-center gap-2 text-lg tracking-tight font-normal text-gray-600">
        <MapPinCheckInside className="text-red-400 w-5 h-5"></MapPinCheckInside>{" "}
        {request?.hospital?.name},{request?.hospital?.city}
      </p>
      <p className="flex items-center gap-2 text-lg tracking-tight font-normal text-gray-600">
        <ClockAlert className="text-red-400 w-5 h-5"></ClockAlert> Posted{" "}
        {createdMinutes} min ago
      </p>
      <button className="bg-red-500/95 hover:bg-red-600 cursor-pointer transition-colors duration-300 rounded-lg text-white text-lg font-normal p-1.5">
        Respond Now
      </button>
    </div>
  );
};

export default EmergencyRequest;
