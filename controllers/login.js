import dotenv from "dotenv";
import UserModel from "../Models/user.model.js"
import { userExists } from "../middlewares/authentification.js";

dotenv.config();

export function LoginPage(req, res) {
  res.render("login");
}

// request user model with form datas to find the account
export async function Login (req, res){
  try {
    // Is mail available ?
    const user = await userExists(email);
    
    if (user)
        res.redirect('/signInPage');
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