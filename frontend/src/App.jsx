import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Landing from "./Pages/Landing";
import Login from "./forms/Login";
import SignUp from "./forms/SignUp/SignUp";
import { useAppContext } from "./context/AppContext";
import HomePage from "./Pages/Donor/HomePage";
import Donor from "./Pages/Donor";
import HistoryHospital from "./Pages/Hospital/HistoryHospital";
import Reward from "./Pages/Donor/Reward";
import ProfileDonor from "./Pages/Donor/ProfileDonor";
import EmergencyRequestDonor from "./Pages/Donor/EmergencyRequestDonor";
import CampaignDescription from "./Pages/Donor/CampaignDescription";
import EmergencyRequestDetail from "./Pages/Hospital/EmergencyRequestDetail";
import CampaignDetailHospital from "./Pages/Hospital/CampaignDetailHospital";
import RewardPageHospital from "./Pages/Hospital/reward/RewardPageHospital";
import RewardDetailScreen from "./Pages/Hospital/reward/RewardDetailScreen";
import HomePageHospital from "./Pages/Hospital/HomePageHospital";
import EmergencyForm from "./forms/EmergencyRequest/EmergencyForm";
import CampaignFrom from "./forms/Campaigns/CampaignFrom";
import { QueryClient, QueryClientProvider } from "react-query";
import HistoryDonor from "./Pages/Donor/HistoryDonor";
import Logout from "./components/Logout";
import ProfileHospital from "./Pages/Hospital/ProfileHospital";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
const App = () => {
  const { isLoggedIn, user } = useAppContext();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {!isLoggedIn ? (
            <Route
              path="/"
              element={
                <AppLayout>
                  <Landing />
                </AppLayout>
              }
            ></Route>
          ) : user?.role === "Donor" ? (
            <>
              <Route
                path="/"
                element={
                  <AppLayout>
                    <HomePage></HomePage>
                  </AppLayout>
                }
              ></Route>
              <Route
                path="request/:id"
                element={<EmergencyRequestDonor></EmergencyRequestDonor>}
              ></Route>
              <Route
                path="/campaign/:id"
                element={<CampaignDescription></CampaignDescription>}
              ></Route>
              <Route
                path="/history"
                element={
                  <AppLayout>
                    <HistoryDonor></HistoryDonor>
                  </AppLayout>
                }
              ></Route>
              <Route
                path="/reward"
                element={
                  <AppLayout>
                    <Reward></Reward>
                  </AppLayout>
                }
              ></Route>
              <Route
                path="/logout"
                element={
                  <AppLayout>
                    <Logout></Logout>
                  </AppLayout>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <AppLayout>
                    <ProfileDonor></ProfileDonor>
                  </AppLayout>
                }
              ></Route>
            </>
          ) : (
            <>
              <Route
                path="/logout"
                element={
                  <AppLayout>
                    <Logout></Logout>
                  </AppLayout>
                }
              ></Route>
              <Route
                path="/"
                element={
                  <AppLayout>
                    <HomePageHospital />
                  </AppLayout>
                }
              ></Route>
              <Route
                path="request/:id"
                element={<EmergencyRequestDetail></EmergencyRequestDetail>}
              ></Route>
              <Route
                path="/history"
                element={
                  <AppLayout>
                    <HistoryHospital></HistoryHospital>
                  </AppLayout>
                }
              ></Route>
              <Route
                path="/history/request/:id"
                element={
                  <AppLayout>
                    <EmergencyRequestDetail></EmergencyRequestDetail>
                  </AppLayout>
                }
              ></Route>
              <Route
                path="/history/campaign/:id"
                element={
                  <AppLayout>
                    <CampaignDetailHospital></CampaignDetailHospital>
                  </AppLayout>
                }
              ></Route>
              <Route
                path="/reward"
                element={
                  <AppLayout>
                    <RewardPageHospital></RewardPageHospital>
                  </AppLayout>
                }
              ></Route>
              <Route
                path="reward/:id"
                element={<RewardDetailScreen></RewardDetailScreen>}
              ></Route>
              <Route
                path="/create-request"
                element={
                  <AppLayout>
                    <EmergencyForm></EmergencyForm>
                  </AppLayout>
                }
              ></Route>
              <Route
                path="/create-campaign"
                element={
                  <AppLayout>
                    <CampaignFrom></CampaignFrom>
                  </AppLayout>
                }
              ></Route>

              <Route
                path="/profile"
                element={
                  <AppLayout>
                    <ProfileHospital></ProfileHospital>
                  </AppLayout>
                }
              ></Route>

              <Route path="/request" element={<Navigate to="/" replace />} />
              <Route path="/campaign" element={<Navigate to="/" replace />} />
              <Route
                path="/campaign/:id"
                element={<CampaignDetailHospital></CampaignDetailHospital>}
              ></Route>
            </>
          )}
          {isLoggedIn && (
            <>
              <Route
                path="/donor"
                element={
                  <AppLayout>
                    <Donor></Donor>
                  </AppLayout>
                }
              ></Route>
            </>
          )}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
