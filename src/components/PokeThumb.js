import React from 'react'
import { Card, CardImg } from 'react-bootstrap'

const PokeThumb = ({id, name, image, type}) => {
  const style = `thumb-container ${type}`
  return (
    <Card className={`my-3 p-3 rounded text-center shadow mb-5 bg-${style}`}>
        <div className='number'>
            <small>#0{id}</small>
        </div>
        <CardImg src={image} alt={name} style={{width:'8rem',height:'8rem'}} variant='top'/>
        <div className="detail-wrapper">
          <h1>{name}</h1>
          <small>Type: {type}</small>
        </div>
    </Card>
  )
}

export default PokeThumb