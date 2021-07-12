import RoutesController from "./routeController/RoutesController";
import jsonwebtokenSecurity from "./middleware";
import { Express } from "express";
import ClientController from "./routeController/ClientController";
import ScheduleController from "./routeController/ScheduleController";
import ProductController from "./routeController/ProductController";
import OrderController from "./routeController/OrderController";
class Routes {
  private routesController: RoutesController;
  private routeparent: string;
  constructor(routeparent: string, app: Express) {
    this.routesController = new RoutesController();
    this.routeparent = routeparent;
    this.configureRoutes(app);
    this.configureClientRoutes(app);
    this.configureScheduleRoutes(app);
    this.configureProductRoutes(app);
    this.configureOrderRoutes(app);
  }
  private configureRoutes(app: Express) {
    //**--USER ROUTES--------------------------------------------------------------------------------------- */
    app.route(`${this.routeparent}/login`).post(this.routesController.login);
    app
      .route(`${this.routeparent}/users`)
      .post(this.routesController.createUsers);
    app
      .route(`${this.routeparent}/users`)
      .get(this.routesController.getUsers);
    app
      .route(`${this.routeparent}/users/:id`)
      .put(this.routesController.updateUsers);
    app
      .route(`${this.routeparent}/users/:id`)
      .delete(this.routesController.removeUsers);
    app
      .route(`${this.routeparent}/uploadportrait/:id`)
      .post(this.routesController.uploadPortrait);
    app
      .route(`${this.routeparent}/getportrait/:id`)
      .get(this.routesController.getPortrait);

    app
      .route(`${this.routeparent}/addrol/:id`)
      .put(this.routesController.addRol);
    app
      .route(`${this.routeparent}/removerol/:id`)
      .put(this.routesController.removeUserRol);

    //**--ROLES ROUTES--------------------------------------------------------------------------------------- */
    app
      .route(`${this.routeparent}/roles`)
      .post(this.routesController.createRol);
    app
      .route(`${this.routeparent}/roles/:id`)
      .delete(this.routesController.removeRol);
    app
      .route(`${this.routeparent}/roles/`)
      .get(this.routesController.getRoles);
  }
  private configureClientRoutes(app:Express){
    const clientController = new ClientController();
    app
      .route(`${this.routeparent}/clients`)
      .post(clientController.createClient);
    app
      .route(`${this.routeparent}/clients`)
      .get(clientController.listClients);
    app
      .route(`${this.routeparent}/clients/:id`)
      .get(clientController.getClient);
    app
      .route(`${this.routeparent}/clients/:id`)
      .put(clientController.updateClient);
    app
      .route(`${this.routeparent}/clients/:id`)
      .delete(clientController.removeClient);
    app
      .route(`${this.routeparent}/uploadclientphoto/:id`)
      .post(clientController.uploadPhoto);
    app
      .route(`${this.routeparent}/getclientphoto/:id`)
      .get(clientController.getClientPlacePhoto);
  }
  private configureScheduleRoutes(app:Express){
    const scheduleController = new ScheduleController();
    app
      .route(`${this.routeparent}/schedules`)
      .post(scheduleController.create);
    app
      .route(`${this.routeparent}/schedules`)
      .get(scheduleController.list);
    app
      .route(`${this.routeparent}/schedules/:id`)
      .get(scheduleController.get);
    app
      .route(`${this.routeparent}/schedules/:id`)
      .put(scheduleController.update);
    app
      .route(`${this.routeparent}/schedules/:id`)
      .delete(scheduleController.remove);
  }
  private configureProductRoutes(app:Express){
    const productController = new ProductController();
    app
      .route(`${this.routeparent}/products`)
      .post(productController.create);
    app
      .route(`${this.routeparent}/products`)
      .get(productController.list);
    app
      .route(`${this.routeparent}/products/:id`)
      .get(productController.get);
    app
      .route(`${this.routeparent}/products/:id`)
      .put(productController.update);
    app
      .route(`${this.routeparent}/products/:id`)
      .delete(productController.remove);
    app
      .route(`${this.routeparent}/uploadproductphoto/:id`)
      .post(productController.uploadPhoto);
    app
      .route(`${this.routeparent}/getproductphoto/:id`)
      .get(productController.getProductPhoto);
  }
  private configureOrderRoutes(app:Express){
    const orderController = new OrderController();
    app
      .route(`${this.routeparent}/orders`)
      .post(orderController.create);
    app
      .route(`${this.routeparent}/orders`)
      .get(orderController.list);
    app
      .route(`${this.routeparent}/orders/:id`)
      .get(orderController.get);
    app
      .route(`${this.routeparent}/orders/:id`)
      .put(orderController.update);
    app
      .route(`${this.routeparent}/orders/:id`)
      .delete(orderController.remove);
  }
}
export default Routes;
