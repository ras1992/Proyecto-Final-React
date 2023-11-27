import React, { useState, useEffect } from 'react';
import {
  Link
} from "react-router-dom";
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';


const NavPerfil = () => {

  const [carrito, setCarrito] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");

  const [nombreUsuario, setNombreUsuario] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = "http://localhost:5172/api/menu/userId"
        const response = await fetch(`${URL}`, {
          method: "GET",
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Error en la respuesta:', response.status, response.statusText);
          throw new Error('No se pudo obtener la respuesta esperada');
        }
        const data = await response.json();
        setUsuarioId(data.usuario.userId)
        setNombreUsuario(data.usuario.nombre)
      } catch (error) {
        console.error('Error no se pudo obtener:', error);
      }
    };
    fetchData();
  }, []);


const loginLogout = async () => {
    if (usuarioId == "") {
    } else {
      try {
        const URL = "http://localhost:5172/api/menu/logOut"
        const response = await fetch(URL, {
          method: "GET",
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Error en la respuesta:', response.status, response.statusText);
          throw new Error('No se pudo obtener la respuesta esperada');
        }
        window.location.href = '/'
      } catch (error) {
        console.error('Error no se pudo obtener:', error);
      }
    }
  }

  return (
    <motion.div
      className='bg-white z-[3] max-h-[400px] overflow-y-auto w-1/5 border shadow-xl absolute right-40 xll:w-1/3 xll:right-20 xl:w-1/3 xl:right-12 lg:w-1/2 lg:right-6 sm:w-[100%] sm:right-0 rounded-lg p-4'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
    >
      <div className='flex items-center justify-center'>
        <div className='mt-4'>
          <div className='flex flex-col items-center'>
            <strong className='text-3xl font-bold mb-2'>Perfil</strong>
            <span className='text-xl text-gray-600 mb-4'>Usuario: {nombreUsuario}</span>
            <Link to="/cupons" className='text-blue-500 hover:underline mb-2'>
              Cupones
            </Link>
            <button
              onClick={() => loginLogout()}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NavPerfil;
