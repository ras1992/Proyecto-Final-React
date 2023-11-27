import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState([]);
  const [mostraPassword,setMostrarPassword]=useState(false)


  const register = async () => {
    const access = await existe()
    console.log(access)
    if (access) {
      console.log('Ya existe usuario')
      throw new Error('Ya existe usuario');
    } else {
      console.log('No existe usuario')
      try {
        const URL = "http://localhost:5172/api/menu/registerUser_add"; // Reemplaza con la ruta correcta
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: userData.nombre,
            email: userData.email,
            password: userData.password
          }),
        });

        if (!response.ok) {
          console.error('Error en la respuesta:', response.status, response.statusText);
          throw new Error('No se pudo agregar Usuario');
        }
        // Manejar la respuesta del backend si es necesario
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error('Error al agregar al Usuario:', error);
      }
    }

  }

  // ras@gmail.com
  const existe = async () => {
    event.preventDefault();
    try {
      const URL = "http://localhost:5172/api/menu/register_getEmail/";
      const response = await fetch(`${URL}${userData.email}`,{
        method: "GET",
        credentials: 'include',
    });

      if (!response.ok) {
        console.error('Error en la respuesta:', response.status, response.statusText);
        throw new Error('Error al comprobar email');
      }

      const responseData = await response.json();
      console.log(responseData[0])
      if (responseData[0] == undefined) {
        console.log(false)
        return false
      } else {
        console.log(true)
        return true
      }
    } catch (error) {
      console.error('Error al comprobar email:', error);

    }
  }

  function enviarPassword(e) {
    e.preventDefault()

    setMostrarPassword(!mostraPassword)

  }


  return (
    <>
      <div className='h-screen bg-gray-300 bg-bg-login flex items-center justify-center sm:px-1'>
        <div className='w-[25%] h-auto bg-white flex flex-col  rounded-xl shadow-2xl xll:w-[40%] xll:right-0 xll:top-0 lg:w-[50%] sm:w-[100%] sm:flex sm:flex-col sm:right-0 sm:top-0'>
          <span className='w-full h-20 bg-blue-950 rounded-b-full flex items-center justify-center text-white text-4xl font-lobster'>
            Welcome
          </span>
          <div className='flex flex-row justify-evenly mt-8'>
            <span className='relative group'>
              <Link to='/login' className='text-blue-950' >Login</Link>
            </span>
            <span className='relative group'>
              <Link to='/register' className='text-blue-950 border-b-2  border-gray-500' >Registration</Link>
            </span>
          </div>
          <hr className="w-full bg-gray-200 h-[0.5] border" />
          <form>
            <div className='flex flex-col items-center mt-8'>
              <li className='text-blue-900 text-sm hover:text-yellow-400 w-[70%]'>
                <input type="text" className='border-b-2  mb-2  w-full hover:border-yellow-400' placeholder='Apellido y Nombre' name="nombre" onChange={(e) => setUserData({ ...userData, nombre: e.target.value })} />
              </li>
              <li className='text-blue-900 text-sm hover:text-yellow-400 w-[70%]'>
                <input type="text" className='border-b-2  mb-2  w-full hover:border-yellow-400' placeholder='Email' name="email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              </li>
              <li className='text-blue-900 text-sm hover:text-yellow-400 w-[70%]'>
                <input type={mostraPassword ? "text" : "password"} className='border-b-2 mb-2 w-full form-control hover:border-yellow-400' placeholder='Password' name="password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />

                <button onClick={enviarPassword}>{mostraPassword ? 'ocutar' : 'mostrar'} password</button>

              </li>
              <label className="flex justify-center items-center mb-4 w-[70%] mt-2">
                <input type="checkbox" className="mr-2" />
                I accept Terms of Use
              </label>
              <Link to="/register" className='whitespace-nowrap  border py-1 px-36 rounded-xl bg-gray-200 shadow-sm shadow-gray-500 xl:px-28 lg:px-24 sm:px-24' onClick={() => register()}>Register Now</Link>
            </div>
          </form>
          <div>
            <p className='text-blue-900 text-sm mt-4 text-center'><span className='text-orange-600'>-5% </span>on everything for registered users<br />Get a <span className='text-orange-600'>discount cupon</span></p>
            <p className='text-blue-900 text-sm mt-4 text-center'><span className='text-orange-600'>GOOGLE</span></p>
          </div>
          <div className='flex justify-end pb-2 mr-2'>
            <div className='w-10 h-10 bg-white shadow-sm shadow-gray-600 rounded-full flex items-center justify-center cursor-pointer'>
              <Link to='/' ><Icon icon="ph:x" className='text-xl' /></Link>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Register;