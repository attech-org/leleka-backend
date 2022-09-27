import mongoose, { Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface User extends Document {
  username: string;
  password: string;
  name: string;
  location?: string;
  url?: string;
  description?: string;
  verified: boolean;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  stats: {
    listedCount?: number;
    favouritesCount?: number;
    statusesCount?: number;
    followersCount?: number;
    followingCount?: number;
  };
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    banner?: string;
    bio?: string;
    birthDate?: string;
    phone?: string;
    gender?: string;
  };
  auth?: {
    local?: {
      accessToken?: string;
      refreshToken?: string;
    };
    twitter?: {
      accessToken?: string;
      refreshToken?: string;
    };
  };
  isFollowed?: boolean;
}

// define user schema
const UserSchema: Schema = new Schema<User>(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Can't be blank"],
      index: {
        unique: true,
        collation: { locale: "en", strength: 1 },
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [8, "Please use minimum of 8 characters"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Can't be blank"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid address"],
      unique: true,
      index: true,
    },
    name: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: String,
      default: new Date().toISOString(),
    },
    updatedAt: {
      type: String,
      default: new Date().toISOString(),
    },
    stats: {
      listedCount: {
        type: Number,
        default: 0,
      },
      favouritesCount: {
        type: Number,
        default: 0,
      },
      statusesCount: {
        type: Number,
        default: 0,
      },
      followersCount: {
        type: Number,
        default: 0,
      },
      followingCount: {
        type: Number,
        default: 0,
      },
    },
    profile: {
      firstName: String,
      lastName: String,
      avatar: String,
      banner: String,
      bio: String,
      birthDate: String,
      phone: String,
      gender: String,
    },
    auth: {
      local: {
        accessToken: {
          type: String,
          select: false,
        },
        refreshToken: {
          type: String,
          select: false,
        },
      },
      twitter: {
        accessToken: {
          type: String,
          select: false,
        },
        refreshToken: {
          type: String,
          select: false,
        },
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // delete ret._id;    Need to ask
        delete ret.password;
        return ret;
      },
    },
  }
);

UserSchema.plugin(paginate);

// UserSchema.virtual("isFollowed").get(() => {
//   return false;
// });

//   // eslint-disable-next-line func-names
// UserSchema.post("find", async function (docs) {
//   // eslint-disable-next-line prefer-const
//   for (let doc of docs) {
//     // if (doc.isPublic) {
//     await doc.populate("isFollowed");
//     // }
//   }
// });

// UserSchema.post("find", async (docs) => {
//   console.warn(await docs);
//   const docs.map(doc=>doc.id)
//   // const allFollowed = await listFollowers();

//   // docs.forEach((doc)=>{if (doc in allFollowed) doc.followed = true}
// });

export const UserModel = mongoose.model<User, mongoose.PaginateModel<User>>(
  "User",
  UserSchema,
  "User"
);
