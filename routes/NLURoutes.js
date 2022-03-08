import express from "express";
import {
  get_nlu_structure,
  get_nlu_structure_name,
  add_nlu_structure,
  put_nlu_structure,
  delete_nlu_structure,
  logout
} from '../controllers/NLU_controller.js'

const router = express.Router();

const checkAuthenticated = (req, res, next) => {

  if (res.locals.authenticated) {
    return next()
  }

  res.redirect("/auth/google")
}

// https://stackoverflow.com/questions/59534258/how-to-form-authentication-header-for-axios-request-to-node-js-app-using-passpor

router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


router.get('/logout', logout);
router.get('/nlu_structures', checkAuthenticated, get_nlu_structure);
router.get('/nlu_structure_name', checkAuthenticated, get_nlu_structure_name);
router.post('/nlu_structure', checkAuthenticated, add_nlu_structure);
router.put('/nlu_structure/:id', checkAuthenticated, put_nlu_structure);
router.delete('/nlu_structure/:id', checkAuthenticated, delete_nlu_structure);

export default router
