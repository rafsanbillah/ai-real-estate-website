import { Router } from 'express';
import { createLead, exportLeads, getLeads, updateLead } from '../controllers/leadController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const router = Router();
router.post('/', createLead);
router.get('/', requireAuth, getLeads);
router.patch('/:id', requireAuth, updateLead);
router.get('/export', requireAuth, exportLeads);
export default router;
