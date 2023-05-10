require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2000;
const booksController = require('./controllers/books')
const householdProductsController = require('./controllers/householdProducts')
const musicController = require('./controllers/music')
const sportsEquipmentController = require('./controllers/sportsEquipment')
const userController = require('./controllers/users');
// cors is a way to ensure that we tell other applications who is allowed to interact with my API. We can configure this to allow our localhost:3000 (React's default url) in dev mode and then update that when we host React
const cors = require('cors');

// By using cors(), we're saying that any request coming in should be fine. It can be from any URL.
app.use(cors());
// This is array destructuring in Javascript. It's actually creating four variables (books, householdProducts etc) and it's setting them equal to the value of the key in the exported object from the file they're pointing at.
// const { books, householdProducts, music, sportsEquipment } = require('./models');
// console.log(sportsEquipment);
const { Specials } = require('./models')
// I need to parse incoming requests (which tend to be strings) and make it so those requests are in JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.json(Specials)
})

app.use('', userController);
app.use('/books', booksController);
app.use('', householdProductsController);
app.use('', musicController);
app.use('', sportsEquipmentController);

app.get('/*', (req, res) => {
    res.json({comment: "This is a bad URL"});
})

app.listen(PORT, () => {
    console.log(`$ 💲 ＄ Server is listening to PORT ${PORT} 🤑 💵 💰`)
})