// customQueryStringComponent.js

import React from "react"
import PropTypes from "prop-types"
import withLocation from "./with-location"
let query;
export { query };

const CustomQueryStringComponent = ({ search }) => {
  const { room } = search;
  query = room ;
  return <></>
}

CustomQueryStringComponent.propTypes = {
  search: PropTypes.object,
}

export default withLocation(CustomQueryStringComponent)