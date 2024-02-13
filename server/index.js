//MERN Stack imports
import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path  from "path";
import { fileURLToPath } from "url";
import { error } from "console";

//Configurations

//helps grab file url by using directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//invokes env files
dotenv.config();
//invokes express application
const app = express();
app.use(express.json());
//invokes helmet package
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
//invokes morgan package
app.use(morgan("common"));
//invokes bodyparser
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
//invokes cross-origin policies
app.use(cors());
//set dir containing assets locally
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

//File Storage
//location where files uploaded are saved
const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"public/assets");
    },
    filename: function (req,file,cb) {
        cb(null, file.originalname);
    }
    
})
//variable associated with upload of files
const upload = multer({ storage });

//setting up Mongoose
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useunifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

})
.catch((error) => console.log(`${error} did not connect`));

