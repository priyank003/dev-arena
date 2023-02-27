import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

const FrontEndAuth = () => {
	const navigate = useNavigate();
	const [verified, setVerify] = useState(false);

	useEffect(() => {
		getRole();
	});
	const getRole = async () => {
		let data = localStorage.getItem("access_token");
		// setData(result.role);
		console.log(data);
		if (data === undefined || data === null || data === "") {
			navigate("/auth/login");
		} else {
			setVerify(true);
		}
	};

	return verified && <Outlet />;
};

export default FrontEndAuth;
