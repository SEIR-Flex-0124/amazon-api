const mongoose = require('mongoose');
const user = require('./Users');

const booksSchema = new mongoose.Schema(
    {
        // Creates a title that is a string, it is required and I can't create two items that have the same title 
        title: {
            type: String,
            required: [true, "It must have a title!"],
            unique: true
        },
        // I am making sure author is a string and that if the user doesn't provide any author, the author will be "Anonymous" by default
        author: {
            type: String,
            default: "Anonymous"
        },
        // This is making sure that the price is required. I could add a min and/or a max if I think it's appropriate too.
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// mongoose.model(<mongodb collection name>, our schema) is the general default and it creates a collection inside of MongoDB that is named from the first argument, Books here. And it applies the schema above to that collection.
const Books = mongoose.model('book', booksSchema);

module.exports = Books;

// module.exports = [
//     {
//         title: "The outsiders",
//         author: "S.E. Hinton",
//         price: 5.99
//     }, {
//         title: "Odd Thomas",
//         author: "Dean Koontz",
//         price: 8.99
//     }, {
//         title: "The Four Agreements",
//         author: "Don Miguel Ruiz",
//         price: 4.99
//     }, {
//         title: "Wild",
//         author: "Cheryl Strayed",
//         price: 19.99
//     }
// ]