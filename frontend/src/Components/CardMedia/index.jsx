import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from './../../Utils/selectors'

export default function CardMedia({ title, mediaUrl, likes, mediaId }) {
  const userId = useSelector(selectUser).data?.userId
  
  const path = userId ? `/modify_media/${mediaId}` : ''
  
  return (
    <div className='mediasInside'>
      <Link to={path} className='lien__media'>
        {(mediaUrl.split('.')[ 1 ] === 'mp4') ? (
          <video className='media__photo' src={mediaUrl} alt={title}/>
        ): (
          <img className='media__photo' src={mediaUrl} alt={title}/>
        )}
      </Link>
      <div className="media__legend">
        <h2 className="media__titre">
          {title}
        </h2>
        <div className="media__like">
          <p className="media__like">{likes}</p>
          <i className= "fa fa-heart"/>
        </div>
      </div >
    </div>
  )
}
