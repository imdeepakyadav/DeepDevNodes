import mongoose from 'mongoose';

const randomUserSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        default: '',
      },
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    cell: {
      type: String,
      default: '',
    },
    picture: {
      large: {
        type: String,
        default: '',
      },
      medium: {
        type: String,
        default: '',
      },
      thumbnail: {
        type: String,
        default: '',
      },
    },
    location: {
      street: {
        number: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postcode: {
        type: String,
        required: true,
      },
      coordinates: {
        latitude: {
          type: String,
          required: true,
        },
        longitude: {
          type: String,
          required: true,
        },
      },
      timezone: {
        offset: {
          type: String,
          default: '',
        },
        description: {
          type: String,
          default: '',
        },
      },
    },
    dob: {
      date: {
        type: String,
        default: '',
      },
      age: {
        type: Number,
        default: 0,
      },
    },
    registered: {
      date: {
        type: String,
        default: '',
      },
      age: {
        type: Number,
        default: 0,
      },
    },
    login: {
      uuid: {
        type: String,
        default: '',
      },
      username: {
        type: String,
        default: '',
      },
      password: {
        type: String,
        default: '',
      },
      salt: {
        type: String,
        default: '',
      },
      md5: {
        type: String,
        default: '',
      },
      sha1: {
        type: String,
        default: '',
      },
      sha256: {
        type: String,
        default: '',
      },
    },
    nat: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'random_users',
  }
);

// Index for efficient queries
randomUserSchema.index({ 'name.first': 1 });
randomUserSchema.index({ 'name.last': 1 });
randomUserSchema.index({ email: 1 });
randomUserSchema.index({ 'location.country': 1 });

export const RandomUser = mongoose.model('RandomUser', randomUserSchema);
