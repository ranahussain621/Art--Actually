
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import StripePayment from './StripePayment'

const PUBLIC_KEY = "pk_test_51NKfvyAhMtgJhHSOaBBSdaZIL8Bq4apuyKEfKQL6ikq3E6FhEDvIfsXVYoqSHaZKE0bEwa9kmvqQ6F3qmmVffmG800LKWwGqOS"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({onButtonClick}) {
	return (
		<Elements stripe={stripeTestPromise}>
			<StripePayment onButtonClick={onButtonClick} />
		</Elements>
	)
}
