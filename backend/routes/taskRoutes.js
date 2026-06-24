const {Router} = require('express')
const router = Router()
const {createTask,allTasks,updateTask,deleteTask} = require('../controllers/taskController.js')
const verifyToken = require('../middleware/authMiddleware.js')

router.post('/', verifyToken, createTask)
router.get('/', verifyToken, allTasks)
router.put('/:id', verifyToken, updateTask)
router.delete('/:id', verifyToken, deleteTask)

module.exports = router;