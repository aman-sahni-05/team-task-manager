const {Router} = require('express')
const router = Router()
const {createTask} = require('../controllers/taskController.js')
const verifyToken = require('../middleware/authMiddleware.js')

router.post('/', verifyToken, createTask)
// router.get('/', allTasks)
// router.put('/:id', updateTask)
// router.delete('/:id', deleteTask)

module.exports = router;