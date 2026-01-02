import Navbar from "./Navbar";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PublicLayout;
