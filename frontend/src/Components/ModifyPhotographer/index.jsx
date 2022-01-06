import { useState } from 'react'
import { modifyOnePhotographer } from '../../Features/photographer'
import { useStore, useSelector } from 'react-redux'
import { selectUser, selectPhotographer } from '../../Utils/selectors'
import styled from 'styled-components'
import '../../Utils/Styles/style.css'

const VignetPhoto = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 100%;
  background: #C4C4C4;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
`
const InputWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap:nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`
const StyledInputTitle = styled.input`
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
const StyledInputCity = styled.input`
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
const StyledInputTagline = styled.input`
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
const StyledInput = styled.input`
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

export default function Profile({state, close}) {
  const store = useStore()
  //const navigate = useNavigate()
  const user = useSelector(selectUser)
  const token = user.data?.token

  const photographer = useSelector(selectPhotographer)
  const photographerStatus = photographer.status
  const photographerId = photographer.data._id
  const photographerUserId = photographer.data.userId
  const photographerName = photographer.data.name
  const photographerCity = photographer.data.city
  const photographerCountry = photographer.data.country
  const photographerTags = photographer.data.tags
  const photographerTagline = photographer.data.tagline
  const photographerPrice = photographer.data.price
  const photographerPortraitUrl = photographer.data.portraitUrl


  const [name, setName] = useState(photographerName)
  const [city, setCity] = useState(photographerCity)
  const [country, setCountry] = useState(photographerCountry)
  const [tags, setTags] = useState(photographerTags)
  const [tagline, setTagline] = useState(photographerTagline)
  const [price, setPrice] = useState(photographerPrice)
  const [portraitUrl, setPortraitUrl] = useState(photographerPortraitUrl)
  const [ portraitShower, setPortraitShower ] = useState(photographerPortraitUrl)

  
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

  const modify = () => {
    const body = {
    userId:photographerUserId,
    name,
    city,
    country,
    tags,
    tagline,
    price,
    portraitUrl:''
    }
    modifyOnePhotographer(store, photographerId, token, portraitUrl, body)
    close()
  }

  if (photographerStatus === 'rejected') {
    return (<div><h1>Error</h1></div>)
  }
  
  if ( photographerStatus === 'pending' || photographerStatus === 'updating') {
    return (<div><h1>loading</h1></div>)
  }
  
  return (
      <div>
        <article className="page__photographe--info">
          <div className="vignet__photographe--info vignet__photographe--label">
            <InputWrapper>
              <StyledInputTitle
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputWrapper>
              <InputWrapper>
            <StyledInputCity
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />, 
            <StyledInputCity
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
              </InputWrapper>
              <InputWrapper>
            <StyledInputTagline
              type="text"
              id="tagline"
              name="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
              </InputWrapper>
              <InputWrapper>
            <StyledInputTagline
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputWrapper>
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
              
                <button className="btn__contact" value='modify' onClick={modify}>
                  Sauvegarder / retour
                </button>
          </div>
          <div className="vignet__photographe--info vignet__photographe--photo">
              <VignetPhoto src={portraitShower} alt={photographerName} style={{ width: "200px", height: '200px' }} />
              <StyledInput
              type="file"
              id="portraitUrl"
              name="portraitUrl"
              accept='image/png, image/jpeg, image/jpg, video/mpeg, video/mp4'
              onChange={(e) => portraitReader(e)}/>
          </div>
        </article>
      </div>
    )
}