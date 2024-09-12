// u21497682 - Michael Stone
import React from 'react';
// import { Link } from 'react-router-dom';
import Navigation from "../components/General/Navigation"
import SongFeed from '../components/Home/SongFeed';

const Home = () => {
  return (
    <div>
      <h1>Hello Home Page!</h1>
      <Navigation />
      <div>
        <SongFeed />
      </div>
    </div>
  );
};

export default Home;