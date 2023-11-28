import React from 'react'
import Carrusel from './Carrusel'
import AboutText from './AboutText';

const About = () => {

  const images = [
    '/img/about/carrusel.webp',
    '/img/about/carrusel2.webp',
    '/img/about/carrusel3.webp',
  ];

  return (
    <>
      <section id="about">
      <div className={`w-full h-max-screen mt-16 ${(window.location.pathname === '/about') && 'h-screen'}`}>
          <h3 className='text-center text-5xl font-lobster text-blue-950 mt-4 sm:text-3xl'>Acerca de Nosotros</h3>
          <div className={`flex flex-row justify-center w-full mt-8 mb-16 xl:px-2 sm:flex-col ${(window.location.pathname === '/about') && 'flex flex-col items-center'}`}>
            <Carrusel images={images} />
            <AboutText />
          </div>
        </div>
      </section>

    </>
  )
}

export default About