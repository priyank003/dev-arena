import { BackTop, Layout } from "antd";
// import MainNavbar from "../Components/Shared/NavBar/MainNavbar";
import FooterMain from "./../components/Footer/FooterMain";
const { Header, Footer, Content } = Layout;

const DefaultLayout = ({ children }) => {
  return (
    <>
      <header>{/* <MainNavbar /> */}</header>
      <main>{children}</main>

      <Footer>
        <FooterMain />
      </Footer>
    </>
  );
};

export default DefaultLayout;
