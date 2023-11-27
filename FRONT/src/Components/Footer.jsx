import React from 'react'
import { Icon } from '@iconify/react';
import footerLogo from '/img/footer/logofooter.png'
import creditCards from '/img/footer/creditcards.png'


const Footer = () => {

  const footerMenu = {
    "hero": "Inicio",
    "menu": "Menú",
    "about": "Acerca de Nosotros",
    "contacts": "Contactos"
  }

  const scrollToHome = (accion) => {
    console.log(accion)
    const [idEncontrado, labelEncontrado] = Object.entries(footerMenu).find(([id]) => accion === id) || [];

    if (idEncontrado) {
      const homeElement = document.getElementById(`${idEncontrado}`);
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      console.log(`No se encontró la acción "${accion}" en el menú.`);
    }
  }


  return (
    <>
      <footer className='bg-black w-full h-64 bg-footerBg flex flex-col xxl:bg-posright xl:bg-footerBgXl sm:bg-center'>

        <div className='flex flex-row items-center justify-between h-full mx-6 sm:mx-4'>
          <div className='sm:mt-4'>
            {Object.entries(footerMenu).map(([path, label]) => (
              <li key={path}>
                <a className='text-white mb-3 xs:mb-2' onClick={() => scrollToHome(path)}>{label}</a>
              </li>
            ))}
          </div>
          <div>
            <img src={footerLogo} alt="" />
          </div>
          <div className='w-12 h-12 rounded-full bg-white flex items-center justify-center mr-9 xl:mr-0 sm:relative sm:top-9 xs:w-9 xs:h-9'>
            <a href="#"><Icon icon="system-uicons:arrow-up" className="" width={30} /></a>
          </div>
        </div>

        <div className='flex flex-row justify-between items-center mx-6 mb-2 sm:flex-col xs:relative xs:bottom-2'>
          <img src={creditCards} alt="" className='sm:hidden' />
          <a href="" className='text-white underline'>Privacy policy</a>
          <div className='flex flex-row items-center'>
            <Icon icon="emojione-monotone:copyright" color='#F56903' className='mt-1 mr-1' />
            <p className='text-white my-1'>{new Date().getFullYear()} Mr.Chef</p>
          </div>
          <div className='flex flex-row items-center'>
            <p className='text-white'>Made with </p>
            <Icon icon="noto:heart-hands" className='ml-2 mt-1' />
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer