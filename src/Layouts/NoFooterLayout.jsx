// import MainNavbar from "./../Components/Shared/NavBar/MainNavbar";

const NoFooterLayout = ({ children }) => {
  return (
    <>
      <header>{/* <MainNavbar /> */}</header>
      <main>{children}</main>
    </>
  );
};

export default NoFooterLayout;
