const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");


const createRepository =async (req,res)=>{
 const {owner ,name ,issue, content , description,visibility } = req.body;
 try{
    if(!name){
        return res.status(400).json({error: "Name is required"})
    }
     if(!mongoose.Types.ObjectId.isValid(owner)){
        return res.status(400).json({error: "Invalid owner ID"})
     
     }

      const newRepository = new Repository({
        owner,
        name,
        issue,
        content,
        description,
        visibility})
        const result = await newRepository.save();
        res.status(201).json({
            message: "Repository created successfully",
            repositoryID  : result._id
        });
 }catch(err){
    console.log("error during creating repository", err.message);
    res.status(500).send("Server error")
 }   
    

}
const getAllRepositories = async (req, res) => {
   try{
      const repository = await Repository.find({}) .populate("owner") .populate("issues")
   res.json(repository);

   }catch(err){
    console.log("error during fetch all", err.message);
     res.status(500).send("Server error");
   }
};

const fetchRepositoryById = async (req, res) => {
  const {id} = req.params;
 try{
     let repository = await Repository.findById(id)
     .populate("owner")
    .populate("issues")
    if (!repository) return res.status(404).json({ message: "Repository not found" });

    res.json(repository);
      } catch(err){
      console.log("error during fetch repo by id", err.message);
      res.status(500).send("Server error  ");
    }
 }

const fetchRepositoryByName = async (req, res) => {
    const {name} = req.params;
    try{
        const repository = await Repository.findOne({name})
         .populate("owner")
        .populate("issues");
        if(!repository) return res.status(404).json({message: "Repository not found"})
       
        res.json(repository);
    }catch(err){
        console.log("error during fetch repo by name", err.message);
        res.status(500).send("Server error");       
    }
};

const fetchRepositoriesForCurrentUser = async(req, res) => {
    const {userID} = req.params;
    try{
        const repository =  await Repository.find({owner: userID});
        if(!repository || repository.length == 0 ){
            return res.status(404).json({error :"user Repositories not found! " })
        }
        res.json(repository);
    }catch(err){
        console.log("error during fetching repositories for current user", err.message);
        res.status(500).send("Server error");
    }
    

};

const updateRepositoryById =async (req, res) => {
   const {id} = req.params;
   const {content , description } = req.body;
    try{
        const repository = await  Repository.findById(id);
        if(!repository){
            return res.status(404).json({error: "Repository not found"})
        }
        repository.content.push(content);
        repository.description = description;
        const updatedRepository = await repository.save();
        res.json({
            message: "Repository updated successfully",
           repository: updatedRepository
        });
        


    }catch(err){
           console.error("Error during updating repository : ", err.message);
           res.status(500).send("Server error");
    }
    
};

const toggleVisibilityById = async (req, res) => {
const { id } = req.params;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    repository.visibility = !repository.visibility;

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository visibility toggled successfully!",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("Error during toggling visibility : ", err.message);
    res.status(500).send("Server error");
  }
};

const deleteRepositoryById = async(req, res) => {
      const { id } = req.params;
  try {
    const repository = await Repository.findByIdAndDelete(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    res.json({ message: "Repository deleted successfully!" });
  } catch (err) {
    console.error("Error during deleting repository : ", err.message);
    res.status(500).send("Server error");
  };
};

module.exports = {
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoriesForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById,
};