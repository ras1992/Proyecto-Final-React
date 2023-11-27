import React from 'react'
import { Icon } from '@iconify/react';


const AboutText = () => {
  return (
    <>
      <div className='flex flex-col w-[30%] h-max font-roboto xll:w-[40%] xl:w-full lgg:w-[100%]'>
        <p className='bg-blue-950 text-white px-4 py-2 rounded-r-xl text-lg lg:text-base lgg:text-sm lgg:px-2 sm:text-base sm:rounded-xl'>"Mr.Chef es comida callejera con la hospitalidad de Odessa. Hemos estado alegrando a nuestros clientes desde 2015.
        Espero con placer que te preparen la comida más deliciosa y rápida, y lo más importante, ¡fresca! Te deleitarán con una gran variedad de no solo shawarma espectaculares, sino también con deliciosos pasteles, una variedad de pizzas, khachapuri y otros platillos orientales. Contamos con deliciosas bebidas caseras y café. ¡Te garantizamos una carga de positividad y placer!"</p>
        <p className='text-orange-400 p-4 text-lg xl:px-4 lg:px-2 lgg:p-2 lgg:text-sm sm:px-4 sm:text-base'>Sigue las novedades en nuestras redes sociales para no perderte eventos interesantes. Siempre es divertido y delicioso con nosotros :) </p>
        <div className='flex flex-row pl-2 sm:justify-center lgg:pl-0'>
          <div className=''>
            <Icon icon="devicon:facebook" className='mx-2' width={25} />
          </div>
          <div>
            <Icon icon="skill-icons:instagram" width={25} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutText