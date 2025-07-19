import express from 'express';
import {getAllCandidates, getAllRecruiter} from "../controllers/admin.controller.js";

const router = express.Router();

//for Admin to see all the users


router.get("/candidates", getAllCandidates);
router.get("/recruiter", getAllRecruiter)


export default router;