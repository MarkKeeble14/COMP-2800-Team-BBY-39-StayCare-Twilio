import React, { useState } from "react"
import axios from "axios"
import $ from "jquery"
import Layout from "../elements/components/used-across-pages-components/layout-no-nav"
import SEO from "../elements/components/used-across-pages-components/seo"
import CustomQueryString from "../elements/components/used-across-pages-components/query-string"
import SignedUpFor from "../elements/components/room-components/my-activities"
import Video from "../elements/components/room-components/video"
import NAV from "../elements/components/used-across-pages-components/nav"
import SearchResults from "../elements/components/used-across-pages-components/search-results"
import "../elements/js/firebase.js"
import "../elements/css/main.css"
import "../elements/css/room.css"
import "../elements/css/start-form.css"
import { roomname } from "../elements/components/room-components/video"

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
        : 
          <div id="gradient">  
            <Video token={token} id="video"/>
          </div>
      }
    </Layout>
  )
}

export default RoomPage