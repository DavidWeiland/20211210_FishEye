import { useEffect } from 'react'
import { getOnePhotographer } from '../../Features/photographer'
import {getAllMediasOfOnePhotographer } from '../../Features/medias'
import { useStore, useSelector } from 'react-redux'
import { selectUser, selectPhotographer, selectMedias, selectMedia } from '../../Utils/selectors'
import styled from 'styled-components'
import '../../Utils/Styles/style.css'
import TagsComponent from '../../Components/TagsComponent'
import { Navigate, useNavigate } from 'react-router'
import CardMedia from '../../Components/CardMedia'

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
  const mediaStatus = useSelector(selectMedia).status
  
  useEffect(() => {
    getOnePhotographer(store, userId, token)
    getAllMediasOfOnePhotographer(store,userId)
  }, [ store, userId, token, mediaStatus ])
  const mediasData = useSelector(selectMedias).data

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
  
  if ( userStatus === 'pending' || userStatus === 'updating' || mediaStatus === 'pending' || mediaStatus === 'updating') {
    return (<div><h1>loading</h1></div>)
  }

  const goTo = () => {
    navigate('/modify_photographer')
  }
  
  const addAMedia = () => {
    navigate('/new_media')
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
            <VignetPhoto src={photographerPortraitUrl} alt={photographerName} />
          </div>
        </article>
        <article className="tri__medias">

        </article>
        <article className="plage__media">
        <div className='medias'>
          <div className='mediasInside mediasInside-plus' onClick={addAMedia}>
            <i className='fa fa-plus'/>
          </div>
          {mediasData?.map(({ index, title, likes, mediaUrl }) => (
              <CardMedia
                key={`${title}-${index}`}
                title={title}
                likes={likes}
                mediaUrl={mediaUrl}
              />
          ))}
          
          </div>
            
      

        </article>
        <div>
          
        </div>
      </div>
    )

}