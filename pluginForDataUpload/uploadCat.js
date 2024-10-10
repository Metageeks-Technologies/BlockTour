const fs = require( 'fs' );
const http = require( 'http' );
const {MongoClient, ObjectId} = require( 'mongodb' );
const mongoose = require( 'mongoose' ); 
const dotenv = require('dotenv')
dotenv.config();

const mongoUrl = process.env.MONGO_URL
const dbName = process.env.DB_NAME
const collectionName = 'categories';

const processAndUploadData = async () => {
    fs.readFile('./data.json', 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        } 
        
        const categorySet = new Set(); // Use a Set to store unique category names
        const categoriesToInsert = []; // Array to hold the category objects for insertion

        try {
            const jsonData = JSON.parse(data);
            console.log("JSON data parsed successfully");

            // Push all categories from items, ensuring no duplicates
            jsonData.rss.channel.item.forEach(item => { 
                    if (item?.category) {
                        // Check if the category is an array or a single value
                        const categories = Array.isArray(item.category) ? item.category : [item.category];
                        categories.forEach(cat => {
                            if (cat?.__cdata) {
                                const categoryName = cat.__cdata;
                                const categorySlug = categoryName.toLowerCase().replace(/ /g, '-'); // Example slug creation
                                const categoryDescription = `Description for ${categoryName}`; // Placeholder for category description

                                // Check if the category already exists in the set
                                if (!categorySet.has(categoryName)) {
                                    categorySet.add(categoryName); // Add to Set for uniqueness
                                    categoriesToInsert.push({ name: categoryName, slug: categorySlug, description: categoryDescription }); // Create category object
                                }
                            }
                        });
                    } 
            });

            console.log('Unique categories to insert:', categoriesToInsert);

            // Continue with MongoDB connection and uploading data
            const client = new MongoClient(mongoUrl);
            await client.connect();
            console.log('Connected to MongoDB');

            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            // Empty the collection
            await collection.deleteMany({});

            // Insert unique categories into the MongoDB collection
            const result = await collection.insertMany(categoriesToInsert);
            console.log(`${result.insertedCount} documents inserted`);

            await client.close();
            console.log('Disconnected from MongoDB');

        } catch (error) {
            console.error('Error processing or uploading data:', error);
        }
    });
};
// Create a simple HTTP server
const server = http.createServer( ( req, res ) => {
    res.writeHead( 200, {'Content-Type': 'text/plain'} );
    res.end( 'Server is running' );
} );

// Start the server and process data
const start = () => {
    const port = 4500;
    server.listen( port, () => {
        console.log( `Server is running at http://localhost:${port}` );
        processAndUploadData();
    } );
};

// Call the start function to execute it
start();
