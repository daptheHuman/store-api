const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const register = async (req, res) => {
	password = bcrypt.hashSync(req.body.password, 11);

	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: password,
	});

	const checkUser = await User.findOne({
		username: req.body.username,
	});

	try {
		if (checkUser) {
			return res.status(400).json('Username already exists');
		}

		const savedUser = await newUser.save();
		res.status(200).json(savedUser);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const login = async (req, res) => {
	try {
		const user = await User.findOne({
			username: req.body.username,
		});

		if (!user) {
			return res.status(400).json('User not found');
		}

		const validPass = bcrypt.compareSync(req.body.password, user.password);

		if (!validPass) {
			return res.status(400).json('Username or password is wrong');
		}

		const { password, ...others } = user._doc;
		const token = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1d' },
		);

		return res.status(200).json({ ...others, token });
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports = { register, login };
