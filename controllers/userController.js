const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		const { password, ...others } = user._doc;
		return res.status(200).json(others);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const getAllUsers = async (req, res) => {
	try {
		const user = await User.find();

		// remove password
		const others = user.map((u) => {
			const { password, ...others } = u._doc;
			return others;
		});

		return res.status(200).json(others);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const updateUser = async (req, res) => {
	if (req.body.password)
		req.body.password = bcrypt.hashSync(req.body.password, 11);

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true },
		);

		return res.status(200).json(updatedUser);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);

		return res.status(200).json('User deleted successfully!');
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

module.exports = { getUser, getAllUsers, updateUser, deleteUser };
