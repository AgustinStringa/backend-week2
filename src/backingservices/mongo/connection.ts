import moongose from "mongoose";

let endpointMongoDB = process.env.ENDPOINT_MONGO_DB;

const ProfileMongoDB = moongose.createConnection(endpointMongoDB);

export default ProfileMongoDB;
