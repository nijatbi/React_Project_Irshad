import React from 'react'
import loading from '../src/images/Spinner@1x-1.0s-200px-200px.gif'
export default function Loading() {
  return (
    <div style={{width:'100%',height:'300px'}}>
        <img width={100} height={100} src={loading} style={{position:'fixed',top:'40%',left:'45%'}}></img>
    </div>
  )
}
