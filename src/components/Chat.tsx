import SingleChat from "./SingleChat";

const Chat = ({msg}:any) => {

    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-96 flex flex-col text-white mb-14 mt-2 bg-gray-800 rounded-lg px-2 pb-4">
                {msg.map((chat:any,i:number) => (
                    <SingleChat
                        key={i}
                        role={chat.role}
                        content={chat.content}
                    />
                ))}
            </div>
        </div>
    );
}

export default Chat;