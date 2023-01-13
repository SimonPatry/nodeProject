import UserModel from "../Models/user.model.js"
import { userExists } from "../middlewares/authentification.js";

export function SignInPage(req, res) {
  res.render("signIn");
}

export const SignIn = async (req, res) => {   
  const { firstName, lastName, email } = req.body;
  try {
      const user = await userExists(email);
      if (user)
          res.redirect('/signIn');
      else
      {    await UserModel.create({
              firstName,
              lastName,
              password: req.password,
              email
          });

          delete req.password;
          console.log(`User ${firstName} ${lastName} has been added!\n`);
          res.redirect(`/`);
      }
  } catch (error) {
      console.log(`Error: ${error.message}`);
  }
}