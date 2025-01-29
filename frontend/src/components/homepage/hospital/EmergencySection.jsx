import { AlertCircle, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LoaderSpinner from "../../LoaderSpinner";
import EmptyList from "../../EmptyList";
// const emergencyRequests = [
//   {
//     id: "1",
//     patient_name: "John Doe",
//     medical_condition: "Emergency Surgery",
//     blood_group: "A+",
//     created_at: new Date().toISOString(),
//     donor: {
//       name: "Sarah Wilson",
//       phone: "+1 (555) 123-4567",
//     },
//   },
//   {
//     id: "2",
//     patient_name: "Jane Smith",
//     medical_condition: "Accident Victim",
//     blood_group: "O-",
//     created_at: new Date().toISOString(),
//   },
//   {
//     id: "3",
//     patient_name: "Mike Johnson",
//     medical_condition: "Critical Care",
//     blood_group: "B+",
//     created_at: new Date().toISOString(),
//     donor: {
//       name: "Tom Brown",
//       phone: "+1 (555) 987-6543",
//     },
//   },
// ];
import * as apiClient from "../../../api-client.js";
import { useQuery } from "react-query";
const EmergencySection = () => {
  const { data: requests, isLoading } = useQuery(
    "request",
    () => apiClient.getOwnRequests("false"),
    {
      retry: false,
    }
  );

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Emergency Requests
          </h2>
          <p className="text-gray-500 mt-1">
            Manage active emergency blood requests
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/create-request");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Request</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <LoaderSpinner></LoaderSpinner>
        ) : requests?.length === 0 ? (
          <EmptyList></EmptyList>
        ) : (
          requests?.requests.map((request) => (
            <div
              key={request._id}
              className="bg-white flex flex-col justify-between  rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div
                className={`p-4 ${
                  request.donor ? "bg-blue-500" : "bg-red-500"
                } text-white`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle size={20} />
                    <span className="font-medium">
                      {request.donor ? "Donor Found" : "Awaiting Donor"}
                    </span>
                  </div>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {request.blood_group}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-4 ">
                <div>
                  <h3 className="font-medium text-gray-900">Patient Details</h3>
                  <p className="text-sm text-gray-600">
                    {request.patient_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {request.medical_condition}
                  </p>
                </div>

                {request.donor && (
                  <div>
                    <h3 className="font-medium text-gray-900">Donor Details</h3>
                    <p className="text-sm text-gray-600">
                      Name: {request.donor.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: {request.donor.phone_number}
                    </p>
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  Posted: {new Date(request.createdAt).toLocaleDateString()}
                </div>
                <Link to={`/request/${request._id}`} state={request}>
                  <button
                    className={`w-full   ${
                      request.donor
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-red-500 hover:bg-red-600"
                    } mt-4  cursor-pointer transition-colors duration-300 rounded-lg text-white text-lg font-normal p-1.5`}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmergencySection;
