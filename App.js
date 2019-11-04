/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, createRef} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';

const {width} = Dimensions.get('window');

class App extends Component {
  constructor(props) {
    super(props);

    this.videoPlayer = createRef();
    this.state = {
      isFullscreen: false,
    };
  }

  componentDidMount = () => {
    setInterval(this.toggleFullScreen, 10000);
  };

  onBuffer = e => {
    console.log(e);
  };

  onError = e => {
    console.log(e);
  };

  toggleFullScreen = () => {
    const {isFullscreen} = this.state;
    if (this.videoPlayer.current && !isFullscreen) {
      this.setState({isFullscreen: true}, () => {
        console.log('Should present full screen.');
        this.videoPlayer.current.presentFullscreenPlayer();
      });
    }

    if (this.videoPlayer.current && isFullscreen) {
      this.setState({isFullscreen: false}, () => {
        console.log('Should dismiss full screen.');
        this.videoPlayer.current.dismissFullscreenPlayer();
      });
    }
  };

  render() {
    // Example m3u8.
    const videoPlaylist = {
      isNetwork: true,
      uri:
        'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_adv_example_hevc/master.m3u8',
      type: 'm3u8',
    };

    // Example remote MP4.
    const videoMP4Remote = {
      isNetwork: true,
      uri:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    };

    // Example local MP4.
    const videoMP4Local = require('./assets/oceans.mp4');

    return (
      <>
        <Video
          // Toggle controls (true/false) value for varying issues.
          controls={false}
          source={videoPlaylist}
          ref={this.videoPlayer}
          onBuffer={this.onBuffer}
          onError={this.onError}
          style={styles.video}
          paused={false}
          repeat={true}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    width: width - 16,
    height: (width - 16) * (900 / 1600),
    margin: 8,
  },
});

export default App;
