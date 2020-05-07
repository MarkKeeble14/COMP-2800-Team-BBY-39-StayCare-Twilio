import React, { useState, useEffect, useRef } from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../components/js/firebase_config"
import "../components/css/main.css"
import "../components/css/room.css"

let TwilioVideo = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  TwilioVideo = require('twilio-video');
}

const JoinRoomForm = ({storeToken}) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const handleSubmit = async event => {
    event.preventDefault()

    const result = await axios({
        method: 'POST',
        url: 'https://puce-bobcat-5743.twil.io/-token',
        data: {
            identity: name,
            room: room
        },
    })

      const jwt = result.data;
      storeToken(jwt);
      console.log(jwt);
  }
    
  return (
      <form onSubmit={handleSubmit}>
          <label htmlFor="name">
              DisplayName: <br/>
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
  const localVidRef = useRef(null)
  const remoteVidRef = useRef(null);
  
  useEffect(() => {
      TwilioVideo.connect(token, { video: true, audio: true, name: 'test' }).then(
        room => {
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

  return  (
      <div id="stream-container">
          <div ref={localVidRef}/>
          <div ref={remoteVidRef}/>
      </div>
  )
}

const IndexPage = () => {
  const [token, setToken] = useState(false)
  return (
    <Layout>
      <SEO title="StayCare | Home"/>
      {!token ? <JoinRoomForm storeToken={setToken} /> : <Video token={token}/>}
    </Layout>
  )
}

export default IndexPage
