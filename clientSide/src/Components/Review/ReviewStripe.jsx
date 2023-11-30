
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import Review from "./Review"

const PUBLIC_KEY = "pk_test_51NgSA1CYVog714gFkpgjByCbRt47Rhy1LGturmK6VscQShq1niFPcIwsGSwgti3Dle9WUnjXmhk2lgZqll7qZVtM00G5oYtOLs"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function ReviewStripe() {
	return (
		<Elements stripe={stripeTestPromise}>
			<Review />
		</Elements>
	)
}
