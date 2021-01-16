const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    socketId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    // to do change to user
    user_id: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessagesSchema);
