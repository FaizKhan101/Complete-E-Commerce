const expresSession = require("express-session")
const mongoDbStore = require("connect-mongodb-session")

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expresSession)

    const store = new MongoDBStore({
        uri: "mongodb://localhost:27017",
        databaseName: "online-shop",
        collection: "sessions",

    })

    return store
}

function createSessionConfig() {
    return {
        secret: "super-secret",
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            magAge: 1000 * 60 * 60 * 24 * 2
        }
    }
}

module.exports = createSessionConfig