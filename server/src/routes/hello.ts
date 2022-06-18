import { checkAuth } from './../middleware/checkAuth';
import express,{Request,Response} from 'express';

const router = express.Router();

router.get('/', checkAuth, (_req: Request, res: Response) => {
    return res.json({
        message: "hello world"
    })
});

export default router;