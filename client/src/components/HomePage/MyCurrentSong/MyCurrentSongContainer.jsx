/* eslint-disable max-len, no-console */
import React from 'react';
import axios from 'axios';
import Countdown from 'react-countdown-clock';
import MySongModal from './MySongModal';
// import stylesheet from

class MyCurrentSongContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumArtworkLink: null,
      wait: false,
      waitTime: null,
    };
    this.setWait = this.setWait.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.albumArtworkLink || (prevProps.currentMySong.trackID !== this.props.currentMySong.trackID)) {
      if (this.props.currentMySong.trackID) {
        axios({
          method: 'GET',
          url: `/api/spotifyAPI/albumArtwork?trackID=${this.props.currentMySong.trackID}`,
        })
          .then((response) => {
            this.setState({
              albumArtworkLink: response.data[1].url,
            });
          })
          .catch(err => console.error(err, err));
      }
    }
  }

  setWait(makeWait, waitTime) {
    if (makeWait) {
      this.setState({ wait: true, waitTime });
    } else {
      this.setState({ wait: false });
    }
  }

  render() {
    return (
      <div>
        {/* <Segment attached="top" className='wrapper'> */}
          {this.state.albumArtworkLink &&
            <img src={this.state.albumArtworkLink} style={{ float: 'left', height: 150 }} alt="Album Artwork" />
          }
          <h1 style={{ textAlign: 'center' }}>
            Current My Song is : {this.props.currentMySong.trackSummary}
          </h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
            <div >
              <div style={{fontSize: '15px'}}>
                Note: {this.props.currentMySong.note}
              </div>
              <div style={{fontSize: '15px'}}>
                {this.state.wait && (`Wait time remaining: About ${this.state.waitTime} sec(s)`)}
              </div>
            </div>

          </div>
          <div>
            <MySongModal
              spotifyId={this.props.spotifyId}
              spotifyToken={this.props.spotifyToken}
              onMySongChange={this.props.onMySongChange}
              currentMySong={this.props.currentMySong}
              setWait={this.setWait}
            />

          </div>
        {/* </Segment> */}
      </div>
    );
  }
}

export default MyCurrentSongContainer;
