import { Heart, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-primary py-6 flex flex-col px-6 text-white ">
      <div className="flex justify-between  p-4 bg-red-800 rounded-md items-center">
        <div className="flex flex-col">
          <span className="font-bold text-xl">Any Query?</span>
          <span className="text-lg  text-gray-100">
            Call our 24/7 Emergency Helpline
          </span>
        </div>
        <div className="bg-white text-lg font-bold text-primary p-1 rounded-xl tracking-wider">
          +977-9827114984
        </div>
      </div>
      <div className="grid mt-3 grid-cols-1 md:grid-cols-3 md:space-x-3 space-y-3">
        <div className="flex flex-col space-y-2">
          <p className="text-xl font-bold ">BloodBond</p>

          <p className="text-red-100 tracking-tighter text-lg">
            Connecting blood donors with those in need. Every drop counts in
            saving lives.
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-xl font-bold">Quick Links</p>

          <Link to={"/donor"}>
            <p className="text-red-100 tracking-tighter text-lg">Find Donors</p>
          </Link>
          <Link to={"/"}>
            <p className="text-red-100 tracking-tighter text-lg">
              Donation Campaigns
            </p>
          </Link>
          <Link to={"/"}>
            <p className="text-red-100 tracking-tighter text-lg">
              Emergency Request
            </p>
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-xl font-bold">Contact Us</p>

          <p className="text-red-100 tracking-tighter text-lg">
            BloodBond ,Pokhara
          </p>
          <p className="text-red-100 tracking-tighter text-lg">
            contact@bloodbond.com
          </p>
        </div>
      </div>
      <div className="mt-6 pt-8 border-t border-red-600">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <p className="text-red-100">
              © 2024 BloodBond. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-red-200 hover:text-white transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-red-200 hover:text-white transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-red-200 hover:text-white transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
