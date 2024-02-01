import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/users/login", { email, password });
    const data = await res.data;
    return data;
};

export const checkAuthStatus = async () => {
    const res = await axios.get("/users/status");
    if (res.status === 401) {
        alert("Unable to Authenticate");
    }
    else {
        const data = await res.data;
        return data;
    }
};