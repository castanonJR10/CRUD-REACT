import express from "express";

const router = express.Router();

import {
    getUsuario,
    saveUsuario,
    updateUsuario,
    updateStatusUsuario,
    updatePasswordUsuario,
    deleteUsuario,
    listUsuario
} from '../Controllers/UsuarioController.js';

router.get('/listUsuario', listUsuario);
router.get('/getUsuario/:id', getUsuario);
router.post('/updateUsuario/:id', updateUsuario);
router.post('/updateStatusUsuario/:id/:activo', updateStatusUsuario);
router.post('/updatePasswordUsuario/:id/:password', updatePasswordUsuario);
router.post('/saveUsuario', saveUsuario);
router.delete('/deleteUsuario/:id', deleteUsuario);

export default router;