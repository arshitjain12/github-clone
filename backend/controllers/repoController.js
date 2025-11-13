const mongoose = require("mongoose"); 
const createRepository =(req,res)=>{
    res.send('createRepository')

}
const getAllRepositories = (req, res) => {
    res.send('getAllRepositories');
};

const fetchRepositoryById = (req, res) => {
    res.send('fetchRepositoryById');
};

const fetchRepositoryByName = (req, res) => {
    res.send('fetchRepositoryByName');
};

const fetchRepositoriesForCurrentUser = (req, res) => {
    res.send('fetchRepositoriesForCurrentUser');
};

const updateRepositoryById = (req, res) => {
    res.send('updateRepositoryById');
};

const toggleVisibilityById = (req, res) => {
    res.send('toggleVisibilityById');
};

const deleteRepositoryById = (req, res) => {
    res.send('deleteRepositoryById');
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