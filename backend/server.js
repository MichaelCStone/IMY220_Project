// Michael Stone - u21497682
import express from "express";
import path from "path";
import { MongoClient } from "mongodb";
import apiRoutes from './api.js'; // Include .js extension

// Connection String for MongoDB database
const connectionString = "mongodb+srv://mikestone2002:WypvwNTwnx7hYWAJ@imy220.toaiv.mongodb.net/?retryWrites=true&w=majority&appName=IMY220";

const client = new MongoClient(connectionString);

// CREATE APP
const app = express();
app.use(express.json()); // Middleware for JSON parsing

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "../../frontend/public")));

// Set up API routes (add your CRUD operations here)
app.use('/api', apiRoutes); // All API routes will be prefixed with /api

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public', 'index.html'));
});

// Main function to connect to MongoDB and start the server
async function main() 
{
    try 
    {
        // Create connection
        await client.connect();
        console.log("Connected to MongoDB");

        // Set database
        const database = client.db("u21497682_PlaylistWebsiteDB_Project");
        const songsCollection = database.collection("songs");
        const profilesCollection = database.collection("profiles");
        const playlistsCollection = database.collection("playlists");

        // Expose collections to the app (optional, depending on your API setup)
        app.locals.songsCollection = songsCollection;
        app.locals.profilesCollection = profilesCollection;
        app.locals.playlistsCollection = playlistsCollection;

        // PORT TO LISTEN TO
        const thePort = process.env.PORT || 3000; // Use environment variable or default to 3000
        app.listen(thePort, () => {
            console.log(`Listening on http://localhost:${thePort}`);
        });
    } 
    catch (e) 
    {
        console.error("Error connecting to MongoDB or starting server:", e);
    }
}

// Call the main function to start the app
main();