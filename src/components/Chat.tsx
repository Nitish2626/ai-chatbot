import SingleChat from "./SingleChat";

const Chat = ({msg}:any) => {

    // const chatMessages = [
    //     {
    //         role: "user",
    //         content: "Hello, can you tell me the weather"
    //     },
    //     {
    //         role: "assistant",
    //         content: "lorem ipsum fherhfuyg grjhreugurth lorem ipsum fherhfuyg grjhreugurth lorem ipsum fherhfuyg grjhreugurthlorem ipsum fherhfuyg grjhreugurth lorem ipsum fherhfuyg grjhreugurthlorem ipsum fherhfuyg grjhreugurth"
    //     },
    //     {
    //         role: "user",
    //         content: "jhrver reghreyuythyjhuj7"
    //     },
    //     {
    //         role: "assistant",
    //         content: "ipsum jhgugrt fuhvujb lorem"
    //     },
    //     {
    //         role: "user",
    //         content: "hfjerug lorem juhurgureg ipsum"
    //     },
    //     {
    //         role: "assistant",
    //         content: "lorem jhj ufuiergui gruirei ipsum"
    //     },
    //     {
    //         role: "user",
    //         content: "hfjerug lorem juhurgureg ipsum"
    //     },
    //     {
    //         role: "assistant",
    //         content: "lorem jhj ufuiergui gruirei ipsum"
    //     },
    //     {
    //         role: "user",
    //         content: "hfjerug lorem juhurgureg ipsum"
    //     },
    //     {
    //         role: "assistant",
    //         content: "lorem jhj ufuiergui gruirei ipsum"
    //     },
    // ];

    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-96 flex flex-col text-white mb-14 mt-2 bg-gray-800 rounded-lg px-2 pb-4">
                {msg.map((chat:any) => (
                    <SingleChat
                        key={Date.now()}
                        role={chat.role}
                        content={chat.content}
                    />
                ))}
            </div>
        </div>
    );
}

export default Chat;