const e = require('express')
const pool = require('../config/db.js')

// PROJECT CREATION, DELETION, UPDATION AND INSERTION
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




// PROJECT MEMBERS INSERTION AND DELETION

async function addMembers(req,res,next) {
    try{
        const loggedInUser = req.user.id
        const projectId = req.params.id
        const userId = req.body.user_id

        if(!userId){
            return res.status(400).json({message: "User id is required"})
        }

        const projectResult = await pool.query(`SELECT created_by FROM projects WHERE id=$1`,[projectId])
        if(projectResult.rows.length === 0){
            return res.status(404).json({message: "Project not found"})
        }
        if(String(projectResult.rows[0].created_by) !== String(loggedInUser)){
            return res.status(403).json({message: "Only Project creator can add members"})
        }
        const insertedMember = await pool.query(`INSERT INTO project_members (project_id,user_id) VALUES ($1,$2) RETURNING *`, [projectId,userId])
        res.status(201).json(insertedMember.rows[0])

    }catch(err){
        next(err)
    }
}

async function removeMembers(req,res,next) {
    try{
        const loggedInUser = req.user.id
        const userId = req.body.user_id
        const projectId = req.params.id

        const projectResult = await pool.query(`SELECT created_by FROM projects WHERE id=$1`,[projectId])
        if(projectResult.rows.length === 0){
            return res.status(404).json({message: "Project not found"})
        }
        if(String(projectResult.rows[0].created_by) !== String(loggedInUser)){
            return res.status(403).json({message: "Only project creator can add members"})
        }
        const removedMembers = await pool.query(`DELETE FROM project_members WHERE user_id=$1 AND project_id=$2 RETURNING *`,[userId,projectId])
        if(removedMembers.rowCount === 0){
            return res.status(404).json({message: "Member not found in this project"})
        }
        res.json({message: `Project member ${removedMembers.rows[0].user_id} is removed`})
    }catch(err){
        next(err)
    }
}



module.exports = {createProject,allProjects,updateProject,deleteProject,addMembers,removeMembers}