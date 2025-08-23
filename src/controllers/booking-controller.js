const axios = require('axios');
const dotenv = require('dotenv');

const { StatusCodes } = require("http-status-codes");

const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

const BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE;

dotenv.config();



async function createBooking(req, res) {
  try {
    if (!req.body.flightId || !req.body.noOfSeats) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "flightId and noOfSeats are required"
      });
    }

    const response = await axios.post(
      `${BOOKING_SERVICE_URL}/api/v1/bookings`,
      {
        flightId: req.body.flightId,
        noOfSeats: req.body.noOfSeats,
        userId: req.user.id, // from JWT
      }
    );

    return res.status(StatusCodes.CREATED).json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: error.message });
  }
}



async function makePayment(req, res) {
  console.log("user", req.user);
   //console.log("data", req.data)

  try {
    const response = await axios.post(
      `${BOOKING_SERVICE_URL}/api/v1/bookings/payments`, 
      {
        bookingId: req.body.bookingId,
        totalCost: req.body.totalCost,
        userId: req.user.id, // from token
      },
      {
        headers: {
          'x-idempotency-key': req.headers['x-idempotency-key']
        }
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: error.message });
  }
}

module.exports = { 
  makePayment,
  createBooking
 };
