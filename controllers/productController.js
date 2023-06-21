const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
	try {
		if (!req.query.category && !req.query.limit) {
			const products = await Product.find().sort({ createdAt: -1 });
			return res.status(200).json(products);
		}

		const category = req.query.category.split(',');
		const limit = req.query.limit;

		if (category && limit) {
			const products = await Product.find({
				categories: { $in: category },
			})
				.sort({ createdAt: -1 })
				.limit(parseInt(limit));
			return res.status(200).json(products);
		}

		if (category) {
			const products = await Product.find({
				categories: { $in: category },
			}).sort({ createdAt: -1 });

			return res.status(200).json(products);
		}

		if (limit) {
			const products = await Product.find()
				.sort({ createdAt: -1 })
				.limit(parseInt(limit));

			return res.status(200).json(products);
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.prodId);

		return res.status(200).json(product);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const createProduct = async (req, res) => {
	const newProduct = new Product(req.body);
	try {
		newProduct.save();
		return res.status(200).json(newProduct);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const updateProduct = async (req, res) => {
	try {
		const updatedProd = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true },
		);

		return res.status(200).json(updatedProd);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const deleteProduct = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);

		return res.status(200).json('Product deleted successfully!');
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

module.exports = {getProduct, getAllProducts, createProduct, updateProduct, deleteProduct};