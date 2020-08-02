const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const eventsSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
      },
    topic: {
      type: String,
      enum: ['Fundraising', 'Markering', 'Sales', 'Technology'],
      required: true,
    },
    eventdate: {
      type: Date,
      required: true,
    },
    virtual: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
eventsSchema.plugin(toJSON);
eventsSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Events = mongoose.model('Events', eventsSchema);

module.exports = Events;
