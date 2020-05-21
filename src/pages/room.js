import React, { useState } from "react"
import axios from "axios"

import Layout from "../components/layout-no-nav"
import SEO from "../components/seo"
import $ from "jquery"
import "../components/js/firebase.js"
import "../components/css/main.css"
import "../components/css/room.css"
import "../components/css/start-form.css"
import CustomQueryString from "../components/query-string"
import SignedUpFor from "../components/my-activities"
import Video from "../components/video"
import NAV from "../components/nav"
import SearchResults from "../components/search-results"

import { roomname } from "../components/video"

const JoinRoomForm = ({storeToken}) => {
  const [name, setName] = useState('')

  const handleSubmit = async event => {
    event.preventDefault();

    console.log(name + " tried to join room: " + roomname);
    if (roomname !== '' && roomname !== null & roomname !== undefined && name !== '') {
      $('#signed-up-for').addClass('inactive');
      $('#signed-up-for').removeClass('active');

        const result = await axios({
            method: 'POST',
            url: 'https://puce-bobcat-5743.twil.io/-token',
            data: {
                identity: name
            },
        })
    
          const jwt = result.data;
          storeToken(jwt);
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
      <SEO title="Rooms"/>
      <CustomQueryString></CustomQueryString>
      
      {
        !token ? 
          <>
          <div id="gradient">
            <NAV></NAV>
            <SearchResults/>
            <SignedUpFor/>
          </div>
          <JoinRoomForm storeToken={setToken} /> 
          </>
        : <Video token={token} id="video"/>
      }
    </Layout>
  )
}

export default RoomPage