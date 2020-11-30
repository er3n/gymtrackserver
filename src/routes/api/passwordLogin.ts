import express, { Router } from 'express';
import User from '../../models/user.model';
import PasswordLogin from '../../models/passwordLogin.model.';
import { QueryPopulateOptions } from 'mongoose';

const router: Router = express.Router();

type NewUserType = {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
};

router.post('/new', async (req, res) => {
  const body = req.body as NewUserType;

  const user = await User.create({
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
  });

  PasswordLogin.create({
    user: user,
    password: body.password,
  });

  res.sendStatus(201);
});

router.get('/:email', async (req, res) => {
  const body = req.body as NewUserType;

  const result = await PasswordLogin.findOne({})
    .populate({
      path: 'user',
      match: { email: { $eq: body.email } },
    } as QueryPopulateOptions)
    .exec();

  console.log('----------');
  console.log(result?.password);

  res.sendStatus(200);
});

export default router;
