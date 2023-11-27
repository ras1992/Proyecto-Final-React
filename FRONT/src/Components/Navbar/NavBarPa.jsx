import React, { useState, useEffect } from 'react';
import Logo from '/img/nav/logo.png';
import chf from '/img/nav/chff1.png';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion'
import BagDropdown from './BagDropdownPa';

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import NavPerfil from './NavPerfil';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {
  const [carrito, setCarrito] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [dropdownClick, setdropdownClick] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [isBagDropdownVisible, setIsBagDropdownVisible] = useState(false);
  const [perfilVisible, setPerfilVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchCampo, setSearchCampo] = useState("");
  

  //envio datos
  const dispatch = useDispatch();
  //recepcion datos
  const act = useSelector((state) => state.changeNum)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = "http://localhost:5172/api/menu/userId"
        const response = await fetch(`${URL}`, {
          method: "GET",
          credentials: 'include',
        });

        if (!response.ok) {
          if (!(window.location.pathname == '/login')) {
            window.location.href = "/login"
          }
          console.error('Error en la respuesta:', response.status, response.statusText);
          throw new Error('No se pudo obtener la respuesta esperada');
        }
        const data = await response.json();
        setUsuarioId(data.usuario.userId)
      } catch (error) {
        console.error('Error no se pudo obtener:', error);
      }
    };

    const fetchData2 = async () => {
      try {
        const URL = "http://localhost:5172/api/menu/obtenerCarrito/"
        const response = await fetch(`${URL}${usuarioId}`, {
          method: "GET",
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Error en la respuesta:', response.status, response.statusText);
          throw new Error('No se pudo obtener la respuesta esperada');
        }

        const data = await response.json();
        setCarrito(data);
        console.log(data)
      } catch (error) {
        console.error('Error no se pudo obtener:', error);
      }
    }

    const fetchData3 = async () => {
      try {
        const URL = "http://localhost:5172/api/menu/obtenerCategorias"
        const response = await fetch(URL, {
          method: "GET",
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Error en la respuesta:', response.status, response.statusText);
          throw new Error('No se pudo obtener la respuesta esperada');
        }
        const data = await response.json();
        setCategorias(data);

      } catch (error) {
        console.error('Error no se pudo obtener:', error);
      }
    }


    fetchData()
      .then(() => console.log("paso0",))
      .then(() => fetchData2())
      .then(() => console.log("paso1"))
      .then(() => fetchData3())
      .then(() => console.log("paso2"))


  }, [usuarioId, act]);


  function handleClick() {
    setdropdownClick(!dropdownClick)
  }


  const handleClickMenu = () => {
    setIsOpen(!isOpen)
  }



  const cambiarCategoria = (idCategoria) => {
    setIsOpen(false)
    dispatch({ type: 'CAMBIAR_SELECCION', payload: idCategoria })
    localStorage.setItem('cachedData', JSON.stringify(idCategoria))
  }

  const scrollToHome = (accion) => {
    console.log(accion)

    if (accion && (window.location.pathname == '/')) {
      console.log(accion)
      const homeElement = document.getElementById(`${accion}`);
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/${accion}`
    }
  }

  const search = (data) => {
    localStorage.setItem('cacheSearch', JSON.stringify(data))
    window.location.href = `/search`
  }


  return (
    <>
      <header className="">

        {/* Botón de menú hamburguesa */}

        <div className='hidden pl-4 lg:flex sm:flex xs:pl-1'>
          <div className='flex flex-col relative top-7 xs:top-8'>
            <button className='flex-col justify-center items-center relative z-50 lg:flex' onClick={handleClickMenu}>
              <span className={`bg-black  block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-black  block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-black  block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm  ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>
          </div>
        </div>

        {isOpen ? <motion.div initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }} animate={{ scale: 1, opacity: 1 }} className='w-full h-screen flex flex-col justify-between z-30 items-center
	   fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rounded-lg bg-white backdrop backdrop-blur-md py-32'>
          <nav className='flex items-center flex-col justify-center'>
            <div className="pt-2 absolute top-1 mx-auto text-gray-600">
              <input className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none xs:px-3"
                type="search" name="search" placeholder="Search" onChange={(e) => setSearchCampo(e.target.value)} />


              <button onClick={()=>{search(searchCampo)}} className="absolute right-0 top-0 mt-5 mr-4">
                <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                  version="1.1" id="Capa_1" x="0px" y="0px"
                  viewBox="0 0 56.966 56.966"
                  width="512px" height="512px">
                  <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>

            </div>
            <div className='flex flex-row items-center mb-6 lg:hidden sm:flex xs:flex'>
              <Icon icon="iconoir:delivery-truck" hFlip={true} color="orange" width="40" />
              <span className='border-b-2 border-gray-300 font-roboto'>+38 (063) 98-75-615</span>
            </div>
            <h3 className='font-lobster text-3xl text-blue-950'>Menu</h3>
            <hr className="my-2 border w-full border-gray-300" />
            <div className='grid grid-cols-2'>
              <div className='flex flex-col m-auto mr-24 list-none'>
                {categorias.map((text, index) => (
                  <Link className='mb-2 font-roboto' key={index}
                    to="/submenu"
                    onClick={() => cambiarCategoria(text._id)}
                  >{text.nombreCategoria}
                  </Link>
                ))}
              </div>
              <div>
                <img src={chf} alt="" className="" />
              </div>
            </div>
            <div className='mt-6 font-roboto'>
              <a onClick={() => { setIsOpen(false), scrollToHome("about") }} className='px-4 py-2 h-6 rounded-2xl bg-gray-200 mr-16'>Sobre Nosotros</a>
              <a onClick={() => { setIsOpen(false), setIsOpen(scrollToHome("contact")) }} className='px-4 py-2 h-6 rounded-2xl bg-gray-200'>Contactos</a>
            </div>
          </nav>
        </motion.div>
          : null}

        {/* Fin boton menú hamburguesa */}


        {/* Nav */}

        <div className='flex flex-row items-center justify-around sm:justify-around'>
          <Link to="/">
            <div className="button-like-container" >
              <img src={Logo} alt="" className="lg:ml-16 sm:w-24 sm:ml-12 xs:w-16 xs:ml-9" />
            </div>
          </Link>


          <div className='hidden lg:flex lg:flex-row lg:items-center md:hidden sm:hidden xs:hidden'>
            <Icon icon="iconoir:delivery-truck" hFlip={true} color="orange" width="40" />
            <span>+38 (063) 98-75-615</span>
          </div>


          <ul className='flex flex-row font-roboto'>
            <Menu as="div" className="relative inline-block text-left lg:hidden sm:hidden">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5  bg-white px-3 py-2 text-sm font-semibold text-gray-900 " onClick={handleClick}>
                  {dropdownClick ? "New" : "Menu"}
                  {dropdownClick ? (<ChevronUpIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />) : (<ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />)}
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white">
                  <div className="py-1 ">
                    {categorias.map((text, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <Link
                            onClick={() => cambiarCategoria(text._id)}
                            to="/submenu"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm text-right'
                            )}
                          >
                            {text.nombreCategoria}
                          </Link>
                        )}

                      </Menu.Item>
                    ))}
                    <div className="pt-2 relative top-1 mx-auto text-gray-600 flex justify-center">
                      <input className="border-2 border-gray-300 bg-white mb-2 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search" />
                      <button onClick={()=>{search(searchCampo)}} className="absolute right-0 top-0 mt-5 mr-6">
                        <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                          version="1.1" id="Capa_1" x="0px" y="0px"
                          viewBox="0 0 56.966 56.966"
                          width="512px" height="512px">
                          <path
                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <li className='mx-16 py-2 text-sm font-semibold sm:mx-0 sm:mr-4 sm:whitespace-nowrap xl:block lg:hidden sm:hidden'>
              <Link onClick={() => scrollToHome("about")}>
                Sobre Nosotros
              </Link>
            </li>
            <li className='py-2 text-sm font-semibold xl:block lg:hidden sm:hidden'>
              <Link onClick={() => scrollToHome("contact")}>
                Contactos
              </Link>
            </li>
          </ul>
          <div className='flex flex-row py-2'>
            <Link to="/404">
              <Icon icon="devicon:facebook" className='mr-4 xs:mr-1' width="30" />
            </Link>
            <Link to="/404">
              <Icon icon="skill-icons:instagram" width="30" />
            </Link>


          </div>

          <div className='flex flex-row items-center py-2 font-roboto'>
            <Link onClick={() => usuarioId !== "" && setPerfilVisible(!perfilVisible)} className='mr-4 border-2  border-gray-600 px-6 py-1 rounded-2xl sm:px-2 sm:mr-2 sm:ml-3 xs:ml-1 xs:mr-1'>{usuarioId == "" ? "Login" : "Perfil"}</Link>

            <div>
              <div className="relative" onClick={() => usuarioId !== "" && setIsBagDropdownVisible(!isBagDropdownVisible)}>
                <Icon icon="uil:shopping-bag" width="40" />
                <div className="absolute top-3 right-2 w-6 h-6 rounded-full flex items-center justify-center text-black text-xs font-bold cursor-pointer">
                  {carrito.length}
                </div>
              </div>

              {isBagDropdownVisible && <BagDropdown />}
              {perfilVisible && <NavPerfil />}

            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
