import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import errorHandler from '../helpers/error_handler.js'
import authRoutes from '../routes/auth.js'
import postRoutes from '../routes/post.js'
import profileRoutes from '../routes/profile.js'




export async function configure (app) {
    // Configuration CORS pour autoriser les requêtes du frontend
    app.use(cors({
        origin: 'http://localhost:3000', // URL de ton frontend React
        credentials: true, // Si tu gères des cookies ou des sessions
    }));
    app.use(express.static('public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // app.use('/', authRoutes)
    app.use('/auth', authRoutes)
    app.use('/post', postRoutes)
    app.use ('/profile', profileRoutes)
    app.use(errorHandler)
    console.log('Express Initialized.')
}