// const fs = require( 'fs' );
// const express = require('express')
// const mongoose = require('mongoose'); // Import mongoose for MongoDB
// // const TempData = require('./tempData/tempData'); // Import your Mongoose model for the tempdata collection
// // import TempData from "../models/tempData/tempData"
// // Function to read, transform, and upload data
// const uploadData = async () => {
//     // Step 1: Read the JSON file
//     fs.readFile('./data.json', 'utf8', async (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return; // Exit if there's an error reading the file
//         }

//         const jsonData = JSON.parse(data); // Parse the JSON data
//         console.log("json data:-", jsonData); // Log the parsed data

//         // Step 2: Transform the data
//         const transformedData = jsonData.rss.channel.item.map(item => ({
//             title: item.title.__cdata,
//             link: item.link,
//             publishedDate: new Date(item.pubDate), // Convert to Date object if needed
//             creator: item.creator.__cdata,
//             // Add other fields as necessary based on your schema
//         }));

//         console.log("transform data:-", transformedData); // Log the transformed data

//         // Step 3: Upload the data to the MongoDB database
//         try {
//             await TempData.insertMany(transformedData); // Insert transformed data into the tempdata collection
//             console.log('Data uploaded successfully'); // Log success message
//         } catch (error) {
//             console.error('Error uploading data:', error); // Log any errors during upload
//         }
//     });
// };


// // Database connection and server start
// const start = async () => {
//     const mongoUrl = "mongodb+srv://shiva:123shiva@cluster0.8vzujux.mongodb.net/BlockTour2?retryWrites=true&w=majority"
//     const app = express();
//     ; // Get the MongoDB URL from environment variables
//     if (!mongoUrl || (!mongoUrl.startsWith('mongodb://') && !mongoUrl.startsWith('mongodb+srv://'))) {
//         console.error('Invalid MongoDB connection string. It must start with "mongodb://" or "mongodb+srv://".');
//         return; // Exit if the connection string is invalid
//     }

//     try {
//         await mongoose.connect(mongoUrl); // Connect to MongoDB
//         console.log('Connected to MongoDB'); // Log connection success
//         app.listen(8000, () =>
//             console.log(`⚡️[server]: Server is running at http://localhost:8000 and connected with database`)
//         );
//         await uploadData(); // Call the uploadData function after the server starts
//     } catch (error) {
//         console.log('Error connecting to the database:', error); // Log any connection errors
//     }
// };

// // Call the start function to execute it
// start();
