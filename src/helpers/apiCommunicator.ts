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