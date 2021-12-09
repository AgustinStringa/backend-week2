import { Router } from "restify-router"; //npm install restify-router
import { profileController } from "../controllers/profile.controller";
//destructuracion de la importacion
const {
  getAllProfileFromStaticData,
  getProfileByIdStaticData,
  addProfileToStaticData,
  getProfileByIdFromMongo,
} = profileController;

const ProfileRoute = new Router();
//agregando rutas de prueba

ProfileRoute.get("/getAllProfiles", async (req, res) => {
  try {
    res.json(getAllProfileFromStaticData());
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

//aunque no se configure en la ruta, gracias al queryParser, se pueden pasar parametros
// este es un ejemplo:
// http://localhost:8080/api/v1/profiles/getProfileById?idRef=2
// en esa url, se toma el idRef y se hace la consulta a la data static->allData
ProfileRoute.get("/getProfileById", async (req, res) => {
  console.log(req.query);
  try {
    //destructurando de req.quert
    const { idRef } = req.query;
    res.json(getProfileByIdStaticData(idRef));
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

//agregandoProfile
ProfileRoute.post("/addProfile", async (req, res) => {
  try {
    console.log("req.query", req.query);
    console.log("req.body", req.body);

    const { profile } = req.body;
    res.json(addProfileToStaticData(profile));
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

//buscando en db
ProfileRoute.get("/getProfileByIdFromMongo", async (req, res) => {
  try {
    let { idRef } = req.query;
    idRef = String(idRef).trim();
    console.log("idRef es: ", idRef, typeof idRef);
    const response = await getProfileByIdFromMongo(idRef);
    console.log("response es: ", response);
    return res.json({ response });
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

export default ProfileRoute;
