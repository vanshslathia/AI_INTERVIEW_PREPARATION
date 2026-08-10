require("dotenv").config()
const dns = require("dns");

// Use public DNS servers
dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);
const app = require("./src/app")
const connectToDB = require("./src/config/database")



connectToDB()


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})