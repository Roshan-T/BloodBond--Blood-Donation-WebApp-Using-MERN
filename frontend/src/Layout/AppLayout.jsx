/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Header from "../components/Header";

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="z-30">
        <Header></Header>
      </div>
      <div className="flex-1 bg-gray-50">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default AppLayout;
