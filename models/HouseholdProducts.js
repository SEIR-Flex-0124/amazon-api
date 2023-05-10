const mongoose = require('mongoose');

const householdProductsSchema = new mongoose.Schema(
    {
        // Creates a title that is a string, it is required and I can't create two items that have the same title 
        title: {
            type: String,
            required: [true, "It must have a title!"],
            unique: true
        },
        // I am making sure author is a string and that if the user doesn't provide any author, the author will be "Anonymous" by default
        description: {
            type: String,
            default: "No description provided"
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
const HouseholdProducts = mongoose.model('householdProduct', householdProductsSchema);

module.exports = HouseholdProducts;
// module.exports = [
//     {
//         name: "Paper towels",
//         brand: "Bounty",
//         price: 3.99,
//         description: "They're paper towels. How do you not know what those are?"
//     }, {
//         name: "Sponges",
//         brand: "square pants",
//         price: 5.99,
//         description: "Set of 12 sponges"
//     }, {
//         name: "Squatty potty",
//         brand: "Squatty",
//         price: 39.99,
//         description: "How long do you really want to keep changing diapers for?"
//     }
// ]