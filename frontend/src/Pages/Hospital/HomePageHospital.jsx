import EmergencySection from "../../components/homepage/hospital/EmergencySection";
import CampaignSection from "../../components/homepage/hospital/CampaignSection";

const HomePageHospital = () => {
  return (
    <div className="w-full mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Hospital Dashboard
      </h1>

      <div className="space-y-8">
        <EmergencySection />
        <CampaignSection />
      </div>
    </div>
  );
};

export default HomePageHospital;
