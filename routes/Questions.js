import express from 'express'
import auth from '../middlewares/auth.js'
import {AskQuestion,getAllQuestions,deleteQuestion,voteQuestion} from "../controllers/questions.js"




const router=express.Router()

router.post('/Ask',auth,AskQuestion)
router.get('/get',getAllQuestions)
router.delete('/delete/:id',auth,deleteQuestion)
router.patch('/vote/:id',auth,voteQuestion)

export default router