import { useAuth } from "../context/AuthContext";
// import openai from "../images/openai-logo.png";

const SingleChat = () => {

    const auth=useAuth();
    console.log(auth?.user);

    return (
        <div className="w-full flex flex-col mt-4">
            <section className="flex items-center gap-3 pl-2">
                {/* <img src={openai} className="w-5 h-5 rounded-full invert" alt="Avatar" /> */}
                <h3 className="w-6 h-6 rounded-full bg-white text-black">
                    {auth?.user?.name}
                </h3>
                <h1 className="text-xl">
                    You
                </h1>
            </section>

            <h1 className="mt-1 pl-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut deleniti ad, a consectetur provident itaque laborum ducimus. Commodi exercitationem saepe, similique minima et iusto sit consequatur odit repudiandae iure tenetur!
            </h1>
        </div>
    );
};

export default SingleChat;