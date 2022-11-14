const express = require("express")
const cors = require ("cors")

const app = express()
const PORT = 8000

require("./config/mongoose.config")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const authorRoutes = require("./routes/author.route")
authorRoutes(app)

app.listen(PORT, () => console.log(`EXPRESS RUNNING ON PORT ${PORT}`))