const express = require('express')
const {getUsers,updateUser,getUser} = require('./user.controller')
const router = express.Router()


router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)



module.exports = router