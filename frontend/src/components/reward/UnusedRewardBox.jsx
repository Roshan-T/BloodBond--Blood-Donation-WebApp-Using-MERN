/* eslint-disable react/prop-types */
const UnusedRewardBox = ({ reward }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      <div className="flex relative bg-orange-100/20 border gap-4 rounded-2xl p-2 border-orange-200 flex-col">
        <div className="flex justify-between">
          <p className="flex flex-col">
            <span className="text-xl tracking-tight font-medium text-gray-700">
              {reward.name}
            </span>
            <span className="text-sm text-gray-600">
              {reward.hospitalId.name}
            </span>
          </p>
          <p className="bg-orange-600 text-white absolute right-0 top-0 p-2 rounded-tr-2xl rounded-bl-2xl">
            Redeemed
          </p>
        </div>
        <p className="text-gray-600 text-normal">{reward.description}</p>
        <p className="font-semibold text-lg text-primary">
          {reward.points_required} Points
        </p>
      </div>
    </div>
  );
};

export default UnusedRewardBox;
