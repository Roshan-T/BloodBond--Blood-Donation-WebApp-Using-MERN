/* eslint-disable react/prop-types */
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "react-query";
// const people = [
//   {
//     name: "John Doe",
//     bloodGroup: "O+",
//     location: { lat: 27.7172, lng: 85.324 }, // Kathmandu, Nepal
//     image: "https://randomuser.me/api/portraits/men/1.jpg",
//   },
//   {
//     name: "Jane Smith",
//     bloodGroup: "A-",
//     location: { lat: 28.3949, lng: 84.124 }, // Pokhara, Nepal
//     image: "https://randomuser.me/api/portraits/women/2.jpg",
//   },
//   {
//     name: "Alice Johnson",
//     bloodGroup: "B+",
//     location: { lat: 27.7, lng: 85.3333 }, // Lalitpur, Nepal
//     image: "https://randomuser.me/api/portraits/women/3.jpg",
//   },
//   {
//     name: "Bob Brown",
//     bloodGroup: "AB-",
//     location: { lat: 27.7167, lng: 85.32 }, // Bhaktapur, Nepal
//     image: "https://randomuser.me/api/portraits/men/4.jpg",
//   },
//   {
//     name: "Charlie Davis",
//     bloodGroup: "O-",
//     location: { lat: 27.684, lng: 85.352 }, // Kirtipur, Nepal
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//   },
// ];

import * as apiClient from "../api-client.js";
import LoaderSpinner from "../components/LoaderSpinner.jsx";
import EmptyList from "../components/EmptyList.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const Donor = () => {
  const { data, isLoading } = useQuery("donors", apiClient.getDonors, {
    retry: false,
  });
  const { user } = useAppContext();
  const [selectedGroup, setSelectedGroup] = useState("");
  const donors = data?.donors;

  return isLoading ? (
    <LoaderSpinner></LoaderSpinner>
  ) : (
    <div className="flex justify-center">
      <MapContainer
        center={[user.latitude, user.longitude]}
        zoom={12}
        style={{ height: "800px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data?.length > 0 ? (
          donors?.map((city) => (
            <Marker position={[city.latitude, city.longitude]} key={city._id}>
              <Popup>
                <span>{city.name}</span>
              </Popup>
            </Marker>
          ))
        ) : (
          <EmptyList></EmptyList>
        )}
      </MapContainer>
      <div className="flex m-5 flex-col hide-scrollbar w-full h-[800px] p-2 gap-4 overflow-y-scroll ">
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value.toString())}
          className="border w-full rounded-md p-2 text-gray-700 font-normal"
        >
          <option className="text-sm font-bold" value="">
            Select Blood Group
          </option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option value={group} key={group}>
              {group}
            </option>
          ))}
        </select>

        {donors.map((item) => {
          if (item.bloodGroup === selectedGroup || selectedGroup === "") {
            return <People people={item} key={item.name}></People>;
          }
        })}
      </div>
    </div>
  );
};

const People = ({ people }) => {
  return (
    <div className="flex w-full bg-blue-50/50 items-center border relative border-red-400/50  h-24 rounded-2xl p-3">
      <img
        src={people.profilePic}
        className="w-20 rounded-full h-20 object-cover shadow-lg mr-4"
        alt=""
      />
      <div className="flex flex-col gap-3 ">
        <span className="text-lg font-semibold">{people.name}</span>
        <p className="text-gray-500">Kathmandu</p>
      </div>
      <div className="absolute text-white right-0 top-0 p-2 bg-primary rounded-tr-xl rounded-bl-xl">
        {people.bloodGroup}
      </div>
    </div>
  );
};

export default Donor;
