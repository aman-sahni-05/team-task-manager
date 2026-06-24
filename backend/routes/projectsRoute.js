const { Router } = require("express")
const router = Router()
const verifyToken = require('../middleware/authMiddleware.js')
const {createProject,allProjects,updateProject,deleteProject} = require('../controllers/projectController.js')

router.post('/', verifyToken,createProject)
router.get('/', verifyToken, allProjects)
router.put('/:id', verifyToken,updateProject)
router.delete('/:id', verifyToken,deleteProject)

module.exports = router