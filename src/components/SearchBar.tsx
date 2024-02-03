import { useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { sendChatRequest } from "../helpers/apiCommunicator";

const SearchBar = ({msg}:any) => {

    const inputRef=useRef<HTMLInputElement | null>(null);

    const search=async(e:any)=>{
        e.preventDefault();
        const content= inputRef.current?.value as string;
        if(inputRef && inputRef.current){
            inputRef.current.value="";
        }
        const newMessage={role:"user",content};
        msg((prev:any)=>[...prev, newMessage]);
        const chatData=await sendChatRequest(content);
        msg([...chatData.chats]);
    };

    return (
        <form className="w-full h-18 flex gap-3 fixed bottom-0 bg-black py-2 px-2 z-10" onSubmit={search}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="w-10/12 py-1 px-2 rounded-md text-xl outline-none"
            />

            <button type="submit" className="w-2/12 flex items-center justify-center bg-gray-800 text-white text-xl rounded-md hover:bg-gray-500">
                <IoMdSend />
            </button>
        </form>
    );
};

export default SearchBar;