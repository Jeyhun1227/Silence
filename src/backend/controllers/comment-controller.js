import ControllerHandler from "backend/utils/controller-handler";
import commentService from "backend/services/comment-service";
import { createResponse } from "backend/utils/create-response";

const controllerHandler = new ControllerHandler("POST").fn;

const deleteComment = controllerHandler({
  fn: async (req, res) => {
    await commentService.deleteComment(req.query.id);
    createResponse(res, null);
  },
});
export default {
  deleteComment,
};
