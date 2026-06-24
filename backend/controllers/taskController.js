const pool = require('../config/db.js')

async function createTask(req,res,next) {
    try{
        const userId = req.user.id
        const project_info = await pool.query(`SELECT id FROM projects`)
        const insertedTask = await pool.query(`INSERT INTO tasks (title,description,project_id,due_date,created_by,assigned_to) VALUES ($1,$2,$3,'2026-06-25',$4,$5) RETURNING *`, [req.body.title, req.body.description, project_info.rows[0].id,userId,userId])
        res.json(insertedTask.rows[0])
    }catch(err){
        next(err)
    }
}


async function allTasks(req,res,next) {
    try{
        const userId = req.user.id
        const tasksForUser = await pool.query(`SELECT * FROM tasks WHERE created_by=$1 OR assigned_to=$1`,[userId])
        res.json(tasksForUser.rows)
    }catch(err){
        next(err)
    }
}

async function updateTask(req,res,next) {
    try{
        const userId = req.user.id;
        const id = req.params.id
        const updatedTask = await pool.query(`UPDATE tasks SET title=$1,description=$2,due_date=$3 ,updated_at=now() WHERE id=$4 AND created_by=$5 RETURNING *`, [req.body.title,req.body.description,req.body.due_date,id,userId])
        if(updatedTask.rowCount === 0){
            return res.status(404).json({message: "task not found"})
        }
        res.json(updatedTask.rows[0])
    }catch(err){
        next(err)
    }
}

async function deleteTask(req,res,next) {
    try{
        const userId = req.user.id;
        const id = req.params.id
        const deletedTask = await pool.query(`DELETE FROM tasks WHERE id=$1 AND created_by=$2`,[id,userId])
        if(deletedTask.rowCount === 0){
            return res.status(404).json({message: "Task not found"})
        }
        res.json({message: "Task Deleted"})
    }catch(err){
        next(err)
    }
}



module.exports = { createTask, allTasks, updateTask, deleteTask } 