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

      const resolveByFindOne = await ProfileModel.findOne({
        _id: new Types.ObjectId(idRef),
      }).lean();

      const resolveById = await ProfileModel.findById(
        new Types.ObjectId(idRef)
      ).lean();

      return [
        {
          matchProfileById: matchProfileById ? matchProfileById : {},
        },
        {
          resolveByFindOne: resolveByFindOne ? resolveByFindOne : {},
        },
        {
          resolveById: resolveById ? resolveById : {},
        },
      ];
    } catch (error) {
      throw error;
    }
  }

  async addProfile(profile) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async addProfileToMongo(profile) {
    const data = await ProfileModel.insertMany(profile);
    console.log(data);
    return data;
  }

  async updateProfilesByBulkOperator(profilesid) {
    const profileBulkOperator =
      ProfileModel.collection.initializeUnorderedBulkOp();

    for (const profileid of profilesid) {
      profileBulkOperator
        .find({
          _id: new Types.ObjectId(profileid),
        })
        .updateOne({
          $set: {
            lastName: "bootcamp",
          },
        });
    }

    if (profileBulkOperator) {
      const dataOperation = await profileBulkOperator.execute();
      console.log(dataOperation);
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
