import React, { useState, useEffect } from "react";
//import {motion} from "framer-motion";
import bolsitacompra from "/img/menu/icons-bolsitacompra.svg";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';

const Search = () => {

    const [usuarioId, setUsuarioId] = useState("");
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [search, setSearch] = useState("");
    const [categoria, setCategoria] = useState([]);
    const [mal, setMal] = useState("");

    const [botonClick, setBotonClick] = useState(false);
    //envio datos
    const dispatch = useDispatch();

    useEffect(() => {
        // const refresh = useSelector((state) => state.actSeleccion)
        const cacheFeo = localStorage.getItem('cacheSearch')
        const search = cacheFeo.replace(/^"|"$/g, '');
        setSearch(search)
        console.log(search)

    }, []);

    for (var i = 0; i < 5; i++) {
        setTimeout(() => {
            setMal(i)
        }, 200);

    }
    useEffect(() => {
        const cacheFeo = localStorage.getItem('cacheSearch')
        const search = cacheFeo.replace(/^"|"$/g, '');
        setSearch(search)

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
        const fetchData1 = async () => {
            try {
                const URL = "http://localhost:5172/api/menu/obtenerProductos"
                const response = await fetch(`${URL}`, {
                    method: "GET",
                    credentials: 'include',
                })

                if (!response.ok) {
                    console.error('Error en la respuesta:', response.status, response.statusText)
                    throw new Error('No se pudo obtener la respuesta esperada')
                }
                const data = await response.json()
                setProductos(data)

            } catch (error) {
                console.error('Error no se pudo obtener:', error)
            }
        }


        const fetchCategoria = async () => {
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
                setCategoria(data);
            } catch (error) {
                console.error('Error no se pudo obtener:', error);
            }
        };

        const filtro = async (asd) => {
            console.log(asd)
            // const regex = new RegExp(search.replace(/\s+/g, '|'), 'i')
            const regex = new RegExp(`\\b${asd}\\b`, 'i');
            // console.log(regex)
            const productosFiltrados = await productos.filter(producto =>
                regex.test(producto.nombreProducto.toLowerCase()) ||
                regex.test(producto.ingredientesProducto.toLowerCase())
            )
            setProductosFiltrados(productosFiltrados)
        }

        const on = async () => {

            fetchData()
                .then(() => console.log("paso1"))
                .catch((error) => console.log(error))

            fetchData1()
                .then(() => console.log("paso2"))
                .catch((error) => console.log(error))

            fetchCategoria()
                .then(() => console.log("paso3"))
                .catch((error) => console.log(error))

            filtro(search)
                .then(() => console.log("paso4"))
                .catch((error) => console.log(error))

        }

        on()


    }, [mal])






    const handleBotonClick = async (productoId, usuarioId, quantity) => {
        if (botonClick) {
            return; // Evitar múltiples clics simultáneos
        }
        setBotonClick(true);
        setTimeout(() => {
            setBotonClick(false);
        }, 1000);

        const img = document.getElementById('imageId');
        if (img) {
            img.style.transform = 'translate(50vw, -50vh)';
        }


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

    const categoriaNombre = (info) => {
        console.log(info)
        const cat = categoria.filter(data => data._id === info)
        return cat[0].nombreCategoria
    }


    return (
        <>
            <h1 className="text-4xl">Search: {search}</h1>

            {productosFiltrados.map((data, key) => (
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
                        <img id="imageId" className={`w-40 h-40 rounded-full -mt-16 ml-8 ${botonClick ? 'transform transition-transform duration-700' : ''}`} src={data.imgUrlProducto} alt="" />
                        <p className="mt-2 text-sm text-gray-400">{categoriaNombre(data.categoriaProducto)}</p>
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
                            handleBotonClick(data._id, usuarioId, 1)
                        }}
                        disabled={data.stockProducto <= 10 ? 'disable' : ''}
                    >

                        <img src={bolsitacompra} alt="" className="flex items-center p-1" />
                        <span>{data.stockProducto <= 10 ? <strong className="text-red-600">Sin Stock</strong> : 'Add To Cart'}</span>
                    </button>
                </div>
            ))}


        </>
    )
}




export { Search }