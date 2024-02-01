import { useNavigate } from "react-router-dom";
import CustomizedInput from "../components/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import robot from "../images/robot.png";
import { MdLogin } from "react-icons/md";
import { useRef } from "react";

const Login = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value as string;
        const password = passwordRef.current?.value as string;
        try { 
            const verified = auth?.login(email,password);
            if(verified){
                navigate("/");
            }
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center gap-80">
            <img src={robot} className="hidden sm:w-3/12 sm:h-4/12 sm:flex"></img>
            <form className="w-96 flex flex-col justify-center rounded-lg px-5 py-5 shadow-[2px_2px_10px_0px_grey]" onSubmit={handleSubmit}>
                <h1 className="text-white text-2xl text-center">
                    Login
                </h1>

                <CustomizedInput
                    type="email"
                    name="email"
                    label="Email"
                    val={emailRef}
                />
                <CustomizedInput
                    type="password"
                    name="password"
                    label="Password"
                    val={passwordRef}
                />

                <button type="submit" className="w-28 flex items-center justify-center gap-2 text-white bg-green-600 text-xl py-2 rounded-md mt-2 hover:bg-green-800">
                    Login
                    <MdLogin />
                </button>
            </form>
        </div>
    );
}

export default Login;