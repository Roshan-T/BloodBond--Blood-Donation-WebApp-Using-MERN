/* eslint-disable react/prop-types */
import { Gift, Award, TrendingUp, Calendar } from "lucide-react";

const RewardsHeader = ({ rewardPoint, totalDonation }) => {
  let level;
  if (totalDonation > 5) {
    level = "Gold";
  } else {
    level = "Beginner";
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-2 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg">Available Points</span>
              <Gift className="w-6 h-6" />
            </div>
            <div className="text-4xl font-bold mb-3">{rewardPoint}</div>
            <div className="mb-4"></div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <Gift className="w-32 h-32 transform translate-x-8 translate-y-8" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg">Donor Level</span>
              <Award className="w-6 h-6" />
            </div>
            <div className="text-4xl font-bold mb-2">{level}</div>
            <div className="text-amber-100">Regular donor status</div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <Award className="w-24 h-24 transform translate-x-6 translate-y-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg p-2">Total Donation</span>
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-4xl font-bold mb-2">{totalDonation}</div>
            <div className="text-emerald-100">Donations made</div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <TrendingUp className="w-24 h-24 transform translate-x-6 translate-y-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsHeader;
