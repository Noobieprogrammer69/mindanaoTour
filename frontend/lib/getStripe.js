import { loadStripe } from "@stripe/stripe-js"

let stripePromise

const getStripe = () => {
    if(!stripePromise) {
        stripePromise = loadStripe("pk_test_51PgjUUJfUZpVZVsRhbNmJZukf0ZHFJIYi20P8QRE6MvhHiU7Wiyyx40K4MMh2aKJMV5KW34eNM119HHVUhXrswLt00EJx6Tid0")
    }

    return stripePromise
}

export default getStripe