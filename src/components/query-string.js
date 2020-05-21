// customQueryStringComponent.js
import React from "react"
import PropTypes from "prop-types"
import withLocation from "./with-location"
let query;

// This component is used to access queries inside of the url
const CustomQueryStringComponent = ({ search }) => {
  const { room } = search;
  query = room ;
  return <></>
}

CustomQueryStringComponent.propTypes = {
  search: PropTypes.object,
}

export default withLocation(CustomQueryStringComponent)

// this variable can be accessed from other files and read.
export { query };