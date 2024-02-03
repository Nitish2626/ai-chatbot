import SingleChat from "./SingleChat";

const Chat = () => {

    const chatMessages = [
        {
            role: "user",
            content: "Hello, can you tell me the weather"
        },
        {
            role: "assistant",
            content: "lorem ipsum fherhfuyg grjhreugurth"
        },
        {
            role: "user",
            content: "jhrver reghreyuythyjhuj7"
        },
        {
            role: "assistant",
            content: "ipsum jhgugrt fuhvujb lorem"
        },
        {
            role: "user",
            content: "hfjerug lorem juhurgureg ipsum"
        },
        {
            role: "assistant",
            content: "lorem jhj ufuiergui gruirei ipsum"
        },
    ];

    return (
        <div className="w-full text-white mb-14 mt-2 bg-black rounded-lg px-2 py-2">
            {chatMessages.map((chat)=>(
                <SingleChat 
                    key={Date.now()}
                    role={chat.role}
                    content={chat.content}
                />
            ))}
        </div>
    );
}

export default Chat;