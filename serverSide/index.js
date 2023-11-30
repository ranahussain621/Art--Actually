'use strict'

const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const Stripe = require('stripe');
const cookieSession = require("cookie-session");
const passport = require('passport');
const passportStrategy = require("./app/passport");
const corsOptions = require('./app/utils/corsOptions')
const credentials = require('./app/middlewares/credentials')



require('dotenv').config()
const dbConfig = require('./app/DBconnection')
const PORT = process.env.PORT || 4000;
const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(credentials)

app.use(cors({credentials: true, origin: process.env.URL}));







app.use(
	cookieSession({
		name: "session",
		keys: ["borisArtGallery"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());



//dd connection 
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
    console.log("Databse Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});





// routers
const authRouter = require('./app/routes/authRoutes')
const accessRouter = require('./app/routes/accessRoutes')
const artRouter = require('./app/routes/artRoutes')
const cartRouter = require('./app/routes/cartRoutes')
const saleRouter = require('./app/routes/salesRoutes')
const soundRouter = require('./app/routes/soundRoutes')
const collectionRoutes = require('./app/routes/collectionRoutes')
const visibilityRoutes = require('./app/routes/visibilityRoutes')
const noteRoutes = require('./app/routes/thankyouRoutes')
const authenticate = require('./app/routes/auth')
const queryRoutes = require('./app/routes/queryRoutes')
const ChatRoutes = require('./app/routes/chatRoutes')
const paymentRoutes = require('./app/routes/paymentRoutes')
const stripePaymentRoutes = require('./app/routes/stripePaymentRoutes')
const blogRoutes = require('./app/routes/blogRoutes')
const favouriteRouts = require('./app/routes/favouriteRouts')
const eventRoutes = require('./app/routes/eventRoutes')
const useAccountDetail = require('./app/routes/userAccountDetailRoutes')
const exhibitionRoutes = require('./app/routes/exhibitionRoutes')

app.use('/auth', authRouter)
app.use('/access', accessRouter)
app.use('/art', artRouter)
app.use('/cart', cartRouter)
app.use('/sale', saleRouter)
app.use('/sound', soundRouter)
app.use('/collection',collectionRoutes)
app.use('/visibility',visibilityRoutes)
app.use('/note',noteRoutes)
app.use('/authenticate', authenticate)
app.use('/query', queryRoutes)
app.use('/chat', ChatRoutes)
app.use('/payment', paymentRoutes)
app.use('/api/stripe',stripePaymentRoutes)
app.use('/blog', blogRoutes)
app.use('/favourite', favouriteRouts)
app.use('/event', eventRoutes)
app.use('/user-account-detail', useAccountDetail)
app.use('/exhibition', exhibitionRoutes)

app.use(express.static('public'));


app.use('/files', express.static('files'));
app.use('/audios', express.static('audios'));
app.use('/images', express.static('images'));
app.use('/receipts', express.static('receipts'));

const stripe = new Stripe(process.env.STRIPE_KEY);

/////Stripe Payment Integration
app.post("/api/stripe/payment", async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			payment_method: id,
			confirm: true,
		
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			payment:payment.client_secret,
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false,
			error
		})
	}
})




app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
}));
app.use(bodyParser.json({ limit: "50mb" }));





app.listen(PORT, () => {
    console.log(`Server is listening on port:${PORT}`);
})