import mongoose from 'mongoose';

const spaceLaunchSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    date_utc: {
      type: Date,
      required: true,
    },
    date_local: {
      type: String,
      required: true,
    },
    rocket: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        default: 'Falcon 9',
      },
      type: {
        type: String,
        default: 'FT',
      },
    },
    launchpad: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        default: 'Launch Complex 39A',
      },
      locality: {
        type: String,
        default: 'Cape Canaveral',
      },
      region: {
        type: String,
        default: 'Florida',
      },
    },
    payloads: [
      {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          default: 'Payload',
        },
        type: {
          type: String,
          default: 'Satellite',
        },
        orbit: {
          type: String,
          default: 'LEO',
        },
        customers: [
          {
            type: String,
          },
        ],
      },
    ],
    cores: [
      {
        core: {
          type: String,
          required: true,
        },
        flight: {
          type: Number,
          default: 1,
        },
        gridfins: {
          type: Boolean,
          default: true,
        },
        legs: {
          type: Boolean,
          default: true,
        },
        reused: {
          type: Boolean,
          default: true,
        },
        landing_attempt: {
          type: Boolean,
          default: true,
        },
        landing_success: {
          type: Boolean,
          default: null,
        },
        landing_type: {
          type: String,
          default: 'ASDS',
        },
        landpad: {
          type: String,
          default: '5e9e3032383ecb6bb234e7ca',
        },
      },
    ],
    fairings: {
      reused: {
        type: Boolean,
        default: false,
      },
      recovery_attempt: {
        type: Boolean,
        default: false,
      },
      recovered: {
        type: Boolean,
        default: false,
      },
      ships: [
        {
          type: String,
        },
      ],
    },
    links: {
      patch: {
        small: {
          type: String,
          default: '',
        },
        large: {
          type: String,
          default: '',
        },
      },
      reddit: {
        campaign: {
          type: String,
          default: null,
        },
        launch: {
          type: String,
          default: null,
        },
        media: {
          type: String,
          default: null,
        },
        recovery: {
          type: String,
          default: null,
        },
      },
      flickr: {
        small: [
          {
            type: String,
          },
        ],
        original: [
          {
            type: String,
          },
        ],
      },
      presskit: {
        type: String,
        default: null,
      },
      webcast: {
        type: String,
        default: '',
      },
      youtube_id: {
        type: String,
        default: '',
      },
      article: {
        type: String,
        default: null,
      },
      wikipedia: {
        type: String,
        default: '',
      },
    },
    static_fire_date_utc: {
      type: Date,
      default: null,
    },
    static_fire_date_unix: {
      type: Number,
      default: null,
    },
    tbd: {
      type: Boolean,
      default: false,
    },
    net: {
      type: Boolean,
      default: false,
    },
    window: {
      type: Number,
      default: 0,
    },
    success: {
      type: Boolean,
      default: null,
    },
    failures: [
      {
        time: Number,
        altitude: Number,
        reason: String,
      },
    ],
    details: {
      type: String,
      default: null,
    },
    crew: [
      {
        crew: String,
        role: String,
      },
    ],
    ships: [
      {
        type: String,
      },
    ],
    capsules: [
      {
        type: String,
      },
    ],
    payloads_ids: [
      {
        type: String,
      },
    ],
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'space_launches',
  }
);

// Index for efficient queries
spaceLaunchSchema.index({ date_utc: 1 });
spaceLaunchSchema.index({ 'rocket.name': 1 });
spaceLaunchSchema.index({ last_updated: -1 });

export const SpaceLaunch = mongoose.model('SpaceLaunch', spaceLaunchSchema);
