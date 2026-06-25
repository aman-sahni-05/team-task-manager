const { Router } = require("express")
const router = Router()
const verifyToken = require('../middleware/authMiddleware.js')
const {createProject,allProjects,updateProject,deleteProject,addMembers,removeMembers} = require('../controllers/projectController.js')


// PROJECT ROUTES
router.post('/', verifyToken,createProject)
router.get('/', verifyToken, allProjects)
router.put('/:id', verifyToken,updateProject)
router.delete('/:id', verifyToken,deleteProject)

// PROJECT MEMBERS ROUTES
router.post('/:id/members', verifyToken, addMembers)
router.delete('/:id/members', verifyToken, removeMembers)

module.exports = router