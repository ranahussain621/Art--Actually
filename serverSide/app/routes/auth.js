const router = require("express").Router();
const passport = require("passport");
const User = require("../model/users");
const jwt = require("jsonwebtoken");
const userRole = require("../model/userRole");
const Role = require("../model/role");




router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get(
	"/google/callback",
	passport.authenticate("google", {
		session: false, // Disable session creation
	}),
	async (req, res) => {
		// Handle the successful login response here

		console.log(req.user, "user main");
		// const user = req.user
		const user = await User.find({ email: req.user._json.email })


		if (user.length < 1) {
			const newUser = new User({
				email: req.user._json.email,
				firstName: req.user._json.given_name,
				lastName: req.user._json.family_name,
			});
			const role = await Role.find({ title: 'user' });
			const forget_token = new userRole({
				user_id: newUser._id,
				role_id: role[0]._id
			});
			await forget_token.save().then(data => {}).catch(err => {
				res.status(500).send({
					'success': false,
					message: err.message || "Some error occurred while creating user"
				});
			});
			const token = authToken(newUser);
			const user_role = await userRole.find({ user_id: newUser._id });
			const findrole = await Role.findById(user_role[0].role_id);
		
			await newUser.save().then(data => {
				res.send({
					'success': true,
					message: "login successfully!",
					token: token,
					user: [{
						_id: data._id,
						email: data.email,
						firstName: data.firstName,
						lastName: data.lastName
					  }],
					Role: findrole
				});
			}).catch(err => {
				res.status(500).send({
					'success': false,
					message: err.message || "Some error occurred while creating user"
				});
			});
		} else {
			console.log('1122');

			const user_role = await userRole.find({ user_id: user[0]._id });
			const role = await Role.findById(user_role[0].role_id);


			const modifyUsre = [{
				_id: user[0]._id,
				email: user[0].email,
				firstName: user[0].firstName,
				lastName: user[0].lastName,
				status: user[0].status,
			}]
			const token = authToken(authToken(user[0]));
			res.status(200).json({
				success: true,
				message: "login successfully!",
				user: modifyUsre,
				token: token,
				'Role': role
			});
		}


	}
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.frontendUrl);
});


const authToken = (user) => {
	return jwt.sign({
		// email: user.email,
		id: user.email,
		// role: user.role
	},
		process.env.SECRET_KEY, {
		expiresIn: process.env.TOKEN_EXPIRY_TIME,
	}
	);
};

module.exports = router;
