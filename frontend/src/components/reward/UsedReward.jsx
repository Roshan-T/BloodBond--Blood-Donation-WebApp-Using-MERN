/* eslint-disable react/prop-types */
const UsedReward = ({ reward }) => {
  return (
    <div className="">
      <div className="flex bg-green-100/20 relative border gap-4 rounded-2xl p-2 border-green-200 flex-col">
        <div className="flex justify-between">
          <p className="flex flex-col">
            <span className="text-xl tracking-tight font-medium text-gray-700">
              {reward.name}{" "}
            </span>
            <span className="text-sm text-gray-600">
              {reward.hospitalId.name}
            </span>
          </p>
          <p className="bg-green-600 text-white absolute right-0 top-0 p-2 rounded-tr-2xl rounded-bl-2xl">
            Used
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

export default UsedReward;
