import allData from "./datatest";
import ProfileModel from "../backingservices/mongo/models/profile.model"; //ProfileModel para realizar acciones a la db
import mongoose from "mongoose";
const { Types } = mongoose;
// const { ObjectId } = Types;

class Profile {
  //mongo
  async getAllProfileFromMongo() {
    try {
      const profiles = await ProfileModel.find({}).lean();
      return profiles;
    } catch (error) {
      throw error;
    }
  }

  async getProfileByIdFromMongo(idRef) {
    //ES NECESARIO ENVIARLE EL OBJECTID COMO SE VE EN LA DB
    //SE GENERA AUTOMATICAMENTE Y ES UN STRING DE 12 BYTES
    //NO MAS, NO MENOS
    try {
      const matchProfilesById = await ProfileModel.find({
        _id: new Types.ObjectId(idRef),
      }).lean();

      let matchProfileById;

      if (matchProfilesById.length > 0) {
        const [firstElementDb] = matchProfilesById;
        matchProfileById = firstElementDb;
      }
      console.log("debería mandar: ", matchProfileById);

      return matchProfileById;
    } catch (error) {
      throw error;
    }
  }

  //staticdata
  getAllProfileFromStaticData() {
    return allData;
  }

  getProfileByIdStaticData(idRef: String) {
    //siempre indicar el tipo de datos
    const resolveData = allData.find((el) => String(el._id) == String(idRef));

    //resolviendo con un for of
    var dataToFind = null;
    for (const dt of allData) {
      if (String(dt._id) == idRef && dataToFind == null) {
        dataToFind = dt;
      }
    }

    //retornando ambas soluciones
    return { resolveData, dataToFind };
  }

  addProfileToStaticData(profile) {
    allData.push(profile);

    return allData;
  }
}

//instancio la clase
const profileController = new Profile();

//exporto un objeto con dicha instancia. Podría agregar mas variables a la exportacion
export { profileController };
