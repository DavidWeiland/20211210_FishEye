// transfert to component

import React from 'react'
import PropTypes from 'prop-types'
import DefaultPicture from ''//image: user.svg

function Card(props) {

  return (
    <div>
      
    </div>
  )
}

Card.propTypes = {
  picture: PropTypes.string.isRequired,
  name : PropTypes.string.isRequired
}

Card.defaultProps = {
  picture: DefaultPicture,
  name : ''
}

export default Card

