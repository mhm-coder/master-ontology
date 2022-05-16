const asyncHandler = require('express-async-handler')
const conceptModel = require('../models/conceptModel')
const {errorHandler} = require("../middlewares/errorMiddleware");

const getConcepts = asyncHandler(async (req, res) => {
    const concepts = await conceptModel.find()
    res.status(200).json(concepts)
})

const addConcept = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const concept = await conceptModel.create({
        text: req.body.text
    })
    res.status(200).json(concept)
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