// import MainNavbar from "./../Components/Shared/NavBar/MainNavbar";

const AuthLayout = ({ children }) => {
  return (
    <>
      <header>{/* <MainNavbar /> */}</header>
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
