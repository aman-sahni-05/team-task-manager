const e = require('express')
const pool = require('../config/db.js')

async function createProject(req,res,next) {
    try{
        const userId = req.user.id
        const insertedProject = await pool.query(`INSERT INTO projects (name,description,due_date,created_by) VALUES ($1,$2,$3,$4) RETURNING *`,[req.body.name,req.body.description,req.body.due_date,userId])
        res.json(insertedProject.rows[0])
    }catch(err){
        next(err)
    }
}

async function allProjects(req,res,next) {
    try{
        const userId = req.user.id
        const projects = await pool.query(`SELECT * FROM projects WHERE created_by=$1`,[userId])
        res.json(projects.rows)
    }catch(err){
        next(err)
    }
}

async function updateProject(req,res,next) {
    try{
        const userId = req.user.id
        const updatedProject = await pool.query('UPDATE projects SET name=$1,description=$2,due_date=$3 WHERE id=$4 AND created_by=$5 RETURNING *',[req.body.name,req.body.description,req.body.due_date,req.params.id,userId])
        if(updatedProject.rowCount === 0){
            return res.status(404).json({message: "project not found"})
        }
        res.json(updatedProject.rows[0])
    }catch(err){
        next(err)
    }
}

async function deleteProject(req,res,next) {
    try{
        const userId = req.user.id
        const deletedProject = await pool.query(`DELETE FROM projects WHERE id=$1 AND created_by=$2`, [req.params.id,userId])
        if(deletedProject.rowCount === 0){
            return res.status(404).json({message: "Project not found"})
        }
        res.json({message: "Project Deleted"})
    }catch(err){
        next(err)
    }
}


module.exports = {createProject,allProjects,updateProject,deleteProject}