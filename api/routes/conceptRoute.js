const express = require('express')
const {getConcepts, updateConcept, deleteConcept, addConcept} = require("../controllers/conceptController");
const {protect} = require("../middlewares/authMiddleware");
const router = express.Router()

router.route('/').get( getConcepts).post(addConcept)
router.route('/:id').put(protect, updateConcept).delete(protect,  deleteConcept)

module.exports = router
