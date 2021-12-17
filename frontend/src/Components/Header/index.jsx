import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Utils/selectors'
import logo from '../../Assets/Images/logo.svg'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledBanner = styled.div`
    position:relative;
    top:0;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    z-index:1;
`

const StyledLogo = styled.img`
    width: 200px;
    height: 50px;
    color:transparent;
    cursor: pointer;
    z-index:10;
`

const IconBanner = styled.i`
    font-size: 30px;
    color:#901C1C;
    cursor: pointer;
    z-index:10;
`

export default function Header() {

  const userId = useSelector(selectUser).data?.userId

  return (
    <StyledBanner>
      <Link to='/' id='logo'>
        <StyledLogo src={logo} alt='logo-fisheye'/>
      </Link>
      {(userId) ? (
        <Link to='/'>
          <IconBanner className='fa fa-sign-out'/>
        </Link>
      ) : (
        <Link to='/login'>
          <IconBanner className='fa fa-user-circle'/>
        </Link>
      )}
    </StyledBanner>
  )
}
