import React, { useState, useEffect } from "react";
//import {motion} from "framer-motion";
import bolsitacompra from "/img/menu/icons-bolsitacompra.svg";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

const Submenu = () => {
  const [botonClick, setBotonClick] = useState(false);
  const [data, setData] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  //envio datos
  const dispatch = useDispatch();



  const refresh = useSelector((state) => state.actSeleccion)
  const cate = localStorage.getItem('cachedData')
  const cat = cate.replace(/^"|"$/g, '');

  // //cambia el submenu CATEGORIA
  // let location =useLocation();
  // const cat=location.state.id


  useEffect(() => {

    const fetchData = async () => {
      try {
        const URL = "http://localhost:5172/api/menu/userId"
        const response = await fetch(`${URL}`, {
          method: "GET",
          credentials: 'include',
        })

        if (!response.ok) {
          console.error('Error en la respuesta:', response.status, response.statusText);
          throw new Error('No se pudo obtener la respuesta esperada');
        }
        const data = await response.json();
        setUsuarioId(data.usuario.userId)
      } catch (error) {
        console.error('Error no se pudo obtener:', error);
      }
    };
    fetchData();
  }, []);



  const handleBotonClick = async (key, productoId, usuarioId, quantity) => {
    if (botonClick) {
      return; // Evitar múltiples clics simultáneos
    }
    setBotonClick(true);
    setTimeout(() => {
      setBotonClick(false);
    }, 1000);

    const img = document.getElementById(key);
    if (img) {
      const carrito = document.getElementById('carritoBolsa');
      const rectProducto = img.getBoundingClientRect();
      const rectCarrito = carrito.getBoundingClientRect();

      const traslacionX = rectCarrito.left - rectProducto.left;
      const traslacionY = rectCarrito.top - rectProducto.top;
      console.log(traslacionX, traslacionY)

      img.style.transform = `translate(${traslacionX}vw, ${traslacionY}vh)`;
      img.style.opacity = '0.5';
      img.style.scale = '0.2';
    }

    setTimeout(() => {
      img.style.transform = 'translate(0, 0)';
      img.style.opacity = '1';
      img.style.scale = '1';
    }, 700)

    try {

      const URL = "http://localhost:5172/api/menu/cargarCarrito";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productoId,
          usuarioId,
          quantity,
          option: true,
        }),
      });

      if (!response.ok) {
        console.error('Error en la respuesta:', response.status, response.statusText);
        throw new Error('No se pudo agregar al carrito');
      }

      // Manejar la respuesta del backend si es necesario
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error al procesar la solicitud:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }

    dispatch({ type: 'ACTUALIZAR_NUM_CARRO', payload: productoId })

  }


  useEffect(() => {

    const fetchData = async (cat) => {
      try {
        const URL = "http://localhost:5172/api/menu/obtenerProductosCategoria/"
        const response = await fetch(`${URL}${cat}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Error en la respuesta:', response.status, response.statusText);
          throw new Error('No se pudo obtener la respuesta esperada');
        }

        const data = await response.json();
        setData(data);
        console.log(data)
      } catch (error) {
        console.error('Error no se pudo obtener:', error);
      }
    };
    fetchData(cat);
  }, [refresh]);

  useEffect(() => {
    const fetchCategoria = async (cat) => {
      try {
        const URL = "http://localhost:5172/api/menu/obtenerCategoria/"

        const response = await fetch(`${URL}${cat}`, {
          method: "GET",
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Error en la respuesta:', response.status, response.statusText);
          throw new Error('No se pudo obtener la respuesta esperada');
        }

        const data = await response.json();
        setCategoria(data);
        console.log(data)
      } catch (error) {
        console.error('Error no se pudo obtener:', error);
      }
    };


    fetchCategoria(cat);
  }, [refresh]);


  return (
    <>
      <div className="text-center text-4xl font-lobster p-4 mb-20 text-blue-950 mt-4 sm:text-3xl m-8">
        {categoria.nombreCategoria}
      </div>

      <div className="grid grid-cols-4 2xl:grid-cols-4 xl:grid-cols-3 xxl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 pt-8 m-8">
        {data.map((data, key) => (
          <div
            key={key}
            className="relative justify-center w-full h-60 mb-16 bg-gray-800 rounded-xl text-white text-center"
          >
            <div className="justify-center w-full h-40 mt-4 bg-gray-800 rounded-xl text-white text-center">
              <span className="text-2xl">{data.nombreProducto}</span>
              <div className="w-full h-px bg-gray-300 my-4"></div>
              <span className="">{data.ingredientesProducto}</span>
              <div className="w-full h-px bg-gray-300 my-4"></div>
              <span className="text-2xl">{data.pesoProducto} g</span>
            </div>
            <div className=" absolute top-0 right-0 w-full p-2 bg-gray-800 rounded-xl text-white text-center hover:opacity-0">
              <img id={key} className={`w-40 h-40 rounded-full -mt-16 ml-8 ${botonClick ? 'transform transition-transform duration-700' : ''}`} src={data.imgUrlProducto} alt="" />
              <p className="mt-2 text-sm text-gray-400">{categoria.nombreCategoria}</p>
              <p className="text-2xl">{data.nombreProducto}</p>
              <p className="text-2xl pt-2" >
                ${data.valorProducto.toLocaleString('es-ES', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <button className={`py-2 px-4 mt-10 inline-flex items-center font-sans text-xm text-black bg-white rounded-lg border-2 border-black transition duration-300 ${botonClick ? 'bg-orange-700' : 'hover:bg-yellow-400 '}`}
              onClick={(e) => {
                e.preventDefault();
                handleBotonClick(key, data._id, usuarioId, 1)
              }}
              disabled={data.stockProducto <= 10 ? 'disable' : ''}
            >

              <img src={bolsitacompra} alt="" className="flex items-center p-1" />
              <span>{data.stockProducto <= 10 ? <strong className="text-red-600">Sin Stock</strong> : 'Agregar al carrito'}</span>
            </button>
          </div>
        ))}
      </div>
    </>


  );
};

export default Submenu;




