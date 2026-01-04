import Footer from "./Footer";
import Navbar from "./Navbar";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer/>
    </>
  );
};

export default PublicLayout;
