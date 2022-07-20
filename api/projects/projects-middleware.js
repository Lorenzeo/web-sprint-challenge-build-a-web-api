
// add middlewares here related to projects

const Projects = require("./projects-model")

function validate(req, res, next){
    const { name, description, completed}= req.body
    if(!name || !description || typeof completed != "boolean" ){ 
        res.status(400).json({
            message:"Please provide name and description and completed for the project"})
            return;
    }else{
        next()
    }
}

async function validateUserId(req,res,next){
try{
    const user = await Projects.get(req.params.id)
    if(!user){
        res.status(404).json({
            message: "no such user"
        })
    }else {
        req.user = user
        next()
    }
}catch (err){
    res.status(500).json({
        message: "problem finding user"
    })
}
    
}

module.exports ={
    validate,
    validateUserId,
}