/* eslint-disable react/prop-types */
import { Users, Heart } from "lucide-react";
const Landing = () => {
  return (
    <>
      <Hero></Hero>

      <div className="grid place-items-center sm:grid-cols-4 grid-cols-1 p-6 gap-6 ">
        <div className="flex flex-col items-center space-y-0 ">
          <Users className="w-8 h-8 text-primary"></Users>
          <p className="font-bold text-2xl">9K+</p>
          <p className=" text-gray-700 text-xs">Donors</p>
        </div>
        <div className="flex flex-col items-center space-y-0 ">
          <Heart className="w-8 h-8 text-primary"></Heart>
          <p className="font-bold text-2xl">20K+</p>
          <p className=" text-gray-700 text-xs">Lives Saved</p>
        </div>
        <div className="flex flex-col items-center space-y-0 ">
          <Users className="w-8 h-8 text-primary"></Users>
          <p className="font-bold text-2xl">10K+</p>
          <p className=" text-gray-700 text-xs">Blood Units Collected</p>
        </div>
        <div className="flex flex-col items-center space-y-0 ">
          <Users className="w-8 h-8 text-primary"></Users>
          <p className="font-bold text-2xl">24/7</p>
          <p className=" text-gray-700 text-xs">Supports Available</p>
        </div>
      </div>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Donate Blood?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              title={"Safe and Simple"}
              paragraph={
                "The donation process is quick, safe, and supervised by healthcare professionals."
              }
              image={
                "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=400"
              }
            ></Card>
            <Card
              title={"Emergency Ready"}
              paragraph={
                " Your donation helps maintain a stable blood supply for emergencies and routine procedures."
              }
              image={
                "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=400"
              }
            ></Card>
            <Card
              title={"Community Impact"}
              paragraph={
                " Each donation can help save multiple lives in your local community."
              }
              image={
                "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400"
              }
            ></Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
const Hero = () => {
  return (
    <div className="relative mb-0 ">
      <div className="absolute inset-0 bg-gradient-to-r from-red-400/70 to-red-800/80 z-10" />
      <div
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('landing.jpg')",
        }}
      >
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Give the Gift of Life: Donate Blood Today
            </h1>
            <p className="text-xl mb-8">
              A single blood donation can make a world of difference. Help us
              save lives and bring hope to those in need.
            </p>
            <button className=" flex  gap-3 items-center bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-red-100 transition-colors">
              <Heart></Heart> Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ image, title, paragraph }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <img
        src={image}
        alt="Blood donation process"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{paragraph}</p>
    </div>
  );
};
