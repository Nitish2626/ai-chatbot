import { Link } from "react-router-dom";
import openai from "../images/openai-logo.png";

const Logo = () => {
    return (
        <Link to="/" className="flex">
            <img src={openai} className="w-7 h-7 mr-4 invert" alt="openai-kogo"></img>
            <h1 className="text-white text-xl">
                MERN-GPT
            </h1>
        </Link>
    );
}

export default Logo;