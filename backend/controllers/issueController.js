const createIssue = (req,res)=>{
    res.send("createIssue")
}

const updateIssueById = (req, res) => {
    res.send("updateIssueById");
};

const deleteIssueById = (req, res) => {
    res.send("deleteIssueById");
};

const getAllIssues = (req, res) => {
    res.send("getAllIssues");
};

const getIssueById = (req, res) => {
    res.send("getIssueById");
};

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById,
};