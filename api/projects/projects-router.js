// Write your "projects" router here!
// Write your "projects" router here!
const router = require('express').Router()

const Projects = require('./projects-model')
const { validate, validateUserId } = require('./projects-middleware')

router.get('/', (req, res)=>{
    Projects.get()
      .then(users =>{
          res.status(200).json(users)
      })
      .catch(err =>{
          console.log('err', err)
          res.status(500).json({message: " Error retrieving projects "})
      })
  })
  
  router.get('/:id', (req,res)=>{
      Projects.get(req.params.id)
      .then(action => {
          if (action) {
              res.status(200).json(action);
          } else {
              res.status(404).json({ message: "The specified ID does not exist" });
          }
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({ message: "The information could not be retrieved" });
      });
  })
  
  router.post('/', (req, res) => {
      let { name , description, completed} =req.body
      if(!name || !description || !completed){
          res.status(400).json({message: "Please provide name, description, completed"})
          return;
      }
      Projects.insert(req.body)
          .then(posts => {
              res.status(201).json(posts);
          })
          .catch(error => {
              console.log(error);
              res.status(500).json({ message: "There was an error while saving the post to the database" });
          });
  });
  
  router.put('/:id',(req, res) => {
      Projects.update(req.params.id, req.body)
      .then(project => {
        if (!project) {
            res.status(404).json({ message: "The project with the specified ID does not exist" });
        } else {
            res.status(200).json(project);
        }  
      })
      .catch(error => {
        console.log("error",error);
        res.status(500).json({ message: "There was an error while saving the post to the database" });
});
});
  
  router.delete('/:id',(req, res) => {
      Projects.remove(req.params.id)
          .then(action => {
              if (action) {
                  res.status(200).json(action);
              } else {
                  res.status(404).json({ message: "The action with the specified ID does not exist"  });
              }
          })
          .catch(error => {
              console.log(error);
              res.status(500).json({ message: "The post could not be removed"  });
          });
  });
  
  router.get('/:id/actions', async (req,res)=>{
   try {
      const post = await Projects.get(req.params.id)
      if(!post){
          res.status(404).json({
              message:"ID does not exist"
          })
      } else {
      const projects = await Projects.getProjectActions(req.params.id)
      res.json(projects)
   }
  } catch (err) {
      res.status(500).json({message: " The information could not be received"})
  }
  })


module.exports = router