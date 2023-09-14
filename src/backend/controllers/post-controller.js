import ControllerHandler from "backend/utils/controller-handler";
import postService from "backend/services/post-service";
import { createResponse } from "backend/utils/create-response";

const controllerHandler = new ControllerHandler("POST").fn;

const deletePost = controllerHandler({
  fn: async (req, res) => {
    await postService.deletePost(req.query.id);
    createResponse(res, null);
  },
});
export default {
  deletePost,
};
