import ProfileMongoDB from "../connection";
import moongose, { Types, ObjectId, Schema } from "mongoose";

const ExperienceSchema = new Schema({
  jobPosition: { type: String },
  companyName: { type: String },
});

const EducationSchema = new Schema({
  instituionName: { type: String },
  career: { type: String },
});

const ProfileSchema = new Schema(
  {
    firstName: { type: String, trim: true },
    fullName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    mobilePhone: { type: String },
    urlLinkedin: { type: String, unique: true, trim: true, lowercase: true },
    experiences: [ExperienceSchema],
    educations: [EducationSchema],
  },
  {
    timestamps: true,
  }
);

const ProfileModel = ProfileMongoDB.model("Profile", ProfileSchema);

export default ProfileModel;
