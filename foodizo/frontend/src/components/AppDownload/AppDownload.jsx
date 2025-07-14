import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';
import Typewriter from 'typewriter-effect';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p className="h2-style">
        <Typewriter
          options={{
            strings: ['For Better Experience Download<br /><span class="tomato-text">FoodIzo App</span>'], // Use <br /> for line break
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 30,
            cursor: '', // Disable the cursor
          }}
        />
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="Play Store" />
        <img src={assets.app_store} alt="App Store" />
      </div>
    </div>
  );
};

export default AppDownload;