const express = require('express');
const {  AddUser,  getallUser, getUserByid, UpdateUser, deleteUser } = require('../controllers/UserController');

const router = express.Router();

router.post('/addUser', AddUser);
router.get('/getallUser', getallUser);
router.get('/uniqueUser/:id', getUserByid);
router.put('/users/:id', UpdateUser );
router.delete('/deleteUser/:id', deleteUser);
module.exports = router;