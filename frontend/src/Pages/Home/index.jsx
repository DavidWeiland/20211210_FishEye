import { useState, useEffect } from 'react'
//import { Navigate } from 'react-router'
//import { Link } from 'react-router-dom'
import { useStore, useSelector } from 'react-redux'
import { selectPhotographers } from '../../Utils/selectors'
import { getAllPhotographers } from '../../Features/photographers'

//import styled from 'styled-components'
//import { getOnePhotographer, createOnePhotographer, modifyOnePhotographer } from '../../Features/photographer'
import '../../Utils/Styles/style.css'
import '../../Utils/Styles/home.css'

import Card from '../../Components/Card'

/* const AppWrapper = styled.div`
  margin: auto;
  height: 100vh;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ` */
  
export default function Home() {
    const store = useStore()
    
    useEffect(() => {
        getAllPhotographers(store)
    }, [ store ])
  
  const photographersStatus = useSelector(selectPhotographers).status
  const photographersData = useSelector(selectPhotographers).data
  
  // apparence des tags
  const [ tags, setTags ] = useState([])
  const portrait = (tags.indexOf('portrait') >= 0) ? true : false
  const art = (tags.indexOf('art') >= 0) ? true : false
  const architecture = (tags.indexOf('architecture') >= 0) ? true : false
  const animals = (tags.indexOf('animals') >= 0) ? true : false
  const fashions = (tags.indexOf('fashions') >= 0) ? true : false
  const travel = (tags.indexOf('travel') >= 0) ? true : false
  const sport = (tags.indexOf('sport') >= 0) ? true : false
  const events = (tags.indexOf('events') >= 0) ? true : false

  //fonction qui :
  // - change l'apparence du tag
  // - rempli la liste des tags sélectionnés
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

  
  //affiche une selection de photographes en fonction des tags
  let photographers = []
  photographersData?.forEach(photographer => {
    photographer.tags.forEach(Ptag => {
      const tagsMock = [ 'portrait', 'art', 'architecture', 'animals', 'fashions', 'travel', 'sport', 'events' ]
      const tagsData = tags.length <= 0 ? 
        tagsMock : tags
      console.log(tagsData)
      for (let i = 0; i < tagsData.length; i++) {
        if (Ptag === tagsData[i]) {
          if (photographers.includes(photographer)) {
            return
          }
          photographers.push(photographer)
        }
      }
    })
  })


  /* 
  
  
  const modifyPhotographer = () => {
    const PhotographerBody = {
      userId:PhotographerUserId,
      name:"Tracy Galindo",
      city:"Congis",
      country:"France",
      tags:["portrait", "architecture"],
      tagline:"Tout est beau, quand on regarde",
      price:500,
      portrait: ''
    }
    const objectData = new FormData()
    objectData.append('thing', JSON.stringify(PhotographerBody))
    objectData.append('image', portraitUrl, PhotographerBody.name)
    modifyOnePhotographer(store, PhotographerId, Token, objectData)
  } */

  /* if (UserStatus === 'rejected') {
    return (<div><h1>Error</h1></div>)
  }

  if (UserStatus === 'pending' || PhotographerStatus === 'updating') {
    return (<div><h1>loading</h1></div>)
  }

  if (UserStatus === 'resolved') {
    return <Navigate to='/profile'/>
  } */

  //transfert sur tagsmocks pour faire un map dans HomeHeader
  //puis mettre la logique de selection dans home


  return (
    <div>
      <div className='headerHomePageNav'>
        <div className='nav'>
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
      </div>
      <div className='headerHomePageTitle'>
        <div>
          <h1 className='titlePrincipal'>Nos Photographes</h1>
        </div>
      </div>

      {(photographersStatus === 'rejected') ? (
        <section>
          <h1>Erreur de chargement des photographes, veuillez contacter le web-master - 06 62 50 51 75</h1>
        </section>
      ) : (
        (photographersStatus === 'pending' || photographersStatus === 'updating') ? (
          <section>
            <h1>loading</h1>
          </section>
        ) : (
          <section>
            {photographers.map(({ index, _id, name, city, country, tags, tagline, price, portrait }) => (
              <Card
                key={`${index}-${name}`}
                id={_id}
                name={name}
                city={city}
                country={country}
                tags={tags}
                tagline={tagline}
                price={price}
                portraitUrl={portrait}
              />
            ))}
          </section>
        )
      )}

    {/*
      <AppWrapper>
      <p>- {UserId} -</p>
      <p>- {PhotographerId} - {PhotographerCity} - {PhotographerTagline} - {PhotographerPortrait} -</p>
      {(UserStatus === 'resolved') ? (
        <div>
          <div>
            <input type="file" id="file_profile" name="file" accept='image/png, image/jpeg, image/jpg, video/mpeg, video/mp4' onChange={(e)=>setPortraitUrl(e.target.files[0])}/>
          </div>
          <div style={{margin:"20px"}}>
            <button style={{margin:"10px"}} onClick={createPhotographer}>New photographer</button>
            <button style={{margin:"10px"}} onClick={modifyPhotographer}>Modify photographer</button>
            <button style={{margin:"10px"}} onClick={fetchAllPhotographers}>Get All photographer</button>
            <button style={{margin:"10px"}} onClick={fetchOnePhotographer}>Get One photographer</button>
          </div>
        </div>
      ) : (
        <div style={{ margin: "20px" }}>
          <button style={{margin:"10px"}} onClick={create}>New user</button>
          <button style={{margin:"10px"}} onClick={connect}>Login</button>
        </div>
      )}
      <button style={{margin:"10px"}} onClick={connect}>Delete One photographer</button>
      <div style={{margin:"20px"}}>
        <button style={{ margin: "10px" }}>New media</button>
        <button style={{ margin: "10px" }}>Modify media</button>
        <button style={{ margin: "10px" }}>Get All media</button>
        <button style={{ margin: "10px" }}>Get One media</button>
        <button style={{ margin: "10px" }}>Delete One media</button>
      </div>
    </AppWrapper>
    */}
    </div>
  ) 
}