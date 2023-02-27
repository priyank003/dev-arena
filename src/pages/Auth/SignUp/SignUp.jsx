import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Typography, Form, Input, Button, Checkbox, Divider, Space, Alert } from "antd";
import { useFormik } from "formik";
import { userSignup } from "../../../Api/index.js";
import { FcGoogle } from "react-icons/fc";
import { AppleFilled } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import "./../Auth.scss";
const { Title, Text } = Typography;

export default function SignUp() {
	const navigate = useNavigate();
	const { values, handleChange, handleSubmit } = useFormik({
		initialValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
		onSubmit: async (values) => {
			try {
				const data = await userSignup(values);
				if (data.status === 201) {
					console.log("clicked");
					navigate("/auth/login");
				}
			} catch (e) {
				console.log(e);
				toast(e?.response?.data?.message);
			}
		},
	});
	console.log(values);

	return (
		<Col span={24} className="SignUp background_cover" style={{ padding: "20px 90px", overflow: "hidden" }}>
			<Toaster />
			<Col className="card" lg={{ span: 10 }} md={{ span: 16 }} sm={{ span: 20 }}>
				<Row
					style={{
						overflow: "hidden",
						padding: "20px 50px",
						width: "100%",
					}}
					gutter={[0, 20]}
					className="card_inner"
					justify="center"
					align="middle"
				>
					<Col span={24} style={{ textAlign: "center" }}>
						<Title level={2}>Sign up with Gitvisual</Title>
						<Text>
							Already have an Account ? &nbsp;
							<Link to="/auth/login">
								<Text style={{ color: "#1565D8" }}>Log in</Text>
							</Link>
						</Text>
					</Col>

					<Col span={24}>
						<Form
							className="form"
							size="large"
							name="signup_form"
							autoComplete="on"
							layout="vertical"
							scrollToFirstError
							requiredMark="optional"
							// onFinish={}
							initialValues={{
								remember: true,
							}}
						>
							<Col span={24}>
								<Form.Item
									// label="Name"
									name="name"
									rules={[
										{
											required: true,
											message: "Please enter a valid name!",
										},
										{ min: 3, message: "Too Short!" },
										{ max: 15, message: "Too Long!" },
										{
											pattern: /^[aA-zZ\s]+$/,
											message: "Only alphabets are allowed for this field",
										},
									]}
								>
									<Input placeholder="Name" name="name" onChange={handleChange} value={values.name} />
								</Form.Item>
							</Col>

							<Col span={24}>
								<Form.Item
									// label="Username"
									name="userName"
									rules={[
										{
											required: true,
											message: "Please enter a valid name!",
										},
										{ min: 3, message: "Too Short!" },
										{ max: 15, message: "Too Long!" },
										{
											required: true,
											pattern: /^[aA-zZ\s]+$/,
											message: "Only alphabets are allowed for this field",
										},
									]}
								>
									<Input placeholder="Username" name="username" onChange={handleChange} value={values.username} />
								</Form.Item>
							</Col>

							<Col span={24}>
								<Form.Item
									// label="Email"
									name="email"
									rules={[
										{
											required: true,
											message: "Please enter a valid email!",
										},
										{
											pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											message: "Please enter a valid email!",
										},
									]}
								>
									<Input placeholder="Email" name="email" onChange={handleChange} value={values.email} />
								</Form.Item>
							</Col>

							<Col span={24}>
								<Form.Item
									// label="Password"
									name="password"
									rules={[
										{
											required: true,
											message: "Please input your password!",
										},
									]}
								>
									<Input.Password placeholder="Password" name="password" onChange={handleChange} value={values.password} />
								</Form.Item>
							</Col>

							<div className="checkboxes">
								<Form.Item name="agree" valuePropName="checked">
									<Checkbox>
										I agree to{" "}
										<Link to="#" className="link">
											{" "}
											terms & conditions{" "}
										</Link>
									</Checkbox>
								</Form.Item>

								<Form.Item name="emailUpdates" valuePropName="checked">
									<Checkbox>Get updates and offers via email</Checkbox>
								</Form.Item>
							</div>

							<Col span={24} style={{ textAlign: "center" }}>
								<Form.Item>
									{/* <Col span={24} className="blur" /> */}
									<Button
										type="primary"
										className="primary_btn"
										onClick={handleSubmit}
										// block
									>
										Sign Up
									</Button>
								</Form.Item>
							</Col>
						</Form>
						{/* 
						<Col span={24} style={{ textAlign: "center" }}>
							<Space direction="vertical" style={{ width: "100%", textAlign: "-webkit-center" }}>
								{/* <Col span={24}>
									<Divider plain>Or Sign Up with</Divider>
								</Col> */}

						{/* <Col span={8}>
									<Row align="middle" justify="space-between" style={{ overflow: "hidden", width: "100%" }}>
										<Col>
											<FcGoogle
												style={{
													padding: "10px",
													borderRadius: "10px",
													background: "#FFFFFF",
													fontSize: "60px",
												}}
											/>
										</Col>
										<Col>
											<AppleFilled
												style={{
													padding: "10px",
													borderRadius: "10px",
													background: "#FFFFFF",
													fontSize: "40px",
												}}
											/>
										</Col>
									</Row>
								</Col> */}
						{/* </Space> */}
						{/* </Col> */}
					</Col>
				</Row>
			</Col>
		</Col>
	);
}
