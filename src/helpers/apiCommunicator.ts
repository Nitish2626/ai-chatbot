import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/users/login", { email, password });
    if (res.status === 401) {
        alert("User Not registered");
    }
    else if (res.status === 403) {
        alert("Password is Incorrect");
    }
    else {
        alert("User LoggedIn Successfully");
        const data = await res.data;
        console.log(data);
        return data;
    }

};