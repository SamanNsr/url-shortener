import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { nanoid } from 'nanoid';
import { BadRequestError } from '../errors/bad-request-error';
import { NotFoundError } from '../errors/not-found-error';

import { validateRequest } from '../middlewares/validate-request';
import { Url } from '../models/url';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id: slug } = req.params;

    const url = await Url.findOne({ slug });
    if (!url) {
      res.redirect(`?error=${slug} not found`);
    } else {
      res.redirect(url.url);
    }
  } catch (err) {
    res.redirect('?error=Link not found');
  }
});

export { router as redirectRouter };
