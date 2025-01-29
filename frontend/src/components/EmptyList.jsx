const EmptyList = ({ message = "No items found." }) => {
  return (
    <div className="flex justify-center items-center h-40 text-gray-500 text-lg">
      {message}
    </div>
  );
};

export default EmptyList;
