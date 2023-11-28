import React, { useState, useEffect } from 'react';
import iconBolso from '/Icons/icons8-bolsa-de-compras-48.png'
import { Icon } from '@iconify/react';

import { Link } from "react-router-dom";

import { motion } from "framer-motion"
import { useDispatch } from 'react-redux';


const Hero = () => {
    const [descMenu, setDescMenu] = useState([]);
    // const [categorias, setCategorias] = useState([]);
    const [data, setData] = useState({ number: '' });
    const [ofert, setOfert] = useState(0);
    const [usuarioId, setUsuarioId] = useState("")

    const dispatch = useDispatch();

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
    }, [])

    useEffect(() => {

        const obtenerProductos = async () => {
            await fetch('http://localhost:5172/api/menu/obtenerProductos', {
                method: "GET",
                credentials: 'include',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('no se conecto')
                    }
                    return response.json()
                })
                .then(data => {

                    const updatedData1 = data
                        .filter(item => (item.ofertaDescuentoProducto > 0))
                        .map(item => ({
                            id: item._id,
                            title: item.nombreProducto,
                            // subtitle: categorias.filter(itemCat => item.categoriaProducto === itemCat._id).map(itemCat => itemCat.nombreCategoria),
                            subtitle: item.detallesOferta,
                            detail: item.ingredientesProducto + ".",
                            other: "Mr.Chef",
                            image: item.imgUrlProducto,
                            valor: item.valorProducto,
                            descount: item.ofertaDescuentoProducto,
                            stock: item.stockProducto,
                            puntosOferta: item.pointProducto
                        }))
                    setDescMenu(updatedData1);


                })
                .catch(error => console.error('Error no se pudo obtener:', error))
        }

        obtenerProductos()
            .then(() => console.log("paso2"))
            .catch((error) => console.log(error))

    }, [])

    useEffect(() => {
        fetch('Json/Data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('no se conecto');
                }
                return response.json();
            })
            .then(data => {
                setData(data['data'][0]);


            })


            .catch(error => console.error('Error no se pudo obtener:', error)); // Manejo de errores en caso de falla en la solicitud
    }, []);

    useEffect(() => {
        fetch('http://localhost:5172/api/menu/obtenerOfertas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('no se conecto');
                }
                return response.json();
            })
            .then(data => {
                setDescMenu(data);
                /* setData(data['data'][0]); */
            })

            .catch(error => console.error('Error no se pudo obtener:', error)); // Manejo de errores en caso de falla en la solicitud
    }, []);


    const handleBotonClick = async (productoId, usuarioId, quantity) => {
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

    let valorDesc = descMenu[ofert]?.valor * (1 - (descMenu[ofert]?.descount / 100))

    const TiempoEspera = () => {
        function esperar(milisegundos) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let set = ofert + 1
                    set < descMenu.length ? setOfert(set) : setOfert(0)
                }, milisegundos);
            });
        }

        async function ejemploEsperar() {
            await esperar(5000); // Espera 7 segundos (7 Segundos)
        }

        ejemploEsperar();
    }
    TiempoEspera()



    return (
        <>

            <div id="hero"
                className='w-full h-[100vh] bg-gray-100 bg-fondoAzul bg-no-repeat bg-right
         xll:bg-right-top xll:h-[60vh] lg:h-[70vh] lg:bg-right-top sm:bg-right-top sm:h-[50vh] sm:bg-fondoAzulSmall xs:h-[60vh]'>

                <div className='flex flex-row justify-around items-center h-full lg:items-center sm:items-center sm:pl-2 '>

                    <motion.div
                        className=''
                        key={ofert}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >

                        <p className='font-lobster text-7xl text-blue-950 2xl:text-4xl lg:text-3xl sm:text-2xl  xs:whitespace-nowrap'>
                            <strong>{descMenu[ofert]?.title}</strong>
                        </p>
                        <p className='font-lobster text-4xl text-orange-500 my-2 2xl:text-2xl lg:text-xl xlsm:text-xl'>
                            {descMenu[ofert]?.subtitle}
                        </p>
                        <p className='font-roboto text-xl mb-2 w-2/3 2xl:text-lg lg:text-base sm:text-base sm:text-blue-950'>
                            {descMenu[ofert]?.detail} <strong className='text-gray-900'>{descMenu[ofert]?.other}</strong>
                        </p>


                        <div >
                            <div className='sm:flex sm:flex-row'>
                                <div className='sm:px-2'>
                                    <p className='font-lobster text-gray-400 line-through text-2xl 2xl:text-xl sm:text-sm xs:text-base '><strong>{descMenu[ofert]?.valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</strong></p>
                                </div>

                                <p className='font-lobster text-4xl text-blue-950  2xl:text-3xl sm:text-2lg  xs:text-xl'>
                                    <strong>{valorDesc.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</strong>
                                </p>
                            </div>

                            <Link className='my-2 bg-yellow-300 p-3 rounded-xl shadow-2xl flex items-center hover:bg-yellow-400 hover:translate-x-[1px] hover:translate-y-[1px]
                                            xs:px-4 xs:py-2
                                            sm:p-1
                                            md:px-6 md:py-2
                                            2xl:px-6 2xl:py-2 '
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleBotonClick(descMenu[ofert]?.id, usuarioId, 1)
                                }}>
                                <div className='w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center
                                            sm:w-5 sm:h-5
                                            2xl:w-[3em] 2xl:h-[3em]'>
                                    <img className='w-5 h-5
                                        sm:w-3 sm:h-3
                                                2xl:w-[2em] 2xl:h-[2em]
                                ' src={iconBolso} alt="" />
                                </div>
                                <span className='text-xl ml-2
                                    2xl:text-lg lg:text-base
                                            md:ml-2 md:text-base
                                            sm:text-sm
                                            
                                            '
                                >
                                    {data.boton1}
                                </span>
                            </Link>


                        </div>

                        <div className='flex pt-2'>
                            {descMenu.map((key, index) => (
                                <div
                                    key={key}
                                    className={`h-1 rounded-sm mr-2  ${ofert == index ? 'bg-orange-500 w-6' : 'bg-gray-500 w-2'}`}
                                >
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* DIVISION DEL CONTENEDOR */}

                    <div className=''>
                        <motion.img
                            key={ofert}
                            className='relative right-60 bottom-4 rounded-full w-64 h-64 xll:right-0 xl:w-72 xl:h-72 lg:w-60 lg:h-60 sm:pr-2 sm:w-60 sm:h-60'
                            src={descMenu[ofert]?.image}
                            alt=""
                            initial={{ rotate: 180 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                </div>

            </div>

            {/* DIVISION DEL CONTENEDOR INFERIOR*/}

            <div className='relative bottom-60 xll:bottom-32 xl:bottom-24 sm:bottom-12 sm:bg-gray-100 xs:bottom-0 xxs:bg-gray-100 xs:pb-2'>

                <div className='flex flex-row items-center justify-around'>
                    <div className='flex flex-row  items-center lg:hidden sm:hidden xs:hidden'>
                        <Icon icon="iconoir:delivery-truck" hFlip={true} width="60" color="orange" />

                        <span className='text-2xl ml-2 text-blue-950 underline
                                  md:text-xs
                                  2xl:text-2xl'>
                            <strong>
                                {data.number}
                            </strong>
                        </span>
                    </div>

                    <div class="lg:hidden sm:hidden xs:hidden">
                        <Icon icon="tabler:arrow-big-down-lines" width="40" color="orange" />
                    </div>

                    <div className='flex flex-row bg-white p-4 rounded-xl items-center shadow-2xl sm:bg-blue-950 sm:my-2 lg:mt-10'>
                        <div className=''>
                            <p className='
                        sm:text-white xs:text-sm
                                    lg:text-sm
                                    2xl:text-black 2xl:text-2xl
  
                                    '>{data.registerText}
                            </p>
                            <p className='text-orange-500
                                    lg:text-sm
                                    2xl:text-2xl
                                    
                    '>{data.cuponText}</p>
                        </div>
                        <div className='flex flex-col-reverse'>
                            <Link to="/register"
                                className=' bg-yellow-300 shadow-sm shadow-gray-500/50 ml-4 hover:bg-yellow-400 hover:translate-x-[1px] hover:translate-y-[1px] 
                                    h-[2em] rounded-xl flex items-center px-5
                                    lg:px-1
                                    2xl:text-lg
                                    '>
                                <span className='
                                    lg:text-sm
                                    2xl:text-xl'>{data.boton2}
                                </span>
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export { Hero };
