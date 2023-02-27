import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const SubscriptionCheck = () => {
	const userData = useSelector((store) => store.subscription);
	const navigate = useNavigate();
	console.log(userData);
	useEffect(() => {
		if (userData.credits <= 0 || userData.credits === undefined) {
			console.log("cc");
			navigate("/pricing");
			console.log("cc");
		}
	}, []);

	return userData?.credits > 0 && <Outlet />;
};

export default SubscriptionCheck;
