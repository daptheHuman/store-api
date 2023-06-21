const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json('You are not authenticated!');
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json('Token is not valid!');
		}

		req.user = decoded;
		next();
	});
};

const verifyAndAuth = (req, res, next) => {
	verify(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return res.status(403).json('Not allowed!');
		}
	});
};

const verifyAndAdmin = (req, res, next) => {
	verify(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			return res.status(403).json('Not allowed!');
		}
	});
};
module.exports = { verify, verifyAndAuth, verifyAndAdmin };
