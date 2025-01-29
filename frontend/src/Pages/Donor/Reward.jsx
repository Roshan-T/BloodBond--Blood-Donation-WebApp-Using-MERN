import { useQuery } from "react-query";
import AvailableRewardBox from "../../components/reward/AvailableRewardBox";
import RewardsHeader from "../../components/reward/RewardsHeader";
import UnusedRewardBox from "../../components/reward/UnusedRewardBox";
import UsedReward from "../../components/reward/UsedReward";
import * as apiClient from "../../api-client.js";
import LoaderSpinner from "../../components/LoaderSpinner.jsx";
import EmptyList from "../../components/EmptyList.jsx";

const Reward = () => {
  const { data: user } = useQuery(["user"], () => apiClient.getUser(), {
    retry: false,
  });
  const { data: rewards, isRewardsLoading } = useQuery(
    "rewards",
    apiClient.getRewards,
    {
      retry: false,
    }
  );

  const { data: redeemedRewards, isRedeemedRewardLoading } = useQuery(
    "redeemedReward",
    apiClient.getRedeemedRewards,
    {
      retry: false,
    }
  );
  console.log(redeemedRewards);
  return (
    <div className="p-2">
      <p className=" text-2xl text-black font-semibold pb-4">My Reward</p>
      <RewardsHeader
        totalDonation={user?.user?.totalDonation}
        rewardPoint={user?.user?.reward}
      ></RewardsHeader>
      <p className=" text-2xl text-black font-semibold pb-4">
        Available Rewards
      </p>
      {isRewardsLoading ? (
        <LoaderSpinner></LoaderSpinner>
      ) : rewards?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {rewards.rewards.map((reward) => (
            <AvailableRewardBox
              key={reward._id}
              reward={reward}
            ></AvailableRewardBox>
          ))}
        </div>
      ) : (
        <EmptyList message="No rewards available yet"></EmptyList>
      )}
      {isRedeemedRewardLoading ? (
        <LoaderSpinner></LoaderSpinner>
      ) : redeemedRewards?.length > 0 ? (
        <>
          <p className=" text-2xl text-black font-semibold pt-3 pb-4">
            Unused Rewards
          </p>
          {
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {redeemedRewards?.reward?.map((reward) => {
                if (!reward.isRedeemed) {
                  return (
                    <UnusedRewardBox
                      key={reward._id}
                      reward={reward}
                    ></UnusedRewardBox>
                  );
                }
              })}
            </div>
          }
          <p className=" text-2xl text-black font-semibold pt-3 pb-4">
            Used Rewards
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {redeemedRewards?.reward?.map((reward) => {
              if (reward.isRedeemed) {
                return (
                  <UsedReward key={reward._id} reward={reward}></UsedReward>
                );
              }
            })}
          </div>
        </>
      ) : (
        <EmptyList message="No redeemed any rewards"></EmptyList>
      )}
    </div>
  );
};

export default Reward;
