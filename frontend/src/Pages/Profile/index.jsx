import { useEffect, useState } from 'react'
import { getOnePhotographer } from '../../Features/photographer'
import {getAllMediasOfOnePhotographer } from '../../Features/medias'
import { useStore, useSelector } from 'react-redux'
import { selectUser, selectPhotographer, selectMedias, selectMedia } from '../../Utils/selectors'
import styled from 'styled-components'
import '../../Utils/Styles/style.css'
import TagsComponent from '../../Components/TagsComponent'
import { Navigate, useNavigate, useParams } from 'react-router'
import CardMedia from '../../Components/CardMedia'
import ModifyPhotographer from '../ModifyPhotographer'

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
  const {userId} = useParams()
  const [edit, setEdit] = useState(false)
  
  const user = useSelector(selectUser)
  const userStatus = user.status
  const userIdOfStore = user.data?.userId
  const mediaStatus = useSelector(selectMedia).status

  useEffect(() => {
    getOnePhotographer(store, userId)
    getAllMediasOfOnePhotographer(store,userId)
  }, [ store, userId, mediaStatus ])

  const mediasData = useSelector(selectMedias).data

  const photographer = useSelector(selectPhotographer)
  if ( photographer.data?.message === 'Photographer modified !') {
    getOnePhotographer(store, userId)
  }
  
  let Photographer = {
    name: photographer.data?.name,
    city: photographer.data?.city,
    country:photographer.data?.country,
    tags : photographer.data?.tags,
    tagline : photographer.data?.tagline,
    price : photographer.data?.price,
    portraitUrl : photographer.data?.portraitUrl
  }

  if (userStatus === 'rejected') {
    return <Navigate to='/login'/>
  }
  
  if ( userStatus === 'pending' || userStatus === 'updating' || photographer.status === 'pending' || photographer.status === 'updating' || mediaStatus === 'pending' || mediaStatus === 'updating') {
    return (<div><h1>loading</h1></div>)
  }

  const Edit = () => {
    setEdit(!edit)
  }

  const addAMedia = () => {
    navigate('/new_media')
  }

  return (
    <div>
      {(!edit) ? (
        <article className="page__photographe--info">
          <div className="vignet__photographe--info vignet__photographe--label">
            <VignetTitle>{Photographer.name}</VignetTitle>
            <VignetCity>{Photographer.city}, {Photographer.country}</VignetCity>
            <VignetTagline>{Photographer.tagline}</VignetTagline>
            {(Photographer.tags) ?
            <TagsComponent tags={Photographer.tags} />
            :null
            }
          </div>
          <div className='vignet__photographe--info vignet__photographe--btn'>
            {userIdOfStore === userId ? (
              <button className="btn__contact" value='modify' onClick={Edit}>
                Editeur de Profile
              </button>
            ): (
              <button className="btn__contact" value='contact' onClick={Edit}>
                Contactez-moi
              </button>
            )}
          </div>
          <div className="vignet__photographe--info vignet__photographe--photo">
            <VignetPhoto src={Photographer.portraitUrl} alt={Photographer.name} />
          </div>
        </article>):(
          <ModifyPhotographer state={edit} close={Edit}/>)}
        <article className="tri__medias">

        </article>
        <article className="plage__media">
        <div className='medias'>
          <div className='mediasInside mediasInside-plus' onClick={addAMedia} style={{display:(userIdOfStore === userId) ? ("flex"):("none")}}>
            <i className='fa fa-plus'/>
          </div>
          {mediasData?.map(({ index, title, likes, mediaUrl, _id }) => (
              <CardMedia
                key={`${title}-${index}`}
                title={title}
                likes={likes}
                mediaUrl={mediaUrl}
                mediaId={_id}
              />
          ))}
          
          </div>
            
      

        </article>
        <div>
          
        </div>
      </div>
    )

}