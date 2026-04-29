import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserAuthSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true, // fixed
    },
    email: {
      type: String,
      required: true,
      unique: true, // optional but recommended
    },
    password: {
      type: String,
      required: true,
       //   validate: {
      //     validator: function (v) {
      //       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      //         v
      //       );
      //     },
      //     message:
      //       "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      //   },
    },
    youAre: {
      type: String,
      enum: ["customer", "retailer", "admin"], // fixed enum
      default: "customer",
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserAuthSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password method
UserAuthSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserAuth = mongoose.model("UserAuth", UserAuthSchema);
export default UserAuth;
