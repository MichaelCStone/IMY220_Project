// Michael Stone - u21497682
import express from 'express';
import { ReturnDocument } from 'mongodb';

const router = express.Router();

//login a user
router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    try
    {
        const userProfile = await req.app.locals.profilesCollection.findOne({ username });

        // If user not found
        if (!userProfile) 
        {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Compare the password (no hashing, just plain comparison)
        if (userProfile.password !== password) 
        {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Success: send back user profile (excluding sensitive fields like password)
        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            profile: {
                simpleId: userProfile.simpleId,
                name: userProfile.name,
                bio: userProfile.bio,
                country: userProfile.country,
                picture: userProfile.picture,
                followers: userProfile.followers,
                following: userProfile.following,
                playlists: userProfile.playlists,
                username: userProfile.username,
                email: userProfile.email
                // Exclude password
            }
        });
    } 
    catch (error) 
    {
        console.error("Error during login:", error);

        res.status(500).json({
            status: 'error',
            message: 'Login failed'
        });
    }
});

//creating a new user
router.post('/signup', async (req, res) => {
    console.log("Received Data:", req.body); 
    const { name, bio, country, picture, followers, following, playlists, username, password, email } = req.body;

    try 
    {
        const existingUser = await req.app.locals.profilesCollection.findOne({ username });
        const existingEmail = await req.app.locals.profilesCollection.findOne({ email });
        
        if (existingEmail) {
            return res.status(409).json({
                status: 'error',
                message: 'Email already in use. Please use another email.'
            });
        }

        if (existingUser) 
        {
            return res.status(409).json({
                status: 'error',
                message: 'Username already exists. Please choose another one.'
            });
        }

        const existingProfiles = await req.app.locals.profilesCollection.find().toArray();
        const newSimpleId = existingProfiles.length + 1; // Simple incrementing ID

        // Create new profile object
        const newProfile = {
            simpleId: newSimpleId,
            name,
            bio,
            country,
            picture,
            followers,
            following,
            playlists,
            username,
            password, //hashing?
            email
        };

        console.log("New profile object:", newProfile);

        await req.app.locals.profilesCollection.insertOne(newProfile);

        res.status(201).json({
            status: 'success',
            message: 'Profile created successfully',
            profileId: newSimpleId
        });
    } 
    catch (error) 
    {
        console.error("Error inserting profile:", error);

        res.status(500).json({
            status: 'error',
            message: 'Profile creation failed'
        });
    }
});

//Get all songs
router.get('/songs', async (req, res) => {
    // const songsCollection = req.app.locals.songsCollection;

    try 
    {
        const songs = await req.app.locals.songsCollection.find({}).toArray();

        res.json(songs);
    } 
    catch (error) 
    {
        res.status(500).send(error.message);
    }
});

//Get all playlists
router.get('/playlists', async (req, res) => {
    // const songsCollection = req.app.locals.songsCollection;

    try 
    {
        const playlists = await req.app.locals.playlistsCollection.find({}).toArray();

        res.json(playlists);
    } 
    catch (error) 
    {
        res.status(500).send(error.message);
    }
});

//Get a user's profile
router.get('/profiles/:username', async (req, res) => {

    const username = req.params.username;

    try 
    {
        // const user = await User.findOne({ username: username }).select('-password'); // Exclude password for security
        const profile = await req.app.locals.profilesCollection.findOne({ username: username });

        if (!profile) 
        {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(profile);
    } 
    catch (error) 
    {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

//update a user's profile
router.put('/profiles/:username', async (req, res) => {

    const username = req.params.username;
    const updatedProfileData = req.body;

    try 
    {
        // Find the user by username and update their profile
        const updatedUser = await req.app.locals.profilesCollection.findOneAndUpdate(
            { username: username },
            { $set: updatedProfileData },
            { returnDocument: "after" }
        );

        if (!updatedUser) 
        {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(updatedUser);
    } 
    catch (error) 
    {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

//View a specific playlist
router.get('/playlists/:playlistId', async (req, res) => {

    const playlistId = parseInt(req.params.playlistId);

    try 
    {
        // Find the playlist by its ID
        const playlist = await req.app.locals.playlistsCollection.findOne({ simpleId: playlistId });

        if (!playlist) 
        {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        // Return the playlist details
        return res.status(200).json(playlist);
    } 
    catch (error) 
    {
        console.error('Error fetching playlist:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

//Add follower to my following list
router.post('/follow/:usernameToFollow', async (req, res) => {
    const followerUsername = req.body.username; // The user who wants to follow
    const usernameToFollow = req.params.usernameToFollow;

    try 
    {
        const followerUser = await req.app.locals.profilesCollection.findOne({ username: followerUsername });

        const userToFollow = await req.app.locals.profilesCollection.findOne({ username: usernameToFollow });

        if (!followerUser || !userToFollow) 
        {
            return res.status(404).json({ message: 'User not found' });
        }

        if (followerUser.following.includes(usernameToFollow)) 
        {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        // Add the username to the follower's following list
        await req.app.locals.profilesCollection.updateOne(
            { username: followerUsername },
            { $addToSet: { following: usernameToFollow } } // $addToSet prevents duplicates
        );

        //add follower's username to the user who is being followed?
        await req.app.locals.profilesCollection.updateOne(
            { username: usernameToFollow },
            { $addToSet: { followers: followerUsername } }
        );

        return res.status(200).json({ message: `${followerUsername} is now following ${usernameToFollow}` });
    } 
    catch (error) 
    {
        console.error('Error following user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

//unfollow a user
router.delete('/unfollow/:username', async (req, res) => {
    const usernameToUnfollow = req.params.username;
    const currentUser = req.body.username;

    try 
    {
        const user = await req.app.locals.profilesCollection.findOne({ username: currentUser });
        // console.log(user);

        const userToUnfollow = await req.app.locals.profilesCollection.findOne({ username: usernameToUnfollow });
        // console.log(userToUnfollow);

        if (!user || !userToUnfollow) 
        {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.following.includes(usernameToUnfollow)) 
        {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        user.following = user.following.filter(username => username !== usernameToUnfollow);

        userToUnfollow.followers = userToUnfollow.followers.filter(username => username !== currentUser);

        await req.app.locals.profilesCollection.updateOne(
            { username: currentUser },
            { $set: { following: user.following } }
        );

        await req.app.locals.profilesCollection.updateOne(
            { username: usernameToUnfollow },
            { $set: { followers: userToUnfollow.followers } }
        );

        return res.status(200).json({ message: `${currentUser} has unfollowed ${usernameToUnfollow}` });
    } 
    catch (error) 
    {
        console.error('Error unfollowing user:', error);
        return res.status(500).json({ message: 'An error occurred while trying to unfollow' });
    }
});

//Create a new Song
router.post('/addSong', async (req, res) => {
    try {
        const { title, artist, album, genre, year, spotifyLink } = req.body;
        console.log(req.body); // Log to check the received data

        const songsCollection = req.app.locals.songsCollection;
        const songCount = await songsCollection.countDocuments();

        const newSong = {
            simpleId: songCount + 1,
            title,
            artist,
            album,
            genre,
            year,
            spotifyLink
        };

        await songsCollection.insertOne(newSong);
        res.status(201).json({ message: 'Song added successfully', newSong });
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(500).json({ message: 'Error adding song', error });
    }
});

//Add a new playlist
router.post('/addPlaylist', async (req, res) => {
    try 
    {
        const playlistsCollection = req.app.locals.playlistsCollection;
        const profilesCollection = req.app.locals.profilesCollection;
        const { name, picture, genre, author, category, hashtags, comments, description, songs, ownerId } = req.body;
        
        // Ensure the fields are arrays (default to empty arrays if missing)
        // const validatedHashtags = hashtags || [];
        // const validatedComments = comments || [];
        // const validatedSongs = songs || [];
        const validatedHashtags = Array.isArray(hashtags) ? hashtags : [];
        const validatedComments = Array.isArray(comments) ? comments : [];
        const validatedSongs = Array.isArray(songs) ? songs : [];

        // Validate required fields (example)
        if (!name || !ownerId || !Array.isArray(validatedSongs)) {
            return res.status(400).json({ message: 'Missing required fields or invalid data' });
        }

        const newSimpleId = (await playlistsCollection.countDocuments()) + 1;

        const newPlaylist = {
            simpleId: newSimpleId,
            name,
            picture,
            genre,
            author,
            category,
            hashtags: validatedHashtags,
            comments: validatedComments,
            description,
            songs: validatedSongs,
            ownerId,
        };

        const result = await playlistsCollection.insertOne(newPlaylist); // insert into DB

        if (result.acknowledged) 
        {
            // Update the owner's profile to include the new playlist's simpleId
            const updateResult = await profilesCollection.updateOne(
                { simpleId: ownerId }, // Assuming ownerId is the _id of the profile
                { $addToSet: { playlists: newSimpleId } } // Add the new playlist's simpleId
            );

            if (updateResult.modifiedCount === 1) 
            {
                res.status(201).json({ message: 'Playlist created successfully', playlist: newPlaylist });
            } 
            else 
            {
                // If the profile was not updated, return a warning
                res.status(200).json({ message: 'Playlist created, but owners playlists not updated', playlist: newPlaylist });
            }
        } 
        else 
        {
            throw new Error('Failed to create playlist');
        }

    } catch (error) {
        console.error('Error adding playlist:', error);
        res.status(500).json({ message: 'Error adding playlist', error: error.message });
    }
});

//Get all playlists of a specific profile
router.get('/playlists/user/:ownerId', async (req, res) => {
    
    try 
    {
        const { ownerId } = req.params;
        const profilePlaylists = await req.app.locals.playlistsCollection.find({ ownerId: parseInt(ownerId) }).toArray();

        if (profilePlaylists.length === 0) 
        {
            // return res.status(404).json({
            //     message: 'No playlists found for this user'
            // });

            return res.json([]);
        }

        // Return the playlists in the response
        res.json(profilePlaylists);
    } 
    catch (error) 
    {
        console.error('Error fetching playlists for user:', error);

        res.status(500).json({
            message: 'Error fetching playlists',
            error: error.message
        });
    }
});

//delete a song
router.delete('/songs/:songId', async (req, res) => {

    try 
    {
        const songId = parseInt(req.params.songId, 10);

        const result = await req.app.locals.songsCollection.findOneAndDelete({ simpleId: songId });

        if (!result) 
        {
            return res.status(404).json({ message: "Song not found" });
        }

        // Remove the song from all playlists
        const updateResult = await req.app.locals.playlistsCollection.updateMany(
            { songs: songId }, // Find playlists that include the song
            { $pull: { songs: songId } } // Remove the song from the songs array
        );

        if (updateResult.modifiedCount > 0) 
        {
            console.log(`Song with simpleId: ${songId} removed from ${updateResult.modifiedCount} playlist(s).`);
        }

        // res.status(200).json({ message: "Song deleted successfully" });

        res.status(200).json({ 
            message: "Song deleted successfully", 
            playlistsUpdated: updateResult.modifiedCount
        });
    } 
    catch (error) 
    {
        console.error('Error deleting song:', error);

        res.status(500).json({
            message: 'Error deleting song',
            error: error.message,
        });
    }
});

//Delete my profile (and all of my playlists as well)
router.delete('/profiles/:simpleId', async (req, res) => {

    const simpleId = parseInt(req.params.simpleId, 10);

    try 
    {
        // First, delete the playlists associated with the simpleId
        await req.app.locals.playlistsCollection.deleteMany({ ownerId: simpleId });

        // Then, delete the profile
        const result = await req.app.locals.profilesCollection.findOneAndDelete({ simpleId });

        if (!result) 
        {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ message: "Profile and associated playlists deleted successfully" });
    } 
    catch (error) 
    {
        console.error('Error deleting profile and playlists:', error);

        res.status(500).json({
            message: 'Error deleting profile and playlists',
            error: error.message,
        });
    }
});

//delete specific playlist of my profile
router.delete('/deletePlaylist/:simpleId/:ownerSimpleId', async (req, res) => {

    try 
    {
        const playlistsCollection = req.app.locals.playlistsCollection;
        const profilesCollection = req.app.locals.profilesCollection;

        const { simpleId, ownerSimpleId } = req.params;

        // Find the playlist by simpleId
        const playlist = await playlistsCollection.findOne({ simpleId: parseInt(simpleId) });

        // If the playlist does not exist
        if (!playlist) 
        {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        // Check if the ownerSimpleId matches the playlist's ownerId
        if (playlist.ownerId !== parseInt(ownerSimpleId)) 
        {
            return res.status(403).json({ message: 'You can only delete your own playlists' });
        }

        // Delete the playlist from the playlistsCollection
        const deleteResult = await playlistsCollection.deleteOne({ simpleId: parseInt(simpleId) });

        if (deleteResult.deletedCount === 1) 
        {
            // Update the owner's profile to remove the deleted playlist's simpleId
            const updateResult = await profilesCollection.updateOne(
                { simpleId: parseInt(ownerSimpleId) }, // Match profile by simpleId
                { $pull: { playlists: parseInt(simpleId) } } // Remove the playlist's simpleId from the profile
            );

            if (updateResult.modifiedCount === 1) 
            {
                return res.status(200).json({ message: 'Playlist deleted successfully' });
            } 
            else 
            {
                return res.status(200).json({ message: 'Playlist deleted, but owner\'s profile was not updated' });
            }
        } 
        else 
        {
            throw new Error('Failed to delete playlist');
        }
    } 
    catch (error) 
    {
        console.error('Error deleting playlist:', error);

        res.status(500).json({ message: 'Error deleting playlist', error: error.message });
    }
});

//add song to playlist
router.put('/addSongsToPlaylist/:playlistId/:ownerId', async (req, res) => {
    try {
        const playlistsCollection = req.app.locals.playlistsCollection;
        const profilesCollection = req.app.locals.profilesCollection;
        const { songIds } = req.body; // songIds should be an array of song IDs
        const { playlistId, ownerId } = req.params; // playlistId and ownerId come from URL parameters

        // Check if the playlist exists
        const playlist = await playlistsCollection.findOne({ simpleId: parseInt(playlistId) });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        // Check if the user is the owner of the playlist
        if (playlist.ownerId !== parseInt(ownerId)) {
            return res.status(403).json({ message: 'You can only modify your own playlists' });
        }

        // Ensure songIds array is provided and not empty
        if (!Array.isArray(songIds) || songIds.length === 0) {
            return res.status(400).json({ message: 'Missing required songIds array' });
        }

        // Filter out any songs that are already in the playlist
        const newSongIds = songIds
            .map(id => parseInt(id)) // Ensure IDs are integers
            .filter(songId => !playlist.songs.includes(songId));

        if (newSongIds.length === 0) {
            return res.status(200).json({ message: 'All selected songs are already in the playlist' });
        }

        // Add the new songs to the playlist's songs array
        const updateResult = await playlistsCollection.updateOne(
            { simpleId: parseInt(playlistId) }, 
            { $addToSet: { songs: { $each: newSongIds } } } // $each allows adding multiple items to $addToSet
        );

        if (updateResult.modifiedCount === 1) {
            res.status(200).json({ message: 'Songs added to playlist successfully' });
        } else {
            throw new Error('Failed to add songs to playlist');
        }

    } catch (error) {
        console.error('Error adding songs to playlist:', error);
        res.status(500).json({ message: 'Error adding songs to playlist', error: error.message });
    }
});

//edit a playlist
router.put('/playlists/:id', async (req, res) => {

    const { id } = req.params;
    const updates = req.body; // Capture the updates from the request body

    // Prepare the update object
    const updateData = {};

    // Check for the fields in the request body and add them to updateData
    if (updates.name) updateData.name = updates.name;
    if (updates.picture) updateData.picture = updates.picture;
    if (updates.genre) updateData.genre = updates.genre;
    if (updates.category) updateData.category = updates.category;
    if (updates.hashtags) updateData.hashtags = updates.hashtags;
    if (updates.description) updateData.description = updates.description;

    // If no fields are provided for update, respond with an error
    if (Object.keys(updateData).length === 0) 
    {
        return res.status(400).json({ message: 'No fields to update' });
    }

    try 
    {
        const playlistsCollection = req.app.locals.playlistsCollection;

        // Attempt to find and update the playlist in the database
        const result = await playlistsCollection.updateOne(
            { simpleId: parseInt(id) },
            {
                $set: updateData // Use the dynamically created updateData object
            }
        );

        if (result.matchedCount === 0) 
        {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json({ message: 'Playlist updated successfully' });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the playlist' });
    }
});

//Add Comment to a playlist
router.post('/playlists/:id/addComment', async (req, res) => {

    const { id } = req.params; // Get the playlist ID from the URL parameters
    const { author, content } = req.body; // Get the author and content from the request body

    // Validation to ensure author and content are provided
    if (!author || !content) 
    {
        return res.status(400).json({ message: 'Author and content are required' });
    }

    try 
    {
        const playlistsCollection = req.app.locals.playlistsCollection;

        // Attempt to find and update the playlist in the database
        const result = await playlistsCollection.updateOne(
            { simpleId: parseInt(id) }, // Find the playlist by simpleId
            {
                $push: {
                    comments: { author, content } // Push the new comment to the comments array
                }
            }
        );

        if (result.matchedCount === 0) 
        {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json({ message: 'Comment added successfully' });
    } 
    catch (error) 
    {
        console.error(error);

        res.status(500).json({ message: 'An error occurred while adding the comment' });
    }
});

//get specific song
router.get('/songs/:simpleId', async (req, res) => {
    const simpleId = parseInt(req.params.simpleId);
  
    try {
      const song = await req.app.locals.songsCollection.findOne({ simpleId });
      if (song) {
        res.json(song);
      } else {
        res.status(404).json({ message: 'Song not found' });
      }
    } catch (error) {
      console.error('Error fetching song:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

export default router;