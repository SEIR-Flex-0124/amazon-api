const express = require('express');
const router = express.Router();
// Array destructuring. That means if I go to models/index.js, which is the file I'm requiring, I expect that it's exporting an object. I only want the value of books from that object. It creates a variable books that's set to the value of the books key in the export for this file.
const { Books, Comments } = require('../models');
// const models = require('../models');
// const Books = models.Books;
const seededData = [
    {
        title: "The outsiders",
        author: "S.E. Hinton",
        price: 5.99
    }, {
        title: "Odd Thomas",
        author: "Dean Koontz",
        price: 8.99
    }, {
        title: "The Four Agreements",
        author: "Don Miguel Ruiz",
        price: 4.99
    }, {
        title: "Wild",
        author: "Cheryl Strayed",
        price: 19.99
    }
]

router.get('', async (req, res, next) => {
    try {
        let myBooks;
        console.log(req.query);
        if(req.query.search) {
            myBooks = await Books.find({author: req.query.search})
            console.log(myBooks);
        } else {
            myBooks = await Books.find({});
            console.log(myBooks);
        }
        res.json(myBooks);
    } catch(err) {
        // If there's an error, it'll go to the catch block
        console.log(err);
        next();
    }
})

router.get('/seed', async (req, res, next) => {
    try {
        await Books.deleteMany({});
        await Books.insertMany(seededData);
        res.redirect('/books');
    } catch(err) {
        console.log(err);
        next();
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        // Grab the book that has the corresponding ID in MongoDB
        const myBook = await Books.findById(req.params.id);
        // console.log(myBook);
        // const bookComments = await Comments.find({book: myBook._id})
        // let bookCommentUsernames = [];
        // console.log(bookComments);
        // let usersBook = false;
        // if(req.session.currentUser) {
        //     if(req.session.currentUser.id == myBook.user.toString()) {
        //         usersBook = true
        //     }
        // }
        // console.log(myBook);
        res.json(myBook)
    } catch(err) {
        console.log(err);
        next();
    }
})

router.post('/:id/comments', async (req, res, next) => {
    try {
        let newComment = req.body;
        newComment.user = req.session.currentUser.id;
        newComment.book = req.params.id;
        await Comments.create(newComment);
        res.redirect(`/books/${req.params.id}`);
    } catch(err) {
        console.log(err);
        next();
    }
})

router.post('', async (req, res, next) => {
    try {
        const newBook = req.body
        // newBook.user = req.session.currentUser.id;
        await Books.create(req.body);
        console.log(newBook);
        res.redirect('/books')
    } catch(err) {
        console.log(err);
        next();
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        // console.log("This got hit")
        // Go look for a book in the database whose _id matches the URL params that I'm being passed and update to the req.body coming in from a request
        const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body);
        res.json(updatedBook);
    } catch(err) {
        console.log(err);
        next();
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Books.findByIdAndDelete(req.params.id);
        res.redirect('/books');
    } catch(err) {
        console.log(err);
        next();
    }
})


module.exports = router;