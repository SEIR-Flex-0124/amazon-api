// This connects the config file that links MongoDB and Mongoose to the rules for each of the dbs we create
require('../config/connection');

module.exports = {
    Books: require('./Books'),
    HouseholdProducts: require('./HouseholdProducts'),
    Music: require('./Music'),
    SportsEquipment: require('./SportsEquipment'),
    Specials: require('./Specials'),
    Users: require('./Users'),
    Comments: require('./Comments')
}