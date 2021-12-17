import { useEffect } from 'react'
import { getOnePhotographer } from '../../Features/photographer'
import { useStore, useSelector } from 'react-redux'
import { selectUser, selectPhotographer } from '../../Utils/selectors'
import styled from 'styled-components'
import '../../Utils/Styles/style.css'
import TagsComponent from '../../Components/TagsComponent'
import { Navigate, useNavigate } from 'react-router'

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

export default function Profile() {
  const store = useStore()
  const navigate = useNavigate()
  

  const user = useSelector(selectUser)
  const userStatus = user.status
  const userId = user.data?.userId
  const token = user.data?.token

  useEffect(() => {
      getOnePhotographer(store, userId, token)
  }, [store, userId, token])

  const photographer = useSelector(selectPhotographer)
  //const photographerStatus = photographer.status
  //const photographerId = photographer.data?._id
  //const photographerUserId = photographer.data?.userId
  const photographerName = photographer.data?.name
  const photographerCity = photographer.data?.city
  const photographerCountry = photographer.data?.country
  const photographerTags = photographer.data?.tags
  const photographerTagline = photographer.data?.tagline
  //const photographerPrice = photographer.data?.price
  const photographerPortraitUrl = photographer.data?.portraitUrl

  
  if (userStatus === 'rejected') {
    return <Navigate to='/login'/>
  }
  
  if ( userStatus === 'pending' || userStatus === 'updating') {
    return (<div><h1>loading</h1></div>)
  }

  const goTo = () => {
    navigate('/modify_photographer')
  }
  
  return (
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
            <button className="btn__contact" value='modify' onClick={goTo}>
              Profile Editor
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
    )

}