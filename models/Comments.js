const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: [true, "A comment must have a rating"],
            min: 1,
            max: 5
        }, 
        text: {
            type: String,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book'
        }
    }, {
        timestamps: true
    }
)

const Comments = mongoose.model('comment', commentSchema);

module.exports = Comments