
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import UserPayemtForm from "./PaymentForm"

const PUBLIC_KEY = "pk_live_51Nj5ZGLTHGubDotJoVjKzi8juPMp8bw36hydt5LI7IfR6CjT0PbDeGnpr9Zmi2XBMHt5HSfmiSaqQvW5YAsnVkUZ00UC4QX6Sx"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function Payment() {
	return (
		<Elements stripe={stripeTestPromise}>
			<UserPayemtForm />
		</Elements>
	)
}
