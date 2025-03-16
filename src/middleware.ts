import { stackMiddlewares } from "./middlewares";
import { withAuth } from "./middlewares/with-auth";

const middlewares = [withAuth];
export default stackMiddlewares(middlewares);
