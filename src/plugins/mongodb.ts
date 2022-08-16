import mongoose from 'mongoose'

export async function connectMongoDB() {
	await mongoose.connect(process.env.APP_MONGODB!)
}
