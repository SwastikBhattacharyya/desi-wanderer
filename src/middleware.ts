import { stackMiddlewares } from "./middlewares";
import { withAuth } from "./middlewares/with-auth";
import { withRole } from "./middlewares/with-role";

const middlewares = [withAuth, withRole];
export default stackMiddlewares(middlewares);
