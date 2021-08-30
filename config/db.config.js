const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(process.env.URL, {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log(`MongoDB Connected`)
}

module.exports = connectDB