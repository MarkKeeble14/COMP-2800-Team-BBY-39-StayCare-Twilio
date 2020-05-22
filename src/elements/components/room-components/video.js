import React, { useEffect, useRef } from "react"
import $ from "jquery"
import { query } from "../used-across-pages-components/query-string"

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

    useEffect(() => {
      // Connect to twilio using the token and the current keyed roomname
        TwilioVideo.connect(token, { video: true, audio: true, name: roomname }).then(
          room => {
        console.log("Joining: " + roomname);
          // Attach local video
          TwilioVideo.createLocalVideoTrack().then(track => {
            localVidRef.current.appendChild(track.attach())
          })  
  
          // Adds a participant
          const addParticipant = participant => {
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
  
          // Toggling muting and unmuting audio
          function unmute_mute_audio() {
            var localParticipant = room.localParticipant;
            localParticipant.audioTracks.forEach(function(track) {
              if ( track.track.isEnabled === true ) {
                  console.log("disabling audio track");
                  track.track.disable();
                  $("#mute-audio").css("background", "red");
              } else {
                  console.log("enabling audio track");
                  track.track.enable();
                  $("#mute-audio").css("background", "lime");
              }
              });
            }
  
            // Toggling pausing and unpausing video
            function unmute_mute_video() {
              var localParticipant = room.localParticipant;
              localParticipant.videoTracks.forEach(function(track) {
                if ( track.track.isEnabled === true ) {
                    console.log("disabling video track");
                    track.track.disable();
                    $("#mute-video").css("background", "red");
                } else {
                    console.log("enabling video track");
                    track.track.enable();
                    $("#mute-video").css("background", "lime");
                }
                });
              }
  
            // Add event listener for video toggle
            $('#mute-video').on('click', event => {
              unmute_mute_video();
            })
  
            // Add event listener for audio toggle
            $('#mute-audio').on('click', event => {
              unmute_mute_audio();
            })
  
            // Add event listener for leaving room
            $('#disconnect').on('click', event => {
              room.disconnect();
              window.location.replace('../room');
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
            <div id="controls">
                <input type="button" id="mute-video" value="Video On/Off"/>
                <input type="button" id="mute-audio" value="Mute/Unmute"/>
                <input type="button" id="disconnect" value="Leave"/>
            </div>
            
            <div id="room-info">
                <h2 className="room-activity" id="activityName"></h2>
            </div>
            <div id="stream-container" className="config-one" ref={streamCont}>
                <div id="local" ref={localVidRef}/>
                <div id="remote" ref={remoteVidRef}><div id="giveSpace"></div></div>
            </div>
        </div>
    )
}

export default Video;