import { useAuth } from "../context/AuthContext";
import openai from "../images/openai-logo.png";

const SingleChat = ({ role, content }: {role:string, content:string}) => {

    const auth = useAuth();

    return (
        <div className="w-full flex flex-col mt-4">
            <section className="flex items-center gap-3 pl-2">
                {role === "user" ?
                    <h3 className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-xl shadow-sm shadow-gray-300">
                        {auth?.user?.name[0].toUpperCase()}
                    </h3> :
                    <img src={openai} className="w-5 h-5 rounded-full invert" alt="Avatar" />
                }

                <h1 className="text-xl">
                    {role === "user" ? "You" : "ChatGPT"}
                </h1>
            </section>

            <h1 className="mt-1 pl-11">
                {content}
            </h1>
        </div>
    );
};

export default SingleChat;