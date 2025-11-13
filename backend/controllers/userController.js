
   const singup =(req, res)=>{
 
    res.send('singup')
}
const login =(req, res)=>{
 
    res.send('login')
} 
const getAllUsers =(req, res)=>{
 
    res.send('getAllUsers')
} 
const getUserProfile =(req, res)=>{
 
    res.send('getUserProfile')
} 
const updateUserProfile =(req, res)=>{
 
    res.send('updateUserProfile')
} 
const deleteUserProfile =(req, res)=>{
 
    res.send('deleteUserProfile')
} 
module.exports = {
    singup,
    login,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile


};