import { createRouter } from "next-connect";
import dynamic from "next/dynamic";

const postController = dynamic(() => import('backend/controllers/post-controller'));
const authMiddleware = dynamic(() => import('backend/middlewares/auth-middleware'));

const router = createRouter();

router.use(authMiddleware).delete(postController.deletePost);

export default router.handler({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
