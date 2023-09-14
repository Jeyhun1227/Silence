import { createRouter } from "next-connect";
import dynamic from "next/dynamic";
import httpStatus from "http-status";

const commentController = dynamic(() => import('backend/controllers/comment-controller'));
const authMiddleware = dynamic(() => import('backend/middlewares/auth-middleware'));
const ApiError = dynamic(() => import('backend/utils/api-error'));

const router = createRouter();

router.use(authMiddleware).delete(commentController.deleteComment);

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    throw new ApiError("Not found", httpStatus.NOT_FOUND);
  },
});
