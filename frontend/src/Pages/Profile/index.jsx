import { useState, useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
import DefaultPicture from '../../Assets/Icons/user-circle.svg'
import editIcon from '../../Assets/Icons/pencil-alt.svg'
import { getOnePhotographer, createOnePhotographer, modifyOnePhotographer } from '../../Features/photographer'
import { useStore, useSelector } from 'react-redux'
import { selectUser, selectPhotographer, selectMedias } from '../../Utils/selectors'
import styled from 'styled-components'
import '../../Utils/Styles/style.css'

const GeneralWrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const ProfileWrapper = styled.div`
  margin: auto;
  height: 95%;
  width: 47%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px black solid;
`
const HeaderProfile = styled.div`
  margin: 1%;
  height: 18%;
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ImageProfile = styled.img`
width:120px;
height:120px;
`
const DivImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: linear-gradient(
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 1)
  );
  width: 115px;
  height: 115px;
  border-radius: 60px;
  margin-top: -118px;
  z-index: 5;
`
const SpanImage = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color:rgba(255,255,255, 0.8);
  width: 115px;
  height: 50px;
  border-radius: 0 0 100px 100px;
  margin-top: -120px;
  z-index: 10;
  cursor:pointer;
`

const InfoWrapper = styled.div`
  margin: 0;
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`

const ButtonWrapper = styled.div`
  margin: 0;
  height: auto;
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`

const LabelInput = styled.label`
    color:#312E2E;
    font-size: 15px;
    font-weight: 900;
    display: inline-block;
`
const InputWrapper = styled.div`
  margin:auto;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`
const InputWrapperLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const StyledInput = styled.input`
  width: 85%;
`
const RadioButtonWrapper = styled.div`
  margin: auto;
  height: 95%;
  width: 95%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`

const EditButtonWrapper = styled.div`
  background-color : rgba(0, 0, 0, 0.8);
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
`
const EditButton = styled.img`
  width: 15px;
  height: 15px;
  border-bottom: rgba(255, 255, 255, 0.9) solid 1px;
  cursor: pointer;
`


function Profile() {
  const store = useStore()
  const userId = useSelector(selectUser).data?.userId
  const token = useSelector(selectUser).data?.token
  const photographerData = useSelector(selectPhotographer(userId)).data
  const photographerStatus = useSelector(selectPhotographer(userId)).status
  const mediasData = useSelector(selectMedias).data
  //const navigate = useNavigate()
  console.log(photographerData, mediasData)

//mettre if dans les useState pour afficher les couleurs déjà sélectionnées
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [tagline, setTagline] = useState('')
  const [price, setPrice] = useState('')
  
  const [portrait, setPortrait] = useState('')
  const [portraitChecked, setPortraitChecked] = useState(false)
  const [artChecked, setArtChecked] = useState(false)
  const [architectureChecked, setArchitectureChecked] = useState(false)
  const [animalsChecked, setAnimalsChecked] = useState(false)
  const [fashionsChecked, setFashionsChecked] = useState(false)
  const [travelChecked, setTravelChecked] = useState(false)
  const [sportChecked, setSportChecked] = useState(false)
  const [eventsChecked, setEventsChecked] = useState(false)

  /* useEffect(() => {
    getOnePhotographer(store, userId, token)
  }, [store, userId, token]) */
  
  const createPhotographer = () => {
    const body = {
      _id: 'prov',
      userId,
      name,
      city,
      country,
      tags:'tags',
      tagline,
      price,
      portrait
    }
    createOnePhotographer(store, body, token)
  }

  const modifyPhotographer = () => {
    modifyOnePhotographer(store, userId)
  }

  const createMedia = () => {

  }

  return (
    <GeneralWrapper>
      <ProfileWrapper>
        <HeaderProfile>
          <ImageProfile src={DefaultPicture} alt="" />
          <DivImage>
            <SpanImage>Edit</SpanImage>
          </DivImage>
        </HeaderProfile>
        <InfoWrapper>
          <ProfileWrapper>
            <InputWrapper>
              <LabelInput htmlFor="name">Name</LabelInput>
              <InputWrapperLine>
                <StyledInput
                  type="text"
                  id="name"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <EditButtonWrapper>
                  <EditButton
                    src={editIcon}
                    alt="editButton"
                    onClick={modifyOnePhotographer}
                  />
                </EditButtonWrapper>
              </InputWrapperLine>
            </InputWrapper>
            <InputWrapper>
              <LabelInput htmlFor="id">City</LabelInput>
              <InputWrapperLine>
                <StyledInput
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <EditButtonWrapper>
                  <EditButton
                    src={editIcon}
                    alt="editButton"
                    onClick={modifyOnePhotographer}
                  />
                </EditButtonWrapper>
              </InputWrapperLine>
            </InputWrapper>
            <InputWrapper>
              <LabelInput htmlFor="id">Country</LabelInput>
              <InputWrapperLine>
                <StyledInput
                  type="text"
                  id="country"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <EditButtonWrapper>
                  <EditButton
                    src={editIcon}
                    alt="editButton"
                    onClick={modifyOnePhotographer}
                  />
                </EditButtonWrapper>
              </InputWrapperLine>
            </InputWrapper>
            <InputWrapper>
              <LabelInput htmlFor="id">Tagline</LabelInput>
              <InputWrapperLine>
                <StyledInput
                  type="text"
                  id="tagline"
                  name="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
                <EditButtonWrapper>
                  <EditButton
                    src={editIcon}
                    alt="editButton"
                    onClick={modifyOnePhotographer}
                  />
                </EditButtonWrapper>
              </InputWrapperLine>
            </InputWrapper>
            <InputWrapper>
              <LabelInput htmlFor="id">Price</LabelInput>
              <InputWrapperLine>
                <StyledInput
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <EditButtonWrapper>
                  <EditButton
                    src={editIcon}
                    alt="editButton"
                    onClick={modifyOnePhotographer}
                  />
                </EditButtonWrapper>
              </InputWrapperLine>
            </InputWrapper>
          </ProfileWrapper>
          <ProfileWrapper>
            <RadioButtonWrapper>
              <div className="btn-option" id="tagPortrait">
                <span
                  role="checkbox"
                  id="Portrait"
                  aria-labelledby="tagPortrait tag"
                  className="label__option"
                  aria-checked={portraitChecked}
                >
                  #Portrait
                </span>
              </div>
              <div className="btn-option" id="tagArt">
                <span
                  role="checkbox"
                  id="Art"
                  aria-labelledby="tagArt tag"
                  className="label__option"
                  aria-checked={artChecked}
                >
                  #Art
                </span>
              </div>
              <div className="btn-option" id="tagFashions">
                <span
                  role="checkbox"
                  id="Fashions"
                  aria-labelledby="tagFashions tag"
                  className="label__option"
                  aria-checked={fashionsChecked}
                >
                  #Fashions
                </span>
              </div>
              <div className="btn-option" id="tagArchitecture">
                <span
                  role="checkbox"
                  id="Architecture"
                  aria-labelledby="tagArchitecture tag"
                  className="label__option"
                  aria-checked={architectureChecked}
                >
                  #Architecture
                </span>
              </div>
              <div className="btn-option" id="tagTravel">
                <span
                  role="checkbox"
                  id="Travel"
                  aria-labelledby="tagTravel tag"
                  className="label__option"
                  aria-checked={travelChecked}
                >
                  #Travel
                </span>
              </div>
              <div className="btn-option" id="tagSport">
                <span
                  role="checkbox"
                  id="Sport"
                  aria-labelledby="tagSport tag"
                  className="label__option"
                  aria-checked={sportChecked}
                >
                  #Sport
                </span>
              </div>
              <div className="btn-option" id="tagAnimals">
                <span
                  role="checkbox"
                  id="Animals"
                  aria-labelledby="tagAnimals tag"
                  className="label__option"
                  aria-checked={animalsChecked}
                >
                  #Animals
                </span>
              </div>
              <div className="btn-option" id="tagEvents">
                <span
                  role="checkbox"
                  id="Events"
                  aria-labelledby="tagEvents tag"
                  className="label__option"
                  aria-checked={eventsChecked}
                >
                  #Events
                </span>
              </div>
            </RadioButtonWrapper>
          </ProfileWrapper>
        </InfoWrapper>
        <ButtonWrapper>
          {photographerStatus === 'void' ? (
            <button className="signup" onClick={createPhotographer}>
              Create
            </button>
          ) : (
            <button className="signup" onClick={modifyPhotographer}>
              Modify
            </button>
          )}
        </ButtonWrapper>
      </ProfileWrapper>
      <ProfileWrapper>
        <InfoWrapper></InfoWrapper>
        <ButtonWrapper>
          <button className="signup" onClick={createMedia}>
            Add new media
          </button>
        </ButtonWrapper>
      </ProfileWrapper>
    </GeneralWrapper>
  )
}

export default Profile
