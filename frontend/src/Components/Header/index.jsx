import React from 'react'
import { useSelector, useStore } from 'react-redux'
import { selectPhotographer, selectUser } from '../../Utils/selectors'
import logo from '../../Assets/Images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { resetUser } from '../../Features/user'
import { resetPhotographer } from '../../Features/photographer'

const StyledBanner = styled.div`
    width: 100%;
    height: 130px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
`
const StyledDivConnect = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    z-index:20;
`
const StyledDivLogo = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
`

const StyledLogo = styled.img`
    width: 200px;
    height: 50px;
    color:transparent;
    cursor: pointer;
    z-index:10;
`

const IconBanner = styled.i`
    margin:15px;
    font-size: 25px;
    color:#901C1C;
    cursor: pointer;
`

export default function Header() {
  const store = useStore()
  const navigate = useNavigate()

  const userId = useSelector(selectUser).data?.userId
  const name = useSelector(selectPhotographer).data?.name

  const reseting = () => {
    resetPhotographer(store)
    resetUser(store)
    navigate('/')
  }

  return (
    <StyledBanner>
      <StyledDivConnect data-testid="TestConnect">
        {(userId) ? (
          <StyledDivConnect>
            <span>{name} </span>
            <div onClick={reseting}>
              <IconBanner className='fa fa-sign-out'/>
            </div>
          </StyledDivConnect>
        ) : (
          <StyledDivConnect>
            <span>Se connecter </span>
            <Link to='/login'>
                <IconBanner className='fa fa-user-circle'/>
            </Link>
          </StyledDivConnect>
        )}
      </StyledDivConnect>
      <StyledDivLogo>
        <Link to='/' id='logo'>
          <StyledLogo src={logo} alt='logo-fisheye'/>
        </Link>
      </StyledDivLogo>
    </StyledBanner>
  )
}
