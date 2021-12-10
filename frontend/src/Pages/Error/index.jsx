import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ErrorWrapper = styled.div`
  margin: auto;
  height:100vh;
  width:80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content : center;
`

const ErrorTitle = styled.h1`
  color: #000000;
  font-size:1000%;
  font-weight: 900;
`

const ErrorSubtitle = styled.h2`
  color: #000000;
  font-weight: 300;
`

function Error(props) {
  
  return (
    <ErrorWrapper>
      <Link to='/'>Go Home</Link>
      <ErrorTitle>404</ErrorTitle>
      <ErrorSubtitle>
        Oups...
      </ErrorSubtitle>
      <ErrorSubtitle>
        Il semblerait que la page que vous cherchez n’existe pas
      </ErrorSubtitle>
    </ErrorWrapper>
  )
}


export default Error

