
import { pool } from '../db.js';
import bcrypt  from 'bcrypt';

const getUsuario = async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await pool.query('SELECT * FROM USUARIOS WHERE ID = $1', [id]);
        res.json((usuario.rows));
        //res.send("Dame un usuario");
    } catch (e) {
        res.send(e.message);
        console.log(e);
    }
};

const saveUsuario = async (req, res) => {
    try {
        const { nombre, password, email } = req.body;
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            const emailExist = await pool.query('SELECT EMAIL FROM USUARIOS WHERE EMAIL = $1', [email]);
            var result = "¡Usuario guardado correctamente!";
            var success = 'success'
            if(emailExist.rows.length > 0){
                result = "El correo ingresado ya existe, intente con otro";
                success = 'error';
            }
            await pool.query('INSERT INTO USUARIOS(NOMBRE, PASSWORD, EMAIL, ACTIVO) VALUES($1, $2, $3, True)', [nombre, hash, email]);
            res.send({Success: success, Result: result});
        });
    } catch (e) {
        res.send(e.message);
        console.log(e.message);
    }
};

const updateUsuario = async (req, res) => {
    try {
        const {  id, nombre, password, email, activo } = req.body;
        //console.log(req.body);
        //await pool.query(`UPDATE USUARIOS SET NOMBRE = '${nombre}', PASSWORD = ${password}, EMAIL = ${email} WHERE ID = ${id}`);
        await pool.query('UPDATE USUARIOS SET NOMBRE = $1, PASSWORD = $2, EMAIL = $3 WHERE ID = $4', [nombre, password, email, id]);
        res.send("¡Usuario actualizado correctamente!");
    } catch (e) {
        res.send(e.message);
        console.log(e);
    }
};

const updateStatusUsuario = async (req, res) => {
    try {
        const { id, activo } = req.params;
        //console.log(activo);
        //await pool.query(`UPDATE USUARIOS SET ACTIVO = ${activo} WHERE ID = ${id}`);
        await pool.query('UPDATE USUARIOS SET ACTIVO = $1 WHERE ID = $2', [activo, id]);
        res.send("¡Usuario actualizado correctamente!");
    } catch (e) {
        res.send(e.message);
        console.log(e);
    }
};

const updatePasswordUsuario = async (req, res) => {
    try {
        const { id, password } = req.params;
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            console.log(hash);
            //await pool.query(`UPDATE USUARIOS SET PASSWORD = ${password} WHERE ID = ${id}`);
            await pool.query('UPDATE USUARIOS SET PASSWORD = $1 WHERE ID = $2', [hash, id]);
            res.send("¡Usuario actualizado correctamente!");
        });
    } catch (e) {
        res.send(e.message);
        console.log(e);
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await pool.query(`DELETE FROM USUARIOS WHERE ID = ${id}`);
        res.send("¡Usuario eliminado correctamente!");
    } catch (e) {
        res.send(e.message);
        console.log(e);
    }
    
};

const listUsuario = async (req, res) => {
    try {
        const list = await pool.query('SELECT * FROM USUARIOS ORDER BY ID');
        //console.log(list.rows);
        res.json(list.rows);
        //res.send("Dame un usuario");
    } catch (e) {
        res.send(e.message);
        console.log(e);
    }
};

export {
    getUsuario,
    saveUsuario,
    updateUsuario,
    updateStatusUsuario,
    updatePasswordUsuario,
    deleteUsuario,
    listUsuario
};