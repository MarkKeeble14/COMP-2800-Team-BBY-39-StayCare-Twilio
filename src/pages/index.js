import React, { useState, useEffect, useRef } from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"

let TwilioVideo = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  TwilioVideo = require('twilio-video');
  console.log(TwilioVideo);
}



const StartForm = ({storeToken}) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    const result = await axios({
        method: 'POST',
        url: 'https://puce-bobcat-5743.twil.io/-token',
        data: {
            identity: name,
        },
    })

      const jwt = result.data;
      storeToken(jwt);
  }
    
  return (
      <form onSubmit={handleSubmit}>
          <label htmlFor="name">
              DisplayName: <br/>
              <input type='text' id="name" name="name" value = {name} onChange={e => setName(e.target.value)}/>
          </label>
          <br/>
          <label htmlFor="room">
              Room To Join: <br/>
              <input type='text' id="room" name="room" value = {room} onChange={e => setRoom(e.target.value)}/>
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

              remoteVidRef.appendChild(track.attach());
            } 
          }) 
          participant.on('trackSubscribed', track => {
            remoteVidRef.appendChild(track.attach());
          })
        }

        // Attaching the other peoples videos
        room.participants.forEach(addParticipant)
        room.on('participantConnected', addParticipant)
      }
    )
  }, [token])

  return  (
      <div>
          <div ref={localVidRef}/>
          <div ref={remoteVidRef}/>
      </div>
  )
}

const IndexPage = () => {
  const [token, setToken] = useState(false)
  return (
  <Layout>
    <SEO title="Home" />
    {!token ? <StartForm storeToken={setToken} /> : <Video token={token}/>}
    <p> TODO: FUCKKK </p>
  </Layout>
  )
}

export default IndexPage
