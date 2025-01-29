/* eslint-disable react/prop-types */
import { Clock, MapPin, Heart, User } from "lucide-react";

const HistoryBoxEmergencyRequest = ({ request, index }) => {
  const date = new Date(request.deadline);

  return (
    <div
      key={index}
      className="border m-2 bg-blue-50/50 border-blue-200 rounded-lg p-4 hover:border-red-100 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`px-2 py-1 rounded-full text-lg font-medium ${
                request.donated === true
                  ? "bg-green-50 text-green-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {request.donated === true ? "Completed" : "In Progress"}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500 text-lg">
              {date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-2">
              <Heart size={16} className="text-red-500" />
              <span className="text-lg font-medium text-gray-600">Donor:</span>
              <span className="text-lg text-gray-900">
                {request?.donor?.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <User size={16} className="text-red-500" />
              <span className="text-lg font-medium text-gray-600">
                Recipient:
              </span>
              <span className="text-lg text-gray-900">
                {request.patient_name}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-gray-600 text-lg">
              <MapPin size={16} className="mr-2 text-red-500" />
              <span>{request.hospital.name}</span>
            </div>
            <div className="flex items-center text-gray-600 text-lg">
              <Clock size={16} className="mr-2 text-red-500" />
              <span>{new Date(request.updatedAt).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-lg font-medium">
            {request.blood_group}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryBoxEmergencyRequest;
