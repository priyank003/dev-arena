import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL, BASE_URL_Local } from "../../Api/BASE_URL";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" },
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee",
		},
	},
};

export default function PaymentForm() {
	const [success, setSuccess] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		});

		if (!error) {
			try {
				// const { id } = paymentMethod;
				// console.log(id);

				const response = await axios.post(
					`${BASE_URL}/subscriptions/pay`,
					{
						packageType: "starter",
						successUrl: "http://localhost:3001/success",
						cancelUrl: "http://localhost:3001/check",
					},
					{
						headers: {
							// Authorization: `Bearer ${id}`,
							Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
						},
					}
				);
				console.log(response);
				if (response.data.success) {
					console.log("Successful payment");
					setSuccess(true);
				}
			} catch (error) {
				console.log("Error", error);
			}
		} else {
			console.log(error.message);
		}
	};

	return (
		<>
			{!success ? (
				<form onSubmit={handleSubmit}>
					<fieldset
						style={{
							margin: "0 15px 20px",
							padding: 0,
							borderStyle: "none",

							willChange: "opacity, transform",
							boxShadow: "0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #829fff",
							borderRadius: "4px",
						}}
					>
						<div>
							<CardElement />
						</div>
					</fieldset>
					<button>Pay</button>
				</form>
			) : (
				<div>
					<h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
				</div>
			)}
		</>
	);
}
