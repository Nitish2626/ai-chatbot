import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/users/login", { email, password });
    const data = await res.data;
    return await data;
};

export const checkAuthStatus = async () => {
    const res = await axios.get("/users/status");
    if (res.status === 401) {
        console.log("Unable to Authenticate");
    }
    else {
        const data = await res.data;
        return data;
    }
};

export const sendChatRequest=async (message:string)=>{
    // console.log("Chat Message",{message});
    const res=await axios.post("/chats/new",{
        // headers:{
        //     "Authorization":`Bearer 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`
        // },
        message
    });
    console.log("chat Response",res);
    if(res.status !== 200){
        console.log("Unable to send Chat");
    }
    else{
        const data=await res.data;
        console.log("data",data);
        return data;
    }
};