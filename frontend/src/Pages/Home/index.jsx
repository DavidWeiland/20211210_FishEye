import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const AppWrapper = styled.div`
  margin: auto;
  height: 100vh;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

function Home() {
  return (
    <AppWrapper>
      <Link to="/login">Connect me</Link>
      <h1> HOME </h1>
    </AppWrapper>
  )
}

export default Home;
