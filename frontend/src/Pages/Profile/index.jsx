import { useState, useEffect } from 'react'
import { getOnePhotographer, createOnePhotographer, modifyOnePhotographer } from '../../Features/photographer'
import { useStore, useSelector } from 'react-redux'
import { selectUser, selectPhotographer } from '../../Utils/selectors'
import styled from 'styled-components'
import '../../Utils/Styles/style.css'
import { useNavigate } from 'react-router-dom'
import TagsComponent from '../../Components/TagsComponent'

const VignetTitle = styled.h1`
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
const VignetPhoto = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 100%;
  background: #C4C4C4;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
`




const CreateWrapper = styled.div`
background:#FF0;
  margin:auto;
  margin-top: 3rem;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
const FormWrapper = styled.div`
background:#F0F;
  margin: auto;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
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



const StyledButton = styled.button`
background-color:#D3573C;
  margin-left:70px;
  margin-right:70px;
  width:70px;
  height:70px;
  border-radius:100%;
  border: 0;
  box-shadow:inset -2px -4px 12px rgba(0, 0, 0, 0.8), inset 2px 4px 12px rgba(255, 255, 255, 0.8), 2px 4px 12px rgba(0, 0, 0, 0.8) ;
`
const Icon = styled.i`
 color:rgba(0, 0, 0, 0.8);
 font-size:40px;
`

export default function Profile() {
  const store = useStore()
  const Navigate = useNavigate()
  const user = useSelector(selectUser)
  const userStatus = user.status
  const userId = user.data?.userId
  const token = user.data?.token

  useEffect(() => {
      getOnePhotographer(store, userId, token)
  }, [store, userId, token])

  const photographer = useSelector(selectPhotographer)
  const photographerStatus = photographer.status
  const photographerId = photographer.data?._id
  //const photographerUserId = photographer.data?.userId
  const photographerName = photographer.data?.name
  const photographerCity = photographer.data?.city
  const photographerCountry = photographer.data?.country
  const photographerTags = photographer.data?.tags
  const photographerTagline = photographer.data?.tagline
  const photographerPrice = photographer.data?.price
  const photographerPortraitUrl = photographer.data?.portraitUrl

  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [tags, setTags] = useState([])
  const [tagline, setTagline] = useState('')
  const [price, setPrice] = useState('')
  const [portraitUrl, setPortraitUrl] = useState('')

  const [ edit, setEdit ] = useState(false)
  
  const portrait = (tags?.indexOf('portrait') >= 0) ? true : false
  const art = (tags?.indexOf('art') >= 0) ? true : false
  const architecture = (tags?.indexOf('architecture') >= 0) ? true : false
  const animals = (tags?.indexOf('animals') >= 0) ? true : false
  const fashions = (tags?.indexOf('fashions') >= 0) ? true : false
  const travel = (tags?.indexOf('travel') >= 0) ? true : false
  const sport = (tags?.indexOf('sport') >= 0) ? true : false
  const events = (tags?.indexOf('events') >= 0) ? true : false

  const addTag = (e) => {
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
    console.log(newTags)
    setTags(newTags)
  }

  const editing = () => {
    setEdit(!edit)
    setName(photographerName)
    setCity(photographerCity)
    setCountry(photographerCountry)
    setTags(photographerTags)
    setTagline(photographerTagline)
    setPrice(photographerPrice)
    setPortraitUrl(photographerPortraitUrl)
    
  }
  
  const PhotographerBody = {
    userId,
    name,
    city,
    country,
    tags:['portrait', 'art'],
    tagline,
    price,
    portraitUrl: ''
  }
    
  const create = () => {
    const objectData = new FormData()
    objectData.append('thing', JSON.stringify(PhotographerBody))
    objectData.append('image', portraitUrl, PhotographerBody.name)
    createOnePhotographer(store, objectData, token)
  
  }

  const modify = () => {
    const objectData = new FormData()
    objectData.append('thing', JSON.stringify(PhotographerBody))
    objectData.append('image', portraitUrl, PhotographerBody.name)
    modifyOnePhotographer(store, photographerId, token, objectData)
  }
  

  if (photographerStatus === 'rejected') {
    return (<div><h1>Error</h1></div>)
  }
  
  if ( photographerStatus === 'pending' || photographerStatus === 'updating') {
    return (<div><h1>loading</h1></div>)
  }
  
  return (
    (!edit) ? (
      <div>
        <article className="page__photographe--info">
          <div className="vignet__photographe--info vignet__photographe--label">
            <VignetTitle>{photographerName}</VignetTitle>
            <VignetCity>{photographerCity}, {photographerCountry}</VignetCity>
            <VignetTagline>{photographerTagline}</VignetTagline>
            {(photographerTags) ?
            <TagsComponent tags={photographerTags} />
            :null
            }
          </div>
          <div className ='vignet__photographe--info vignet__photographe--btn'>
            <button className="btn__contact" value='modify' onClick={editing}>
              <Icon className='fa fa-edit'/>
            </button>
          </div>
          <div className="vignet__photographe--info vignet__photographe--photo">
            <VignetPhoto src={photographerPortraitUrl} alt={photographerName} style={{ width: "200px", height: '200px' }} />
          </div>
        </article>
        <article className="tri__medias">

        </article>
        <article className="plage__media">

        </article>
        <div>
          
        </div>
      </div>
    ) : (
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
            {(photographerTags) ?
            <TagsComponent tags={photographerTags} />
            :null
            }
          </div>
            <div className='vignet__photographe--info vignet__photographe--btn'>
              {(photographerId) ? (
                <button className="btn__contact" value='modify' onClick={modify}>
                  <Icon className='fa fa-edit'/>
                </button>
              ) : (
                <button className="btn__contact" value='modify' onClick={create}>
                  <Icon className='fa fa-plus'/>
                </button>
              )}
          </div>
          <div className="vignet__photographe--info vignet__photographe--photo">
              <VignetPhoto src={photographerPortraitUrl} alt={photographerName} style={{ width: "200px", height: '200px' }} />
              <StyledInput
              type="file"
              id="portraitUrl"
              name="portraitUrl"
              accept='image/png, image/jpeg, image/jpg, video/mpeg, video/mp4'
              onChange={(e) => setPortraitUrl(e.target.files[0])}/>
          </div>
        </article>
        <article className="tri__medias">

        </article>
        <article className="plage__media">

        </article>
        <div>
          
        </div>
      <CreateWrapper>
        <FormWrapper>
          <InputWrapper>
            <StyledInput
              type="text"
              id="tags"
              name="tags"
              placeholder='tags'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </InputWrapper>
        </FormWrapper>
      </CreateWrapper>
      </div>
    )
  )
}