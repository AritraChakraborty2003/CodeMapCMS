import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";

dotenv.config();

const adminSchema = mongoose.Schema({
  password: { type: String },
  email: { type: String, required: true },
  role: { type: String, required: true },
});

const AdminObj = mongoose.model("Admin", adminSchema);

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const connectDB = async (MongoDB_URI) => {
  try {
    const conn = await mongoose.connect(MongoDB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

connectDB(process.env.MONGODB_URI);

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/oAuthLogin", async (req, res) => {
  try {
    console.log("Received Auth Code:", req.body.code);

    console.log("client:", process.env.GOOGLE_CLIENT_ID);

    //✅ Exchange code for tokens
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "postmessage",
      grant_type: "authorization_code",
      code: req.body.code,
    });

    console.log(tokenRes);

    const { id_token } = tokenRes.data;

    // ✅ Verify ID Token
    const userRes = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`
    );

    console.log("User Info:", userRes.data);

    const { email } = userRes.data;

    let user = await AdminObj.findOne({ email });
    if (!user) {
      user = new AdminObj({
        email: email,
        role: "non admin",
      });
      await user.save();
    }

    // ✅ Generate JWT Token
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax", // For development, use "Lax" instead of "None" to allow cross-origin requests
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(400).json({ message: "Invalid Google token" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminObj.findOne({ email });

    if (!admin) return res.status(400).json({ message: "Invalid email" });
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log(isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const payload = {
      id: admin._id,
      role: admin.role, //This makes it RBAC
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax", // For development, use "Lax" instead of "None" to allow cross-origin requests
      maxAge: 3600000,
    });

    return res
      .status(200)
      .json({ message: "Login successful", status: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

app.get("/admin", (req, res) => {
  AdminObj.find().then((admins) => res.json(admins));
});
app.post("/admin", async (req, res) => {
  const { password, email, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const newAdmin = new AdminObj({ password: passwordHash, email, role });
  newAdmin
    .save()
    .then((admin) => res.json(admin))
    .catch((err) => res.status(400).json(err));
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 8000");
});
