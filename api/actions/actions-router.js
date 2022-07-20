// Write your "actions" router here!
// Write your "actions" router here!
const router = require('express').Router()

const Actions = require('./actions-model')

// const {

// } = required('./actions-middleware')

router.get('/', (req, res)=>{
  Actions.get()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(err =>{
        console.log('err', err)
        res.status(500).json({message: " Error retrieving actions "})
    })
})

router.get('/:id', (req,res)=>{
    Actions.get(req.params.id)
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
    let { notes , description, project_id} =req.body
    if(!notes || !description || !project_id ){
        res.status(400).json({message: "Please provide notes, description and project ID"});
        return;
    }
    Actions.insert(req.body)
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the post to the database" });
        });
});

router.put('/:id', (req, res) => {
    if(!req.body.notes || !req.body.description || !req.body.completed || !req.body.project_id){
        res.status(400).json({message:"Please provide notes and description and project ID for the post"})
        return;
    }
         Actions.update(req.params.id, req.body)
        .then(action => {
            if (action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be modified" });
        });
});

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
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
module.exports = router