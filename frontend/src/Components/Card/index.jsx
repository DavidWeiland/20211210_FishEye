import React from 'react'
import PropTypes from 'prop-types'
import DefaultPicture from '../../Assets/Icons/user-circle.svg'
import styled from 'styled-components'
import TagsComponent from '../TagsComponent'

const VignetContainer = styled.article`
  margin: 1%;
`
const Vignet = styled.a`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: auto;
  margin:1%;
  text-decoration: none;
  box-sizing: border-box;
  padding:2%;
`
const VignetPhoto = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 100%;
  background: #C4C4C4;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
`
const VignetTitle = styled.h2`
  font-size: 36px;
  margin:0;
  margin-top: 20px;
  color:#D3573C;
  text-align: center;
`
const VignetCity = styled.p`
  margin:0;
  font-size: 13px;
  color:#901C1C;
  text-align: center;
`

const VignetTagline = styled.p`
  margin:0;
  font-size: 11px;
  color:#000000;
  text-align: center;
`

const VignetPrice = styled.p`
  margin:0;
  font-size: 11px;
  color:#757575;
  text-align: center;
`

function Card({ id, name, city, country, tags, tagline, price, portraitUrl }) {
  return (
    <VignetContainer>
      <Vignet tabIndex="0" role='link' aria-label={name} data-cible="i" id={id} href={`/profile/${id}`}>
        <VignetPhoto src={portraitUrl} alt='' />
        <VignetTitle>
          {name}
        </VignetTitle>
        <VignetCity>
              {city}, {country}
        </VignetCity>
        <VignetTagline>
              {tagline}
        </VignetTagline>
        <VignetPrice>
              {price} €/jour,  
        </VignetPrice>
        <TagsComponent tags={tags}/>
      </Vignet>
    </VignetContainer>
  )
}

Card.propTypes = {
  portraitUrl: PropTypes.string.isRequired,
  name : PropTypes.string.isRequired
}

Card.defaultProps = {
  portraitUrl: DefaultPicture,
  name : ''
}

export default Card

