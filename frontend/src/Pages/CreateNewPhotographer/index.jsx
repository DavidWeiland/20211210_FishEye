import { useState } from 'react'
import { createOnePhotographer} from '../../Features/photographer'
import { useStore, useSelector } from 'react-redux'
import { selectUser, selectPhotographer } from '../../Utils/selectors'
import styled from 'styled-components'
import '../../Utils/Styles/style.css'
import { Navigate } from 'react-router-dom'
import { login, signup } from '../../Features/user'

const Article = styled.article`
margin-bottom:20px;
border-radius:5px 5px 5px 5px;
`
const VignetPhoto = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 100%;
  background: #C4C4C4;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
`
const CreateInputWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap:nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`
const CreateStyledInputTitle = styled.input`
  margin:1%;
  margin-top: 20px;
  border:0;
  width:100%;
  height:40px;
  font-size: 36px;
  font-weight : bold;
  color:#D3573C;
  box-shadow: inset 0px 4px 12px rgba(0, 0, 0, 0.25);
  padding-left:5px;
  &:focus{
    background-color:rgba(0, 0, 0, 0.2);
    };
`
const CreateStyledInputCity = styled.input`
  margin:1%;
  border:0;
  width:100%;
  height:15px;
  font-size: 13px;
  font-weight : normal;
  color:#901C1C;
  box-shadow: inset 0px 4px 12px rgba(0, 0, 0, 0.25);
  padding-left:5px;
  &:focus{
    background-color:rgba(0, 0, 0, 0.2);
    };
`
const CreateStyledInputTagline = styled.input`
  margin:1%;
  border:0;
  width:100%;
  height:13px;
  font-size: 11px;
  font-weight : normal;
  color:#000000;
  box-shadow: inset 0px 4px 12px rgba(0, 0, 0, 0.25);
  padding-left:5px;
  &:focus{
    background-color:rgba(0, 0, 0, 0.2);
    };
`
const CreateStyledInput = styled.input`
  margin:1%;
  border:0;
  width:100%;
  height:auto;
  font-size: auto;
  font-weight : normal;
  color:#D3573C;
  padding-left:5px;
  &:focus{
    background-color:rgba(0, 0, 0, 0.2);
    };
`
const LoginWrapper = styled.div`
  margin:auto;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center
`
const FormWrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const ButtonWrapper = styled.div`
  margin: auto;
  height: auto;
  width: 33%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`
const InputWrapper = styled.div`
  width: 63%;
  display: flex;
  flex-direction: column;
  justify-content:center;
`
const ArticleTitle = styled.h1`
  margin:auto;
  width:100%;
  font-size: 15px;
  color:#901C1C;
  display:flex;
`

const StyledButton = styled.button`
  background-color:#901C1C;
  width:70px;
  height:70px;
  border-radius:100%;
  border: 0;
  box-shadow:0px 4px 12px rgba(0, 0, 0, 0.25);
  box-shadow:inset -2px -4px 12px rgba(0, 0, 0, 0.5), inset 2px 4px 12px rgba(255, 255, 255, 0.5);
`
const Icon = styled.i`
 color:rgba(255, 255, 255, 1);
 font-size:35px;
`

export default function CreatePhotographer() {
  const store = useStore()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const user = useSelector(selectUser)
  const userStatus = user.status
  const userId = user.data?.userId
  const token = user.data?.token

  const photographerStatus = useSelector(selectPhotographer).status

  const body = {email, password}

  const logeur = () => setTimeout(()=>
  login(store, body),
  1000
  )

  function signIn() {
    signup(store, body)
    logeur()
  }
  
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [tags, setTags] = useState([])
  const [tagline, setTagline] = useState('')
  const [price, setPrice] = useState('')
  const [ portraitUrl, setPortraitUrl ] = useState('')
  const [portraitShower, setPortraitShower] = useState('')

  
  const portrait = (tags.indexOf('portrait') >= 0) ? true : false
  const art = (tags.indexOf('art') >= 0) ? true : false
  const architecture = (tags.indexOf('architecture') >= 0) ? true : false
  const animals = (tags.indexOf('animals') >= 0) ? true : false
  const fashions = (tags.indexOf('fashions') >= 0) ? true : false
  const travel = (tags.indexOf('travel') >= 0) ? true : false
  const sport = (tags.indexOf('sport') >= 0) ? true : false
  const events = (tags.indexOf('events') >= 0) ? true : false

  const selectTag = (e) => {
    const value = e.target.id.toLowerCase()
    const newTags = [...tags]
    switch (value) {
      case 'portrait':
        if (portrait) {
          const index = newTags.indexOf(value)
          newTags.splice(index, 1)
        } else {
          newTags.push(value)
        }
        break
      case 'art':
        if (art) {
          const index = newTags.indexOf(value)
          newTags.splice(index, 1)
        } else {
          newTags.push(value)
        }
        break
      case 'fashions':
        if (fashions) {
          const index = newTags.indexOf(value)
          newTags.splice(index, 1)
        } else {
          newTags.push(value)
        }
        break
      case 'architecture':
        if (architecture) {
          const index = newTags.indexOf(value)
          newTags.splice(index, 1)
        } else {
          newTags.push(value)
        }
        break
      case 'travel':
        if (travel) {
          const index = newTags.indexOf(value)
          newTags.splice(index, 1)
        } else {
          newTags.push(value)
        }
        break
      case 'sport':
        if (sport) {
          const index = newTags.indexOf(value)
          newTags.splice(index, 1)
        } else {
          newTags.push(value)
        }
        break
      case 'animals':
        if (animals) {
          const index = newTags.indexOf(value)
          newTags.splice(index, 1)
        } else {
          newTags.push(value)
        }
        break
      case 'events':
        if (events) {
          const index = newTags.indexOf(value)
          newTags.splice(index, 1)
        } else {
          newTags.push(value)
        }
        break
      default:
        return
    }
    setTags(newTags)
  }

  const portraitReader = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const file = e.target.files[ 0 ]
    setPortraitUrl(file)
    const fileReader = new FileReader()
    fileReader.onload = function(progressEvent) {
      const url = fileReader.result
      setPortraitShower(url)
    }
    fileReader.readAsDataURL(file)
  }
  
  const create = () => {
    const PhotographerBody = {
      userId,
      name,
      city,
      country,
      tags,
      tagline,
      price,
      portraitUrl:''
    }
    createOnePhotographer(store, PhotographerBody, portraitUrl, token)
  }
  
  if ( userStatus === 'pending' || userStatus === 'updating') {
    return (<div><h1>loading</h1></div>)
  }

  if ( photographerStatus === 'resolved') {
    return <Navigate to={`/profile/${userId}`}/>
  }
  
  return (
    <div>
      <Article className="page__photographe--info">
        <LoginWrapper>
          <ArticleTitle>Mes identifiants de connection :</ArticleTitle>
          <FormWrapper>
            <InputWrapper>
              <CreateStyledInputCity
                type="text"
                id="email"
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
              <CreateStyledInputCity
                type="password"
                id="password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
              />
            </InputWrapper>
            <ButtonWrapper>
              <StyledButton className="signup" onClick={signIn}>
                <Icon className='fa fa-user-plus'/>
              </StyledButton>
            </ButtonWrapper>
          </FormWrapper>
        </LoginWrapper>
      </Article>
      <Article className="page__photographe--info">
        <LoginWrapper>
          <ArticleTitle>Mon profile :</ArticleTitle>
          <FormWrapper>

          
          <div className="vignet__photographe--info vignet__photographe--label">
            <CreateInputWrapper>
              <CreateStyledInputTitle
                type="text"
                id="name"
                name="name"
                value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
              />
            </CreateInputWrapper>
              <CreateInputWrapper>
            <CreateStyledInputCity
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='City'
            />, 
            <CreateStyledInputCity
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder='Country'
            />
              </CreateInputWrapper>
              <CreateInputWrapper>
            <CreateStyledInputTagline
              type="text"
              id="tagline"
              name="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder='Tagline'
            />
              </CreateInputWrapper>
              <CreateInputWrapper>
            <CreateStyledInputTagline
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='price'
            />
          </CreateInputWrapper>
          <form aria-label="tag" id="tag" className="form__option">
            <div className="btn__option" id="tagPortrait">
              <span role="checkbox" tabIndex="0" aria-checked={portrait} id="portrait" aria-labelledby="tagPortrait tag" className="label__option" onClick={selectTag}>
              #Portrait
              </span>
            </div>
            <div className="btn__option" id="tagArt">
              <span role='checkbox' tabIndex="0" aria-checked={art} id="art" aria-labelledby="tagArt tag" className="label__option" onClick={selectTag}>#Art</span>
            </div>
            <div className="btn__option" id="tagFashions">
              <span role='checkbox' tabIndex="0" aria-checked={fashions} id="fashions" aria-labelledby="tagFashions tag" className="label__option" onClick={selectTag}>#Fashions</span>
            </div>
            <div className="btn__option" id="tagArchitecture">
              <span role='checkbox' tabIndex="0" aria-checked={architecture} id="architecture" aria-labelledby="tagArchitecture tag" className="label__option" onClick={selectTag}>#Architecture</span>
            </div>
            <div className="btn__option" id="tagTravel">
              <span role='checkbox' tabIndex="0" aria-checked={travel} id="travel" aria-labelledby="tagTravel tag" className="label__option" onClick={selectTag}>#Travel</span>
            </div>
            <div className="btn__option" id="tagSport">
              <span role='checkbox' tabIndex="0" aria-checked={sport} id="sport" aria-labelledby="tagSport tag" className="label__option" onClick={selectTag}>#Sport</span>
            </div>
            <div className="btn__option" id="tagAnimals">
              <span role='checkbox' tabIndex="0" aria-checked={animals} id="animals" aria-labelledby="tagAnimals tag" className="label__option" onClick={selectTag}>#Animals</span>
            </div>
            <div className="btn__option" id="tagEvents">
              <span role='checkbox' tabIndex="0" aria-checked={events} id="events" aria-labelledby="tagEvents tag" className="label__option" onClick={selectTag}>#Events</span>
            </div>
          </form>
          </div>
            <div className='vignet__photographe--info vignet__photographe--btn'>
                <button className="btn__contact" value='modify' onClick={create}>
                  Sauvegarder
                </button>
          </div>
          <div className="vignet__photographe--info vignet__photographe--photo">
              <VignetPhoto src={portraitShower} alt={name} style={{ width: "200px", height: '200px' }} />
              <CreateStyledInput
              type="file"
              id="portraitUrl"
              name="portraitUrl"
              accept='image/png, image/jpeg, image/jpg'
              onChange={(e) => portraitReader(e)}/>
            </div>
          </FormWrapper>
        </LoginWrapper>
      </Article>
    </div>
  )
}