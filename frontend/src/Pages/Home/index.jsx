import { useState, useEffect } from 'react'
import { useStore, useSelector } from 'react-redux'
import { selectPhotographers } from '../../Utils/selectors'
import { getAllPhotographers } from '../../Features/photographers'
import '../../Utils/Styles/style.css'
import '../../Utils/Styles/home.css'

import Card from '../../Components/Card'
  
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
                {photographers.map(({ index, userId, name, city, country, tags, tagline, price, portraitUrl }) => (
              <Card
                key={`${index}-${name}`}
                id={userId}
                name={name}
                city={city}
                country={country}
                tags={tags}
                tagline={tagline}
                price={price}
                portraitUrl={portraitUrl}
              />
            ))}
          </section>
        )
      )}
    </div>
  ) 
}