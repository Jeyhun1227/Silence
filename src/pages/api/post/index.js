import { createRouter } from "next-connect";

const postController = dynamic(() => import('backend/controllers/post-controller'));
const authMiddleware = dynamic(() => import('backend/middlewares/auth-middleware'));

const router = createRouter();

router.use(authMiddleware).use().delete(postController.deletePost);

export default router.handler({
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
