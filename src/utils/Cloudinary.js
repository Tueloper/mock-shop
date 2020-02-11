import sharp from 'sharp';
import cloudinary from 'cloudinary';
import path from 'path';
const Datauri = require('datauri')
const dUri = new Datauri();
require('./cloudinary_setup');

const cloudinaryImage = async (image) => {
	const buffer = await sharp(image.buffer)
		.resize({
			width: 300,
			height: 300
		})
		.png()
		.toBuffer();

	const dataUri = dUri.format(path.extname(image.originalname).toString(), buffer);
	const imageFile = dataUri.content;

	const imageUrl = await cloudinary.v2.uploader.upload(imageFile);
	// return console.log(imageUrl)

	return imageUrl;
}


async function destroyCloudinaryImage(id) {
	await cloudinary.v2.uploader.destroy(id, (err, result) => {
		if (err) console.log(err);
		else console.log(result);
	})
}

module.exports = {
	cloudinaryImage,
	destroyCloudinaryImage
}