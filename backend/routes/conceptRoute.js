const express = require('express')
const {getConcepts, updateConcept, deleteConcept, addConcept} = require("../controllers/conceptController");
const router = express.Router()

router.route('/').get(getConcepts).post(addConcept)
router.route('/:id').put(updateConcept).delete(deleteConcept)

module.exports = router
