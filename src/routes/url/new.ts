import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { nanoid } from 'nanoid';
import { BadRequestError } from '../../errors/bad-request-error';

import { validateRequest } from '../../middlewares/validate-request';
import { Url } from '../../models/url';

const router = express.Router();

router.post(
  '/url',
  [
    body('slug')
      .isString()
      .trim()
      .matches(/[\w\-]/i)
      .withMessage('invalid slug'),
    body('slug').isString().trim().isURL().withMessage('invalid url'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let { slug, url } = req.body;

    if (!slug) {
      slug = nanoid(6);
    }
    slug = slug.to;

    const existingSlug = await Url.findOne({ slug });
    if (existingSlug) {
      throw new BadRequestError('slug in use. 🔒');
    }

    const createdUrl = Url.build({ slug, url });
    await createdUrl.save();

    res.json(createdUrl);
  }
);

export { router as createUrlRouter };
