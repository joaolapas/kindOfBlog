import bcrypt from "bcrypt";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email);

    if (!user) {
      res.status(400).send({ message: "Invalid email or password" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      res.status(400).send({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id)
    res.send({token});
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
export { login };
