const asyncHandler = require('express-async-handler')
const {errorHandler} = require("../middlewares/errorMiddleware");
const {conceptModel} = require("../models");

// @desc    Get concepts
// @route   GET /api/concepts
// @access  Private
const getConcepts = asyncHandler(async (req, res) => {
    const concepts = await conceptModel.find()
    res.status(200).json(concepts)
})

// @desc    Set concept
// @route   POST /api/concepts
// @access  Private
const addConcept = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a concept name')
    }
    let conceptNumber
    conceptModel.countDocuments(async (err, count) => {
        const concept = await conceptModel.create({
            name: req.body.name,
            description: req.body.description,
            conceptNumber: count + 1
        })
        res.status(200).json(concept)
    })

})

const updateConcept = asyncHandler(async (req, res) => {
    const concept = await conceptModel.findById(req.params.id)

    if(!concept){
        res.status(400)
        throw new Error('Concept not found')
    }

    const updatedGoal = await conceptModel.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})

const deleteConcept = asyncHandler(async (req, res) => {
    const concept = await conceptModel.findById(req.params.id)

    if(!concept){
        res.status(400)
        throw new Error('Concept not found')
    }

    concept.remove()

    conceptModel.findByIdAndDelete(req.params.id, {}, )
    res.status(200).json({id: req.params.id})
})

module.exports = {getConcepts, addConcept, updateConcept, deleteConcept}