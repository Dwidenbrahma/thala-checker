import React, { useState } from "react";
import "./css/App.css";
import Video1 from "./video/dhoni.mp4";
import Video2 from "./video/thala2.mp4";
import Video3 from "./video/thala3.mp4";
import ThalaImage from "./ms.png";
import GifImage1 from "./gif1.gif";
import GifImage2 from "./gif2.gif";
import GifImage3 from "./gif3.gif";

// Function to check if the input matches the criteria for "Thala"
function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Function to check if the input is "Thala" or has a numeric representation equal to 7
function checkThala(words) {
  if (
    words.length === 7 ||
    words.toLowerCase() === "thala" ||
    words.toLowerCase() === "dhoni" ||
    words === "7"
  ) {
    return true;
  } else if (isNumber(words)) {
    let result = words.split().map(Number);
    let sum = 0;
    for (let i = 0; i < words.length; i++) {
      sum += result[i];
    }

    if (sum === 7) {
      return true;
    }
  }
}

// VideoPlayer component to display a random video
const VideoPlayer = ({ onEnded }) => {
  const videoSources = [Video1, Video2, Video3];
  const randomInteger = Math.floor(Math.random() * videoSources.length);

  return (
    <video controls autoPlay width="600" height="400" onEnded={onEnded}>
      <source src={videoSources[randomInteger]} type="video/mp4" />
    </video>
  );
};

// Main App component
function App() {
  const [inputWord, setThala] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(false);

  // Input change handler
  const handleChange = (event) => {
    setThala(event.target.value);
  };

  // Button click handler
  const handleClick = () => {
    setLoading(true); // Set loading to true when checking starts

    // Simulating an asynchronous operation (e.g., API call)
    setTimeout(() => {
      let check = checkThala(inputWord);

      if (check === true) {
        setShowVideo(true);
      }

      setLoading(false); // Set loading to false when checking is complete
    }, 2000); // Simulating a 2-second delay, adjust as needed
  };

  // Video end handler
  const handleVideoEnd = () => {
    setTimeout(() => {
      setShowVideo(false);
    }, 3000);
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <div className="check">
            <h1>Checking...............🙂</h1>
          </div>
        ) : showVideo ? (
          <div className="Play-video">
            <h1 className="animate-charcter">Yeh ! It's Thala</h1>
            <VideoPlayer onEnded={handleVideoEnd} />
            <img className="image1" src={GifImage1} alt="image1" />
            <img className="image2" src={GifImage2} alt="image2" />
            <img className="image3" src={GifImage3} alt="image3" />
          </div>
        ) : (
          <div className="App">
            <img src={ThalaImage} alt="thala/png" />
            <h1>Thala for reason</h1>
            <input type="text" value={inputWord} onChange={handleChange} />
            <button onClick={handleClick}>check</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
