import React from 'react'
import { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import Notecard from '../components/NoteCard'
import { NextWeek } from '@material-ui/icons'
import Masonry from 'react-masonry-css'
const url = "http://localhost:8000/notes";
export default function Notes() {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch(url)
  //     .then(res => res.json())
  //       .then(data => {
  //         setData(data)
  //     });

  // }, [])
  const handleDelete = async (id) =>{
    await fetch(url+'/'+id,{
      method:'DELETE',
    })
    const newNotes = data.filter(x=> x.id !== id)
    setData(newNotes);
  }
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }
  return (

    <Container>

      <Masonry
       breakpointCols={breakpoints}
       className="my-masonry-grid"
       columnClassName="my-masonry-grid_column"
       >
      {data && data.map(note=> (
        <div key={note.id} > 
          <Notecard note={note} handleDelete = {handleDelete}/>
        </div> 
      ))}
      </Masonry>
    
    </Container>
  )
}
