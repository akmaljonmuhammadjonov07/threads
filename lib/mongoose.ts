import mongoose from 'mongoose';

let isConnected = false; // track the connection status

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);
	if (!process.env.MONGODB_URI) return console.log('Missing MongoDB URL');

	if (isConnected) {
		console.log('MongoDB connection already established');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI);

		isConnected = true; // Set the connection status to true
		console.log('MongoDB connected');
	} catch (error) {
		console.log(error);
	}
};
