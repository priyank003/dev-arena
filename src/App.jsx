// Library Imports

// import axios from "axios";
import { BackTop, Layout } from "antd";
// import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
// import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages, Components, Media & StyleSheets
import RouterPages from "./RouterPages";
import "./App.scss";
import { UpOutlined } from "@ant-design/icons";
import AppBar from "../src/components/AppBar/AppBar";
import MobileNav from "./components/MobileNav/MobileNav";
import { loadStripe } from "@stripe/stripe-js";
// Library Constants

const { Header, Footer, Content } = Layout;

const style = {
	height: 40,
	width: 40,
	lineHeight: "40px",
	borderRadius: 25,
	backgroundColor: "#222831",
	color: "#fff",
	textAlign: "center",
	fontSize: 14,
};
const stripePromise = loadStripe("pk_test_51LBHVOK1yTIV9UeQ6GNVOAIy1BQLMrvVI1S7rnUQxQ6iowEpX1cleEDje3xbQ8py0zqhn9sTCHYofAbIQQyGmVtB00SiLbUEmy");
function App() {
	const isMobile = useMediaQuery({
		query: "(max-width: 768px)",
	});

	return (
		<main className="App">
			<BrowserRouter>
				<Layout>
					<Header
						style={{
							padding: 0,
						}}
					>
						{isMobile ? <MobileNav /> : <AppBar />}
					</Header>

					<Content
						style={{
							padding: "0px",
						}}
					>
						<RouterPages />
					</Content>
				</Layout>
			</BrowserRouter>

			<BackTop>
				<div style={style}>
					<UpOutlined />
				</div>
			</BackTop>
		</main>
	);
}

export default App;
