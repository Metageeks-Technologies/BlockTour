const {config} = require( 'dotenv' );
const fs = require( 'fs' );
const http = require( 'http' );
const {MongoClient, ObjectId} = require( 'mongodb' );
const mongoose = require( 'mongoose' );
const dotenv = require('dotenv')
dotenv.config();

const mongoUrl = process.env.MONGO_URL
const dbName = process.env.DB_NAME
const collectionName = 'posts';

console.log( "mongoUrl:-", mongoUrl );
console.log( "dbname:-", dbName );

// Function to validate an item
const isValidItem = ( item ) => {
    return item.title?.__cdata &&   
        item.link &&
        item.pubDate &&
        item.creator?.__cdata;
};

// Function to read, transform, and upload data
const processAndUploadData = async () => {
    fs.readFile( './data.json', 'utf8', async ( err, data ) => {
        if ( err ) {
            console.error( 'Error reading file:', err );
            return;
        }

        try {
            const jsonData = JSON.parse( data );
            console.log( "JSON data parsed successfully" ); 

            function removeImageFromHtml(htmlContent) {
    // Use a regular expression to match <img> tags and remove them
    return htmlContent.replace(/<img[^>]*src="[^"]*"[^>]*>/g, '');
            }
            
            const transformedData = jsonData.rss.channel.item
                .filter( isValidItem )
                .map( item => ( {
                    title: item?.title?.__cdata,
                    permaLink: item?.post_name?.__cdata,
                    description: removeImageFromHtml(item?.encoded[0]?.__cdata || ""), // Assuming description comes from item.description
                    publishedDate: new Date( item?.pubDate ),
                    visibility: "public",
                    status: item?.status?.__cdata, // Map from publish to Published
                    category: item?.category?.length ? item?.category?.map( cat => cat?.__cdata ): item?.category?.__cdata, 
                    tags: [],
                    postType: item.postType?.__cdata,
                    creatorId: new mongoose.Types.ObjectId( item.creator?.__id ),
                    authorName: item.creator?.__cdata,
                    views: parseInt( item.postmeta.find( meta => meta.meta_key?.__cdata === "_eael_post_view_count" )?.meta_value?.__cdata ) || 0,
                    bookmarkedBy: [],
                    likes: [],
                    previewImageUrl: item.postmeta.find( meta => meta.meta_key?.__cdata === "_thumbnail_id" )?.meta_value?.__cdata || ""
                } ) );

            // console.log("tranformed data:-",transformedData)
            console.log( `Transformed ${transformedData.length} valid items` );

            if ( transformedData.length === 0 ) {
                console.log( "No valid data to upload" );
                return;
            }

            // Connect to MongoDB and upload data
            const client = new MongoClient( mongoUrl );
            await client.connect();
            console.log( 'Connected to MongoDB' );

            const db = client.db( dbName );
            const collection = db.collection( collectionName );
            // empty the collection
            // await collection.deleteMany( {} );

            // const result = await collection.insertMany(transformedData);
            console.log( `${result.insertedCount} documents inserted` );

            await client.close();
            console.log( 'Disconnected from MongoDB' );

        } catch ( error ) {
            console.error( 'Error processing or uploading data:', error );
        }
    } );
};
exports.processAndUploadData = processAndUploadData;

// Create a simple HTTP server
const server = http.createServer( ( req, res ) => {
    res.writeHead( 200, {'Content-Type': 'text/plain'} );
    res.end( 'Server is running' );
} );

// Start the server and process data
const start = () => {
    const port = process.env.PORT || 4500;
    console.log("Port:-",port)
    server.listen( port, () => {
        console.log( `Server is running at http://localhost:${port}` );
        processAndUploadData();
    } );
};

// Call the start function to execute it
start();