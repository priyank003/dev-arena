import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./PaymentForm";
const PUBLIC_KEY = "pk_test_51LBHVOK1yTIV9UeQ6GNVOAIy1BQLMrvVI1S7rnUQxQ6iowEpX1cleEDje3xbQ8py0zqhn9sTCHYofAbIQQyGmVtB00SiLbUEmy";
const stripeTestPromise = loadStripe(PUBLIC_KEY);
const Payment = () => {
	return (
		<section style={{ height: "80vh" }}>
			<Elements stripe={stripeTestPromise}>
				<PaymentForm />
			</Elements>
		</section>
	);
};

export default Payment;
