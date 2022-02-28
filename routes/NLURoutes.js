import express from "express";
import passport from 'passport';
import {
  get_nlu_structure,
  get_nlu_structure_name,
  add_nlu_structure,
  put_nlu_structure,
  delete_nlu_structure,
  auth_google,
  auth_google_callback
} from '../controllers/NLU_controller.js'

const router = express.Router();

const checkAuthenticated = async (req, res, next) => {
    
  if (req.isAuthenticated()) { return next() }

  res.redirect("/auth/google")
}

router.get('/nlu_structures', checkAuthenticated, get_nlu_structure);
router.get('/nlu_structure_name', checkAuthenticated, get_nlu_structure_name);
router.post('/nlu_structure', checkAuthenticated, add_nlu_structure);
router.put('/nlu_structure/:id', checkAuthenticated, put_nlu_structure);
router.delete('/nlu_structure/:id', checkAuthenticated, delete_nlu_structure);

router.get('/auth/google', auth_google);
router.get('/auth/google/callback', passport.authenticate("google"), auth_google_callback);

export default router