const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.status(200).json({message: 'Get Concepts'}))
router.post('/', (req, res) => res.status(200).json({message: 'Create Concept'}))
router.put('/:id', (req, res) => res.status(200).json({message: `Update Concept ${req.params.id}`}))
router.delete('/:id', (req, res) => res.status(200).json({message: `Delete Concept ${req.params.id}`}))


module.exports = router