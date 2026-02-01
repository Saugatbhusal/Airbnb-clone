const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Listing = require("../models/listing")
const initData = require("./data")

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'
async function main() {
    await mongoose.connect(MONGO_URL)
}

main().then(() => {
    console.log("connected to DB")
}).catch((err) => {
    console.log(err)
})
async function initDb() {
    await Listing.deleteMany({})
    initData.data = initData.data.map((obj) => ({...obj, owner: '6969a0903a00c1720cc1fe28', }))
    await Listing.insertMany(initData.data)
    console.log("data was initilized")


}
initDb()