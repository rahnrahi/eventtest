const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { Events } = require('../models');

const createEvent = catchAsync(async (req, res) => {
    const event = await Events.create(req.body);
    res.status(httpStatus.CREATED).send(event);
});

const getEvent = catchAsync(async (req, res) => {
    const event = await Events.findById(req.params.id);
    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }
    res.send(event);
});
  
const updateEvent = catchAsync(async (req, res) => {
    const event = await Events.findById(req.params.id);
    if (!event) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }

    Object.assign(event, req.body);
    await event.save();
    res.send(event);
});

const deleteEvent = catchAsync(async (req, res) => {
    const event = await Events.findById(req.params.id);
    if (!event) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }
    await event.remove();
    res.status(httpStatus.NO_CONTENT).send();
});

const getevents = catchAsync(async (req, res) => {
    const filter  = pick(req.query, ['title', 'description', 'topic']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result  = await Events.paginate(filter, options);
    res.send(result)
});

module.exports = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent,
    getevents
};
  