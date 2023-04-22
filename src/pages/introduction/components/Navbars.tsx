import React from 'react'

const NavBar = () => {
  const imgpath='images/icon-48.png'
  return (
    <>
     <nav className='main-nav'>
        <div className='logo'>
          <img src={imgpath} alt='Logo' />
          ChatDocK X
        </div>
      </nav> 
    </>
  )
}

export default NavBar
