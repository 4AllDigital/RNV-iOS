/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component, createRef} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Video from 'react-native-video';

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

  toggleFullScreen = () => {
    const vp = this.videoPlayer.current;
    const {isFullscreen} = this.state;
    if (vp && !isFullscreen) {
      this.setState({isFullscreen: true}, () => {
        vp.presentFullscreenPlayer();
      });
    }

    if (vp && isFullscreen) {
      this.setState({isFullscreen: false}, () => {
        vp.dismissFullscreenPlayer();
      });
    }
  };

  render() {
    return (
      <Fragment>
        <SafeAreaView>
          <Video
            controls={true}
            //source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
            source={require('./assets/oceans.mp4')}
            ref={this.videoPlayer}
            onBuffer={this.onBuffer}
            onError={this.videoError}
            style={styles.video}
            paused={false}
            fullscreen={true}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    width: 650,
    height: 350,
  },
});

export default App;
