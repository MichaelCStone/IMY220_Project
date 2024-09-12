// Michael Stone - u21497682
import React from "react";
import ReactDOM from "react-dom/client";
import AddSong from "./components/General/AddSong"; // Corrected case

class App extends React.Component 
{
  handleSaveSong = (song) => {
    console.log('Song added:', song);
    // Add your logic to save the song to a playlist or a database
  };

  render() 
  {
    return (
      <div>
        <h1>Music Playlist</h1>
        <AddSong onSave={this.handleSaveSong} />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);