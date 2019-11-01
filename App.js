/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component, createRef} from 'react';
import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';
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
    const vp = this.videoPlayer.current;
    const {isFullscreen} = this.state;
    if (vp && !isFullscreen) {
      this.setState({isFullscreen: true}, () => {
        console.log('Should present full screen.');
        vp.presentFullscreenPlayer();
      });
    }

    if (vp && isFullscreen) {
      this.setState({isFullscreen: false}, () => {
        console.log('Should dismiss full screen.');
        vp.dismissFullscreenPlayer();
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
      <Fragment>
        <SafeAreaView>
          <Video
            // Toggle controls value for varying issues.
            controls={false}
            source={videoMP4Remote}
            ref={this.videoPlayer}
            onBuffer={this.onBuffer}
            onError={this.onError}
            style={styles.video}
            paused={false}
            repeat={true}
          />
        </SafeAreaView>
      </Fragment>
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
