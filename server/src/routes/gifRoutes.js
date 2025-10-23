
const express = require("express");
const router = express.Router();


router.get("/" , (req , res) => {
    res.send("GIF Routes working ✅");
})

module.exports = router;