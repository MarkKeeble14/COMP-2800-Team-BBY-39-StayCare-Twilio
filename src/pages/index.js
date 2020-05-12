import React, { useState, useEffect, useRef } from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"
import $ from "jquery"

import "../components/js/firebase.js"
import "../components/css/main.css"
import "../components/css/room.css"
import "../components/css/start-form.css"
import BlurArea from "../components/blur_area"
import SignupActivity from "../components/signup_for_activity"
import PostForm from "../components/post_form"
// import * as postFunctions from '../components/js/post'

let TwilioVideo = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  TwilioVideo = require('twilio-video');
}

// Holds the rooms name at the time of form submission
let roomname;
const JoinRoomForm = ({storeToken}) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    console.log(name + ", " + room);
    roomname = room;

    const result = await axios({
        method: 'POST',
        url: 'https://puce-bobcat-5743.twil.io/-token',
        data: {
            identity: name,
            roomname: room,
        },
    })

      const jwt = result.data;
      storeToken(jwt);
      console.log(jwt);
  }
    
  return (
      <form id="start-form" onSubmit={handleSubmit}>
          <label htmlFor="name">
              Display Name: <br/>
              <input type='text' id="display-name" name="name" value = {name} onChange={e => setName(e.target.value)}/>
          </label>
          <br/>
          <label htmlFor="room">
              Room To Join: <br/>
              <input type='text' id="room-to-join" name="room" value = {room} onChange={e => setRoom(e.target.value)}/>
          </label>
          <br/>
          <button type="submit">Join Video Chat</button>
      </form>
  )
}

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
  let activeRoom;
  useEffect(() => {
    // Can put code here to set database info on room -------------------
    console.log("Joined " + roomname);
      TwilioVideo.connect(token, { video: true, audio: true, name: roomname }).then(
        room => {
          activeRoom = room;
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
      }
    )
  }, [token])

// Move these to a seperate file eventually
function muteVideo(){
  var localParticipant = activeRoom.localParticipant;
  localParticipant.videoTracks.forEach(function (videoTracks) {
      videoTracks.track.disable();

  });
}

function unMuteVideo(){
  var localParticipant = activeRoom.localParticipant;
  localParticipant.videoTracks.forEach(function (videoTracks) {
      videoTracks.track.enable();
  });
}

function unMuteAudio(){
  var localParticipant = activeRoom.localParticipant;
  localParticipant.audioTracks.forEach(function (audioTrack) {
      audioTrack.track.enable();
  });
}

function muteAudio(){
  var localParticipant = activeRoom.localParticipant;
  localParticipant.audioTracks.forEach(function (audioTrack) {
      audioTrack.track.disable();
  });
}

  return  (
      <div className="content">
          <button onClick={switchDisplay}>Swap Config</button>
          <div id="room-info">
              <h1 className="room-name">Room Name</h1>
              <h3 className="room-activity">Room Activity</h3>
          </div>
          <div id="stream-container" className="config-one" ref={streamCont}>
              <div ref={localVidRef}/>
              <div ref={remoteVidRef}/>
              <div id="controls">
                <input type="button" onClick={muteAudio} value="muteA"></input>
                <input type="button" onClick={unMuteAudio} value="unmuteA"></input>
                <input type="button" onClick={muteVideo} value="muteV"></input>
                <input type="button" onClick={unMuteVideo} value="unmuteV"></input>
              </div>
          </div>
    </div>
  )
}

const IndexPage = () => {
  const [token, setToken] = useState(false)
  return (
    <Layout>
      <SEO title="StayCare | Home"/>
      <BlurArea></BlurArea>
      {!token ? <JoinRoomForm storeToken={setToken} /> : <Video token={token} id="video"/>}
      <SignupActivity></SignupActivity>
    </Layout>
  )
}

export default IndexPage
