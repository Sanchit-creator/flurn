const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Seat = require('./models/Seat');
const SeatPricing = require('./models/SeatPricing');

mongoose.connect('mongodb+srv://sanchit:sanchit@cluster0.c7uvikd.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const seatsData = [];
const seatPricingData = [];

fs.createReadStream('Seats.csv')
  .pipe(csv())
  .on('data', (data) => {
    seatsData.push(data);
  })
  .on('end', async () => {
    try {
      await Seat.insertMany(seatsData);
      console.log('Seats data uploaded successfully');

      // Continue with the parsing of SeatPricing.csv
      fs.createReadStream('SeatPricing.csv')
        .pipe(csv())
        .on('data', (data) => {
          const seatPricingEntry = {
            seatClass: data.seatClass || 'DefaultClass',
            seatNumber: data.seatNumber || 'DefaultNumber',
            minPrice: Number(data.minPrice),
            maxPrice: Number(data.maxPrice),
            normalPrice: Number(data.normalPrice),
          };

          seatPricingData.push(seatPricingEntry);
        })
        .on('end', async () => {
          try {
            await SeatPricing.insertMany(seatPricingData);
            console.log('Seat pricing data uploaded successfully');
          } catch (error) {
            console.log(error);
          } finally {
            process.exit(0);
          }
        });
    } catch (error) {
      console.log(error);
      process.exit(0);
    }
  });
