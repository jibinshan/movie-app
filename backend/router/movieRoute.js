const express = require("express")
const { getmovie, getpagination, getgenre, getsearch, getfilter, postmovie, putgenre, deletegenre, deletemovie } = require("../controller/movieController")
const router = express.Router()

router.get("/",getmovie)
router.get("/genre/:movieid",getgenre)
router.get("/pagination",getpagination)
router.get("/search",getsearch)
router.get("/filter",getfilter)
router.post("/",postmovie)
router.put("/genre/:movieid",putgenre)
router.delete("/genre/:movieid",deletegenre)
router.delete("/delete/:movieid",deletemovie)
module.exports = router