var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { userModel } from "../models/userModel.js";
import OpenAI from "openai";
export const generateChatCompletion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d, _e;
    const { message } = req.body;
    // console.log(message);
    try {
        const user = yield userModel.findById(res.locals.jwtData.id);
        // console.log(user);
        if (!user) {
            res.status(401).send("User is not Registered");
        }
        else {
            user.chats.push({ role: "user", content: message });
            console.log(user);
            const chats = user.chats.map(({ role, content }) => ({ role, content }));
            // chats.push({ role: "user", content: message });
            console.log("chats", chats);
            // const config = configureOpenai();
            const openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
                organization: process.env.OPENAI_ORGANIZATION_ID
            });
            console.log("Openai", openai);
            const chatResponse = yield openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: chats,
                stream: true,
            });
            try {
                for (var _f = true, chatResponse_1 = __asyncValues(chatResponse), chatResponse_1_1; chatResponse_1_1 = yield chatResponse_1.next(), _a = chatResponse_1_1.done, !_a; _f = true) {
                    _c = chatResponse_1_1.value;
                    _f = false;
                    const chunk = _c;
                    console.log("res", ((_e = (_d = chunk.choices[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content) || "");
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_f && !_a && (_b = chatResponse_1.return)) yield _b.call(chatResponse_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            ;
            console.log("chat response", chatResponse);
            // user.chats.push(chatResponse.choices[0].message);
            yield user.save();
            res.status(200).send({ chats: user.chats });
        }
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).send("Internal Server Error");
    }
});
