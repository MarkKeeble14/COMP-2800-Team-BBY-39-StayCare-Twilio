import React, { useState } from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../components/js/firebase.js"
import "../components/css/main.css"
import "../components/css/room.css"
import "../components/css/start-form.css"
import CustomQueryString from "../components/custom-query-string"
import SignedUpFor from "../components/signed-up-for"
import Video from "../components/video"

import { roomname } from "../components/video"

const JoinRoomForm = ({storeToken}) => {
  const [name, setName] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    console.log("Room: " + roomname);
    if (roomname != '') {
        const result = await axios({
            method: 'POST',
            url: 'https://puce-bobcat-5743.twil.io/-token',
            data: {
                identity: name
            },
        })
    
          const jwt = result.data;
          storeToken(jwt);
          console.log(jwt);
    }
  }

  return (
      <form id="start-form" onSubmit={handleSubmit}>
          <label htmlFor="name">
              Display Name: <br/>
              <input type='text' id="display-name" name="name" value = {name} onChange={e => setName(e.target.value)}/>
          </label>
          <br/>
          <button type="submit" id="join"></button>
      </form>
  )
}

const RoomPage = () => {
  const [token, setToken] = useState(false)
  
  return (
    <Layout>
      <SEO title="StayCare | Home"/>
      <SignedUpFor></SignedUpFor>
      <CustomQueryString></CustomQueryString>
      {!token ? <JoinRoomForm storeToken={setToken} /> : <Video token={token} id="video"/>}
    </Layout>
  )
}

export default RoomPage