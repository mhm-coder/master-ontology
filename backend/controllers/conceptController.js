const asyncHandler = require('express-async-handler')

const getConcepts =asyncHandler( async (req, res) => res.status(200).json({message: 'Get Concepts'}))

const addConcept = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: 'Add Concept'})
})

const updateConcept = asyncHandler(async (req, res) => res.status(200).json({message: `Update Concept ${req.params.id}`}))
const deleteConcept = asyncHandler(async (req, res) => res.status(200).json({message: `Delete Concept ${req.params.id}`}))


module.exports = {getConcepts, addConcept, updateConcept, deleteConcept}