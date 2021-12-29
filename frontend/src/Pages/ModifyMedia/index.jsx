import { useState } from 'react'
import { modifyOneMedia } from '../../Features/media'
import { useStore, useSelector } from 'react-redux'
import { selectMedias, selectUser } from '../../Utils/selectors'
import styled from 'styled-components'
import '../../Utils/Styles/style.css'
import { useNavigate, useParams } from 'react-router-dom'

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
  font-size: 25px;
  font-weight : bold;
  color:#D3573C;
  box-shadow: inset 0px 4px 12px rgba(0, 0, 0, 0.25);
  padding-left:5px;
  &:focus{
    background-color:rgba(0, 0, 0, 0.2);
    };
`
const StyledLabel = styled.label`
  margin:1%;
  width:25%;
  height:15px;
  font-size: 13px;
  font-weight : normal;
  color:#901C1C;
`
const CreateStyledInputTagline = styled.input`
  margin:1%;
  border:0;
  width:100%;
  height:15px;
  font-size: 13px;
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
const ArticleTitle = styled.h1`
  margin:auto;
  width:100%;
  font-size: 15px;
  color:#901C1C;
  display:flex;
`

export default function ModifyMedia() {
  const store = useStore()
  const navigate = useNavigate()
  const {mediaId} = useParams()
  const user = useSelector(selectUser)
  const userId = user.data?.userId
  const token = user.data?.token
  
  /* useEffect(() => {
    getOneMedia(store, mediaId, token)
  }, [ store, mediaId, token ]) */

  const medias = useSelector(selectMedias)
  const mediasStatus = medias.status
  let Title, Date, Likes, Price, Tags, ImageUrl
  medias.data.forEach((media) => {
    if (media._id === mediaId) {
      Title = media.title
      Date = media.date
      Likes = media.likes
      Price = media.price
      Tags = media.tags
      ImageUrl = media.mediaUrl
    }
  })

  const [ title, setTitle ] = useState(Title)
  const [ mediaUrl, setMediaUrl ] = useState(ImageUrl)
  const [ tags, setTags ] = useState(Tags)
  const [ likes, setLikes ] = useState(Likes)
  const [ date, setDate ] = useState(Date)
  const [ price, setPrice ] = useState(Price)
  const [mediaShower, setMediaShower] = useState(ImageUrl)
  
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

  const mediaReader = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const file = e.target.files[0]
    setMediaUrl(file)
    const fileReader = new FileReader()
    fileReader.onload = function(progressEvent) {
      const url = fileReader.result
      setMediaShower(url)
    }
    fileReader.readAsDataURL(file)
  }
                    
  const modify = () => {
    const body = {
      _id:mediaId,
      userId,
      title,
      mediaUrl:'',
      tags,
      likes,
      date,
      price
    }
    modifyOneMedia(store, mediaId, token, mediaUrl, body)
    const path = `/profile/${userId}`
    navigate(path)
  }
  
  if ( mediasStatus === 'pending' || mediasStatus === 'updating') {
    return (<div><h1>loading</h1></div>)
  }
  
  return (
    <div>
      <Article className="page__photographe--info">
        <LoginWrapper>
          <ArticleTitle>Ma creation :</ArticleTitle>
          <FormWrapper>
            <div className="vignet__photographe--info vignet__photographe--label">
              <CreateInputWrapper>
                <CreateStyledInputTitle
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
              </CreateInputWrapper>
              <CreateInputWrapper>
                <StyledLabel htmlFor='date'>Date : </StyledLabel>
                <CreateStyledInputTagline
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </CreateInputWrapper>
              <CreateInputWrapper>
                <StyledLabel htmlFor='likes'>Likes : </StyledLabel>
                <CreateStyledInputTagline
                  type="number"
                  id="likes"
                  name="likes"
                  value={likes}
                  onChange={(e) => setLikes(e.target.value)}
                />
              </CreateInputWrapper>
              <CreateInputWrapper>
                <StyledLabel htmlFor='price'>Price : </StyledLabel>
                <CreateStyledInputTagline
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
              <button className="btn__contact" value='modify' onClick={modify}>
                Sauvegarder
              </button>
            </div>
            <div className="vignet__photographe--info vignet__photographe--photo">
              <VignetPhoto src={mediaShower} alt={title} style={{ width: "200px", height: '200px' }} />
                <CreateStyledInput
                  type="file"
                  id="mediaUrl"
                  name="mediaUrl"
                  accept='image/png, image/jpeg, image/jpg, video/mpeg, video/mp4'
                  onChange={(e) => mediaReader(e)}/>
            </div>
          </FormWrapper>
        </LoginWrapper>
      </Article>
    </div>
  )
}