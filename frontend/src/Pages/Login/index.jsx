import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup, login } from '../../Features/user'
import { useStore } from 'react-redux'
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
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`

const StyledInput = styled.input`
  width:100%
`

const ButtonWrapper = styled.div`
  margin: auto;
  height: 30%;
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const store = useStore()
  const navigate = useNavigate()
  

  const create = () => {
    const body = { email, password }
    signup(store, body)
  }

  const connect = () => {
    const body = { email, password }
    login(store, body)
    setEmail('')
    setPassword('')
    navigate('/profile')
  }

  return (
    <LoginWrapper>
      <FormWrapper>
        <InputWrapper>
          <label htmlFor="email">Username</label>
          <StyledInput
            type="text"
            id="email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="password">Password</label>
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
      <button className="signup" onClick={connect}>
        Connection
      </button>
      <button className="signup" onClick={create}>
        New user
      </button>
      </ButtonWrapper>
    </LoginWrapper>
  )
}

export default LoginPage
