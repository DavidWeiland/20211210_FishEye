import React from 'react'
import { Link } from 'react-router-dom'

export default function CardMedia({index, title, mediaUrl, price, tags, likes}) {
  return (
    <div className='mediasInside'>
      <Link to="" className='lien__media'>
        <img className='media__photo' src={mediaUrl} alt={title}/>
        {/* <video poster="" className='media__photo' src={mediaUrl} alt={title}/> */}
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
