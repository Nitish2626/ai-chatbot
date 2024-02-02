import Configuration from "openai";

export const configureOpenai=()=>{
    const config=new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORGANIZATION_ID
    });
    return config;
}