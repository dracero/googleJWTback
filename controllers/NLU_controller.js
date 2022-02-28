import BaseDeDatos from "../dao/BaseDeDatos.js";
import passport from 'passport';

import session from 'express-session';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';



let baseDeDatos = new BaseDeDatos();



const get_nlu_structure = async (req, res, next) => {
    const nlu_structure = await baseDeDatos.get_nlu_structure();

    try {
        res.send(nlu_structure);
    } catch (error) {
        res.status(500).send(error);
    }
}

// hay que agregar esta función para que busque por nombre
const get_nlu_structure_name = async (req, res, next) => {

    try {
        const nlu_structure = await baseDeDatos.get_nlu_structure_name(req.query.name);
        res.send(nlu_structure);
    } catch (error) {
        res.status(500).send(error);
    }
}

const add_nlu_structure = async (req, res, next) => {

    try {
        const nlu_structure = await baseDeDatos.add_nlu_structure(req.query.name, req.query.text)
        res.send(nlu_structure);
    } catch (error) {
        res.status(500).send(error);
    }
}

const put_nlu_structure = async (req, res, next) => {

    try {
        const nlu_structure = await baseDeDatos.put_nlu_structure(req.params.id, req.query.name, req.query.text);
        res.send(nlu_structure);
    } catch (error) {
        res.status(500).send(error);
    }
}

const delete_nlu_structure = async (req, res, next) => {

    try {
        const nlu_structure = await baseDeDatos.delete_nlu_structure(req.params.id);

        if (!nlu_structure) {
            res.status(404).send("No item found");
        }
        res.status(200).send(nlu_structure);
    } catch (error) {
        res.status(500).send(error);
    }
}

const auth_google = async (req, res, next) => {

    const handler = passport.authenticate('google', { scope: [ 'email', 'profile' ] });
    handler(req, res, next);
}

const auth_google_callback = async (req, res, next) => {
    if (req.user) { 
        const token = jwt.sign({id: req.user.email}, 'top_secret', {
            expiresIn: 60 * 60 * 24 // equivalente a 24 horas
        })
        res.cookie('token', token)
    }

    res.redirect('http://localhost:3000/');
}

export {
    get_nlu_structure,
    get_nlu_structure_name,
    add_nlu_structure,
    put_nlu_structure,
    delete_nlu_structure,
    auth_google,
    auth_google_callback
}
