import { Router } from "express";

import monitor from './modules/monitor';
const routes = () => {

    const router = Router();
    router.use(monitor.path, monitor.routes());

    return router;
};
export default routes;
