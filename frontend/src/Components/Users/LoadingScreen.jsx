import React from 'react'
import ReactLoading from 'react-loading'

export default function LoadingScreen() {
  return (
    <div className='loadingscreen'>
      <ReactLoading className='loading'
       height={'100px'}
        width={'100px'}
        type={'spokes'}
        color={'#0096FA'} 
      />
    </div>
  )
}
