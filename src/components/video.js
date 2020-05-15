import React, { useEffect, useRef } from "react"
import $ from "jquery"
import { query } from "./custom-query-string"

// Twilio
let TwilioVideo = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  TwilioVideo = require('twilio-video');
}

// Room Name
let roomname = null;
setInterval(function() {
    roomname = query;
    if (roomname != null) {
        $('#join').text('Join: ' + roomname);
    }
}, 10);
export { roomname }

const Video = ({token}) => {
    const localVidRef = useRef(null);
    const remoteVidRef = useRef(null);
    const streamCont = useRef(null);

    // Move these to a seperate file eventually
    function switchDisplay() {
        var classes = streamCont.current.classList;
        if (classes.contains('config-one')) {
            classes.add('config-two');
            classes.remove('config-one');
        }
        else if (classes.contains('config-two')) {
            classes.add('config-three');
            classes.remove('config-two');
        }
        else if (classes.contains('config-three')) {
            classes.add('config-four');
            classes.remove('config-three');
        }
        else if (classes.contains('config-four')) {
            classes.add('config-one');
            classes.remove('config-four');
        }
    }
  
    useEffect(() => {
      // Can put code here to set database info on room -------------------
        TwilioVideo.connect(token, { video: true, audio: true, name: roomname }).then(
          room => {
        console.log(roomname);
          // Attach local video
          TwilioVideo.createLocalVideoTrack().then(track => {
            localVidRef.current.appendChild(track.attach())
          })  
  
          const addParticipant = participant => {
            console.log("New Participant: " + participant.identity);
            participant.tracks.forEach(publication => {
              if (publication.isSubscribed) {
                const track = publication.track;
  
                remoteVidRef.current.appendChild(track.attach());
              } 
            }) 
            participant.on('trackSubscribed', track => {
              remoteVidRef.current.appendChild(track.attach());
            })
          }
  
          // Attaching the other peoples videos
          room.participants.forEach(addParticipant)
          room.on('participantConnected', addParticipant)
  
          function unmute_mute_audio() {
            var localParticipant = room.localParticipant;
            localParticipant.audioTracks.forEach(function(track) {
              if ( track.track.isEnabled === true ) {
                    console.log("disabling audio track");
                    track.track.disable();
              } else {
                  console.log("enabling audio track");
                  track.track.enable();
              }
              });
            }
  
            function unmute_mute_video() {
              var localParticipant = room.localParticipant;
              localParticipant.videoTracks.forEach(function(track) {
                if ( track.track.isEnabled === true ) {
                      console.log("disabling video track");
                      track.track.disable();
                } else {
                    console.log("enabling video track");
                    track.track.enable();
                }
                });
              }
  
            // Add event listener
            $('#mute-video').on('click', event => {
              unmute_mute_video();
            })
  
            $('#mute-audio').on('click', event => {
              unmute_mute_audio();
            })
  
            $('#disconnect').on('click', event => {
              console.log('tried to leave');
              room.disconnect();
            });
  
            $('#swap-config').on('click', event => {
              switchDisplay();
            });
  
            // Disconnect
            room.on('disconnected', room => {
              console.log(room.localParticipant.identity + ' left');
              // Detach the local media elements
                room.localParticipant.tracks.forEach(publication => {
                  publication.track.stop();
                  const attachedElements = publication.track.detach();
                  console.log("unsubscribed from: " + publication.track)
                  attachedElements.forEach(element => element.remove());
              });
          });
        }
      )
    }, [token])

    return  (
        <div className="content">
            <input type="button" id="mute-video" value="Video"/>
            <input type="button" id="mute-audio" value="Audio"/>
            <input type="button" id="swap-config" value="Swap"/>
            <input type="button" id="disconnect" value="Leave"/>
            <div id="room-info">
                <h1 className="room-name">Room Name</h1>
                <h3 className="room-activity">Room Activity</h3>
            </div>
            <div id="stream-container" className="config-one" ref={streamCont}>
                <div ref={localVidRef}/>
                <div ref={remoteVidRef}/>
            </div>
      </div>
    )
}

export default Video;