const pool = require('../config/db.js')

async function createTask(req,res,next) {
    try{
        const userId = req.user.id
        const project_info = await pool.query(`SELECT id FROM projects`)
        const insertedTask = await pool.query(`INSERT INTO tasks (title,description,project_id,due_date,created_by,assigned_to) VALUES ($1,$2,$3,'2026-06-25',$4,$5) RETURNING *`, [req.body.title, req.body.description, project_info.rows[0].id,userId,userId])
        res.json(insertedTask.rows)
    }catch(err){
        next(err)
    }
}




module.exports = { createTask } 