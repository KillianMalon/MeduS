import express from 'express'
import * as profile from '../controllers/profile.js'
import * as jwt from '../middlewares/jwt.js'

const router = express.Router()

router.get('/profile', jwt.verify, profile.getProfileById)
router.get('/profileByEmail', jwt.verify, profile.getProfileByEmail)
router.put('/profile', jwt.verify, profile.putProfileById)
router.delete('/profile/:userId', jwt.verify, profile.deleteProfileById)

export default router
