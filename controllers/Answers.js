import mongoose from 'mongoose'
import questions from '../models/questions.js'


export const postAnswer = async(req,res)=>{

      const {id:_id}=req.params;
     

      const {noOfAnswers,answerBody,userAnswered,userId}=req.body;
      
      
      if(!mongoose.Types.ObjectId.isValid(_id)){
        
        return res.status(404).send('question invalid...')
      }

      updateNoOfQuestions(_id,noOfAnswers)
      
      try{

          const updatedQuestions=await questions.findByIdAndUpdate( _id , { $addToSet:{'answer':[{answerBody,userAnswered,userId}]}})
          res.status(200).json(updatedQuestions)

      } catch(error){
        res.status(400).json(error)
      }
} 

const updateNoOfQuestions=async(_id,noOfAnswers)=>{

    try{
      //  console.log(noOfAnswers\\
        await questions.findByIdAndUpdate({_id},{$set:{'noOfAnswers':noOfAnswers}})
    }
    catch(error){
        console.log(error)
    }
}

export const deleteAnswer=async(req,res)=>{

  const {id:_id}=req.params;
  const {answerId,noOfAnswers}=req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)){
    
    return res.status(404).send('question invalid...')
  }

  if(!mongoose.Types.ObjectId.isValid(answerId)){
   
    return res.status(404).send('question invalid...')
  }

  updateNoOfQuestions(_id,noOfAnswers)
 
  try{
    await questions.updateOne(
      {_id},
      { $pull :{'answer':{_id:answerId}}}
    )

    res.status(200).json({message:"Deleted the answer successfully.."})

  }
  catch(error){
    res.status(405).json(error)
  }
}
