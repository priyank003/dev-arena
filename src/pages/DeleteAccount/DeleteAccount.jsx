import { Button, Col, Image, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../../Api";
import { getUserData } from "../../redux/Slices/userSlice";
import bigfoot from "./bigfoot.svg";

const { Text, Title } = Typography;
export default function DeleteAccount() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userData = useSelector((store) => store.user);
	const handleClick = async () => {
		try {
			const data = await deleteUser(userData.id);
			if (data.status === 204) {
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				localStorage.removeItem("persist:root");
				navigate("/auth/login");
				dispatch(getUserData(""));
			}

			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Col
			style={{
				padding: "50px",
				//  background: "#F8F8F9"
			}}
		>
			<Col xl={{ span: 8 }} lg={{ span: 10 }} md={{ span: 13 }} sm={{ span: 18 }} xs={{ span: 24 }} style={{ padding: "30px", margin: "auto", background: "white" }}>
				<Space direction="vertical" size="middle" align="center" style={{ width: "100%" }}>
					<Image src={bigfoot} preview={false} />

					<Title strong level={2}>
						All good things must come to an end :(
					</Title>

					<Text>
						Sorry to see you go, if it was a problem with the platform, please send us an email and give us feedback as to how we can improve and earn you back as a customer, we take customer satisfaction seriously. Anyways, account deletion is
						FINAL!!! so don’t delete unless you want all your data to disappear. Ciao!
					</Text>

					<Space align="start" style={{ width: "100%" }}>
						<Link to="/profile">
							<Button
								style={{
									background: "#01D6FF",
									borderRadius: "5px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								Nevermind
							</Button>
						</Link>

						<Link to="/">
							<Button
								onClick={() => {
									handleClick();
								}}
								style={{
									borderRadius: "5px",
									background: "#FFFFFF",
									border: "2px solid #E2E2E2",

									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								Delete Account
							</Button>
						</Link>
					</Space>
				</Space>
			</Col>
		</Col>
	);
}
