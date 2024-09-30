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
        ); //.select('-password'); // Exclude password

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

export default router;