import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup, login } from '../../Features/user'
import { useStore, useSelector } from 'react-redux'
import { selectUser } from '../../Utils/selectors'
import styled from 'styled-components'

const LoginWrapper = styled.div`
  margin:auto;
  margin-top: 3rem;
  width: 90%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
const FormWrapper = styled.div`
  margin: auto;
  height: 70%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ButtonWrapper = styled.div`
  margin: auto;
  height: 30%;
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
const Label = styled.label`
  font-size: 36px;
  color:#D3573C;
`
const StyledInput = styled.input`
  border-radius:15px 15px 15px 15px;
  border:solid 3px grey;
  width:60%;
  height:30px;
  font-size: 20px;
  color:rgba(0, 0, 0, 0.7);
  box-shadow: inset 0px 4px 12px rgba(0, 0, 0, 0.25);
  padding-left:15px;
  &:focus{
    background-color:rgba(0, 0, 0, 0.2);
    color:#901C1C;
    };
`
const StyledButton = styled.button`
background-color:#D3573C;
  margin-left:70px;
  margin-right:70px;
  width:70px;
  height:70px;
  border-radius:100%;
  border: 0;
  box-shadow:0px 4px 12px rgba(0, 0, 0, 0.25);
  box-shadow:inset -2px -4px 12px rgba(0, 0, 0, 0.5), inset 2px 4px 12px rgba(255, 255, 255, 0.5);
`
const Icon = styled.i`
 color:rgba(0, 0, 0, 0.8);
 font-size:40px;
`

function LoginPage() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  
  const store = useStore()
  const navigate = useNavigate()

  const userStatus = useSelector(selectUser).status
  const userId = useSelector(selectUser).data?.userId
  
  const body = { email, password }
  
  function connect() {
    login(store, body)
  }

  function create() {
    signup(store, body)
  }

  if (userStatus === 'resolved') {
    if (userId) {
      navigate('/profile')
    } else {
      login(store, body)
      navigate('/new_photographer')
    }
  }

  return (
    <LoginWrapper>
      <FormWrapper>
        <InputWrapper>
          <Label htmlFor="email">Email</Label>
          <StyledInput
            type="text"
            id="email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">Password</Label>
          <StyledInput
            type="password"
            id="password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
      </FormWrapper>
      <ButtonWrapper>
      <StyledButton className="signup" onClick={connect}>
        <Icon className='fa fa-check'/>
      </StyledButton>
      <StyledButton className="signup" onClick={create}>
        <Icon className='fa fa-user-plus'/>
      </StyledButton>
      </ButtonWrapper>
    </LoginWrapper>
  )
}

export default LoginPage
