import mongoose from 'mongoose';

const demoUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const DemoUser = mongoose.model('DemoUser', demoUserSchema);

export default DemoUser;