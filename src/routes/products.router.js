import { Router } from "express";
import ProductManager from "../DAOs/ProductManagerMongo.class.js";
import socketServer from "../App.js";

const router = Router();
const ProductsManager = new ProductManager();

router.get("/", async (req, res) => {
  let limit = parseInt(req.query.limit);
  let page = parseInt(req.query.page);
  let sort = parseInt(req.query.sort);
  let filtro = req.query.filtro;
  let filtroVal = req.query.filtroVal;
  if (!limit) {
    limit = 9;
  }
  if (!page) {
    page = 1;
  }
  const cars = await ProductsManager.getCars(limit,
    page,
    sort,
    filtro,
    filtroVal);
  res.send(cars);
});

router.get("/stock", async (req, res) => {
  const cars = await ProductsManager.getCarsInStock();
  res.send(cars);
});

router.post("/", async (req, res) => {
  const car = await ProductsManager.addCar(req.body);
  socketServer.emit('addCar', car);
  res.send(car);
});


router.get("/:id", async (req, res) => {
  const car = await ProductsManager.getCarById(
    req.params.id
  );

  res.send(car);
});

router.put("/:id", async (req, res) => {
  const car = await ProductsManager.updateCarById(
    req.params.id,
    req.body
  );
  if (car.modifiedCount > 0) {
    const newCar = await ProductsManager.getCarById(req.params.id)
    socketServer.emit('updateCar', newCar);
  }
  res.send(car);
});

router.delete("/:id", async (req, res) => {
  const car = await ProductsManager.deleteCar(req.params.id);
  socketServer.emit('deleteCar', req.params.id);
  res.send(car);
});

export default router;