import { Router } from "express";
import { question3a, question3b } from "./controller";
const path = `/airtable`;

const routes = () => {
    const router = Router();
    router.route("/question-3a").get(question3a);
    router.route("/question-3b").get(question3b);
    return router;
};

export default { path, routes };
