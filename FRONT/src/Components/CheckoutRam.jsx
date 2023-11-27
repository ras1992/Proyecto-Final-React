import React, { useState, useEffect } from 'react'
import './CheckoutRam'
import { Link } from "react-router-dom"

import Select from 'react-select'



// Problema en el select 2 veces click para visualizar

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const Checkout = () => {
    const [textDropdown, setTextDropdown] = useState([])

    const [descuento, setDescuento] = useState(0)
    const [subTotalPrice, setSubTotalPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [carrito, setCarrito] = useState([])
    const [data, setData] = useState([])
    const [bagDropdown, setBagDropdown] = useState([])

    const [delivery, setDelivery] = useState(20)

    const [dataText, setDataText] = useState([])
    const [userData, setUserData] = useState([])

    const [checkboxSeleccionado, setCheckboxSeleccionado] = useState(true)

    const [idCanastaProducto, setIdCanastaProducto] = useState({
        _idUnicaProducto: Date.now().toString(),
    })

    const [usuarioId, setUsuarioId] = useState("")
    const [selectedOption, setSelectedOption] = useState(null)


    const [puntosUser, setPuntosUser] = useState(0)
    const [cuponesUsados, setCuponesUsados] = useState([])


    const [pagoModal, setPagoModal] = useState(false)

    const [puntos, setPuntos] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const URL = "http://localhost:5172/api/menu/userId"
                const response = await fetch(`${URL}`, {
                    method: "GET",
                    credentials: 'include',
                })

                if (!response.ok) {
                    console.error('Error en la respuesta:', response.status, response.statusText)
                    throw new Error('No se pudo obtener la respuesta esperada')
                }
                const data = await response.json()
                setUsuarioId(data.usuario.userId)
            } catch (error) {
                console.error('Error no se pudo obtener:', error)
            }
        }
        const fetchData1 = async () => {
            try {
                const URL = "http://localhost:5172/api/menu/obtenerCarrito/"
                const response = await fetch(`${URL}${usuarioId}`, {
                    method: "GET",
                    credentials: 'include',
                })

                if (!response.ok) {
                    console.error('Error en la respuesta:', response.status, response.statusText)
                    throw new Error('No se pudo obtener la respuesta esperada')
                }

                const data = await response.json()
                setBagDropdown(data)
                console.log(data)
            } catch (error) {
                console.error('Error no se pudo obtener:', error)
            }
        }
        const fetchData2 = async () => {
            try {
                const URL = "http://localhost:5172/api/menu/registerUser_getOne/"
                const response = await fetch(`${URL}${usuarioId}`, {
                    method: "GET",
                    credentials: 'include',
                })

                if (!response.ok) {
                    console.error('Error en la respuesta:', response.status, response.statusText)
                    throw new Error('No se pudo obtener la respuesta esperada')
                }

                const data = await response.json()
                setPuntosUser(data.puntosCompras)
                setCuponesUsados(data.cuponesUsados)
            } catch (error) {
                console.error('Error no se pudo obtener:', error)
            }
        }

        try {
            fetchData()
            fetchData1()
            fetchData2()
        } catch (error) {
            console.error("Error CADEna:", error)
        }


    }, [usuarioId, puntosUser])



    useEffect(() => {
        const fetchData = async () => {
            try {
                const URL = "http://localhost:5172/api/menu/registerUser_getOne/"
                const response = await fetch(`${URL}${usuarioId}`, {
                    method: "GET",
                    credentials: 'include',
                })

                if (!response.ok) {
                    console.error('Error en la respuesta:', response.status, response.statusText)
                    throw new Error('No se pudo obtener la respuesta esperada')
                }

                const data = await response.json()
                setUserData(data)
            } catch (error) {
                console.error('Error no se pudo obtener:', error)
            }
        }
        fetchData()
    }, [usuarioId, puntosUser])

    useEffect(() => {

        const fetchData = async () => {
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
                setData(data)

            } catch (error) {
                console.error('Error no se pudo obtener:', error)
            }
        }
        fetchData()
    }, [usuarioId, puntosUser])



    useEffect(() => {
        const obtenerProductosEnCarrito = async () => {
            console.log(data)
            console.log(bagDropdown)
            // Filtrar los productos que coinciden con la condición
            const productosEnCarrito = data.map(producto => {
                const carritoItem = bagDropdown.find(item => item.productoId === producto._id)
                return carritoItem ? { ...producto, quantity: carritoItem.quantity, productoId: carritoItem.productoId, usuarioId: carritoItem.usuarioId } : null
            }).filter(Boolean)

            // Actualizar el estado con la información de los productos en el carrito

            const updatedData0 = productosEnCarrito.map(item => ({
                id: item._id,
                productoId: item.productoId,
                usuarioId: item.usuarioId,
                image: item.imgUrlProducto,
                title: item.nombreProducto,
                price: item.valorProducto,
                newPrice: item.valorProducto * item.quantity,
                stock: item.stockProducto,
                quantity: item.quantity,
                puntosProducto: item.pointProducto
            }))
            await setCarrito(updatedData0)
            console.log(carrito)
        }

        // Llama a la función en el lugar adecuado de tu código
        obtenerProductosEnCarrito()
    }, [data, bagDropdown, puntosUser])

    useEffect(() => {
        const newSubTotalPrice = carrito.reduce((total, item) => total + (item.price * item.quantity), 0)

        const TotalPrice = newSubTotalPrice - (newSubTotalPrice * (descuento / 100)) + (checkboxSeleccionado ? delivery : 0)
        setSubTotalPrice(newSubTotalPrice)
        setTotalPrice(TotalPrice)


    }, [carrito, descuento, checkboxSeleccionado])

    useEffect(() => {
        fetch('http://localhost:5172/api/menu/obtenerCupones', {
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
                    .filter(item => (!(cuponesUsados.includes(item._id))) && (item.level <= (puntosUser / 500)))
                    .map(item => ({
                        value: item._id,
                        level: item.level,
                        label: item.title,
                        used: item.used,
                        unlock: item.unlock,
                        stars: item.stars,
                        discount: item.discount,
                        colorTicket: item.colorTicket,
                    }))

                setTextDropdown(updatedData1)

            })
            .catch(error => console.error('Error no se pudo obtener:', error)) // Manejo de errores en caso de falla en la solicitud
    }, [puntosUser])



    const handleChange = selectedOption => {
        setSelectedOption(selectedOption)
        setDescuento(selectedOption ? selectedOption.discount : 0)
    }

    const SelectCupon = () => {
        return (
            <Select
                options={textDropdown}
                value={selectedOption}
                onChange={handleChange}
                placeholder="Selecciona un cupón"
            />
        )
    }


    const eliminaCarrito = async () => {
        try {
            const URL = "http://localhost:5172/api/menu/eliminarCarritoUser/" // Reemplaza con la ruta correcta
            const response = await fetch(URL, {
                method: "DELETE",
                credentials: "include",
            })

            if (!response.ok) {
                console.error('Error en la respuesta:', response.status, response.statusText)
                throw new Error('No se pudo agregar al carrito')
            }

            const responseData = await response.json()
            console.log(responseData)
            window.location.href = '/'
        } catch (error) {
            console.error('Error al agregar al carrito:', error)
        }
    }

    const insertaCupon = async () => {
        try {
            const URL = "http://localhost:5172/api/menu/agregarCuponUsado"
            const punto = await carrito.reduce((total, item) => total + (item.puntosProducto * item.quantity), 0)

            const response = await fetch(URL, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cuponId: selectedOption ? selectedOption.value : "nada",
                    puntosSumados: punto,
                }),
            })

            if (!response.ok) {
                console.error('Error en la respuesta:', response.status, response.statusText)
                throw new Error('No se pudo obtener la respuesta esperada')
            }
            const data = await response.json()

        } catch (error) {
            console.error('Error no se pudo obtener:', error)
        }
    }

    const quitarStock = async () => {
        const obCanasta = carrito.map(item => ({
            productoId: item.productoId,
            quantity: item.quantity,
        }))

        const URL = "http://localhost:5172/api/menu/actualizarRestarStockProducto"
        try {
            const response = await fetch(`${URL}`, {
                method: "PATCH",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    obCanasta
                }),
            })

            if (!response.ok) {
                console.error('Error en la respuesta:', response.status, response.statusText)
                throw new Error('No se pudo obtener la respuesta esperada')
            }

            // const data = await response.json()
            // console.log(data)

        } catch (error) {
            console.error('Error en la solicitud del producto:', error)
        }
    }


    const guardaDatosProductoComprado = async () => {
        const Data = carrito.map(item => ({
            productoId: item.productoId,
            quantity: item.quantity,
        }))

        try {
            const URL = "http://localhost:5172/api/menu/finalizarCompra"
            const valorDelivery = (checkboxSeleccionado ? delivery : 0)
            const del = (valorDelivery > 0) ? true : false
            const price = (totalPrice - valorDelivery)
            const descontadoCupon = selectedOption ? selectedOption.discount : 0

            const response = await fetch(URL, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuarioId,
                    carritoId: idCanastaProducto._idUnicaProducto,
                    carritoProductos: Data,
                    delivery: del,
                    pagado: price,
                    descuento: descontadoCupon,
                    cupon: selectedOption ? selectedOption.value : "SinCupon",
                }),
            })
            if (!response.ok) {
                console.error('Error en la respuesta:', response.status, response.statusText)
                throw new Error('No se pudo agregar al carrito')
            }

            const responseData = await response.json()

        } catch (error) {
            console.error('Error al agregar al carrito:', error)
        }

    }

    const pagar = async () => {

        //guarda la compra realizada
        guardaDatosProductoComprado()
            .then(() => console.log("paso1"))
            .catch((error) => console.log(error))
        //Agrega al usuario el cupon usado
        insertaCupon()
            .then(() => console.log("paso2"))
            .catch((error) => console.log(error))

        //Quita productos del stock
        quitarStock()
            .then(() => console.log("paso3"))
            .catch((error) => console.log(error))

        //Elimina carrito
        eliminaCarrito()
            .then(() => console.log("paso4"))
            .catch((error) => console.log(error))

    }

    const handleQuantityChange = (index, newQuantity, basePrice, operation) => {
        console.log(index, newQuantity)
        newQuantity = Math.max(1, newQuantity)

        if (operation === "-") {
            newQuantity--
        } else {
            newQuantity++
        }

        const newPrice = basePrice * newQuantity

        setCarrito(prevBagDropdown => {
            const updatedBagDropdown = [...prevBagDropdown]
            updatedBagDropdown[index].quantity = newQuantity
            updatedBagDropdown[index].newPrice = newPrice
            return updatedBagDropdown
        })
    }

    const eliminarDeCarrito = (index, id) => {
        const nuevoCarrito = carrito.filter(item => item.id !== id)
        setCarrito(nuevoCarrito)
        console.log('Elemento eliminado del carrito:', id)
    }


    const handleCheckboxChange = () => {
        setCheckboxSeleccionado(!checkboxSeleccionado)
    }

    const enviarFormulario = async () => {
        console.log(userData)
        try {
            const response = await fetch('http://localhost:5172/api/menu/registerUser_add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: userData.phone,
                    street: userData.street,
                    house: userData.house,
                    entrance: userData.entrance,
                    housePrivate: userData.housePrivate,
                    commentOrder: userData.commentOrder,
                    email: userData.email,
                }),
            })

            // Manejar la respuesta según sea necesario
            if (response.ok) {
                // Éxito
                console.log('Solicitud enviada con éxito')
            } else {
                // Manejar errores
                console.error('Error al enviar la solicitud:', response.statusText)
            }
        } catch (error) {
            console.error('Error:', error.message)
        }
    }

    useEffect(() => {
        fetch('Json/Data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('no se conecto')
                }
                return response.json()
            })
            .then(data => {
                setDataText(data['checkout'][0])
            })
            .catch(error => console.error('Error no se pudo obtener:', error)) // Manejo de errores en caso de falla en la solicitud
    }, [])



    return (
        <>
            <div>

                <div className='2xl:p-4'>
                    back to <strong>Home</strong>
                </div>
                {pagoModal && carrito.length >= 1 ? (
                    <div className="min-h-screen flex items-center justify-center">

                        {/* Fondo desenfocado */}
                        <div className="absolute inset-0 z-10 backdrop-blur"></div>

                        {/* Modal */}
                        <div className="z-20 bg-white p-8 rounded-lg shadow-lg max-w-md w-full">

                            <h2 className="text-2xl font-bold mb-4">Ingresa los datos de tu tarjeta</h2>

                            <form>

                                <div className="mb-4">
                                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-600">Número de Tarjeta</label>
                                    <input type="text" id="cardNumber" name="cardNumber" className="mt-1 p-2 w-full border rounded-md" />
                                </div>

                                <div className="mb-4 flex">
                                    <div className="w-1/2 mr-2">
                                        <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-600">Fecha de Expiración</label>
                                        <input type="text" id="expirationDate" name="expirationDate" placeholder="MM/YY" className="mt-1 p-2 w-full border rounded-md" />
                                    </div>

                                    <div className="w-1/2 ml-2">
                                        <label htmlFor="securityCode" className="block text-sm font-medium text-gray-600">Código de Seguridad</label>
                                        <input type="text" id="securityCode" name="securityCode" className="mt-1 p-2 w-full border rounded-md" />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-600">Nombre del Titular</label>
                                    <input type="text" id="cardholderName" name="cardholderName" className="mt-1 p-2 w-full border rounded-md" />
                                </div>

                                <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => pagar()}>Pagar</Link>

                            </form>

                        </div>
                    </div>
                ) : (

                    <div>

                        <div className='2xl:text-center'>
                            <div className='font-lobster text-4xl'>
                                {dataText.title}
                            </div>
                            <div className='2xl:p-4 2xl:text-sm'>
                                <strong className='text-orange-500'>{dataText.subtitle}</strong> <strong>{dataText.number}</strong>
                            </div>
                        </div>
                        <div className='2xl:grid 2xl:grid-cols-2 sm:grid-cols-1 2xl:gap-4 2xl:justify-center 2xl:p-[1em] 2xl:px-[10.5%]'>
                            <div className='bg-[#050e28] 2xl:p-2 rounded-lg'>
                                <div className='bg-white 2xl:p-4 rounded-lg'>
                                    <p>{dataText.deTitle}</p>
                                    <div>
                                        <input type="checkbox" id="checkbox" checked={checkboxSeleccionado} onChange={handleCheckboxChange} className='' /><span className='2xl:p-2' >{dataText.deOp1}</span>
                                    </div>

                                    <div>
                                        <input type="checkbox" id="checkbox" checked={!checkboxSeleccionado} onChange={handleCheckboxChange} className='' /><span className='2xl:p-2' >{dataText.deOp2}</span>
                                    </div>
                                </div>

                            </div>

                            <div>
                                {/* hola */}
                            </div>

                            <div className={`bg-gray-500 2xl:p-2 rounded-lg ${checkboxSeleccionado ? 'visible' : 'hidden'}`}>
                                <div className='bg-white 2xl:p-4 rounded-lg h-full'>
                                    <p>{dataText.deTitle}</p>
                                    <form className='2xl:flex 2xl:flex-col 2xl:items-cente'>
                                        <input className='2xl:w-full 2xl:mb-4 border-b bg-transparent focus:bg-transparent placeholder:text-gray-600' type='text' placeholder={dataText.adPhone} value={userData.phone} name="phone" onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                                        <input className='2xl:w-full 2xl:mb-4 border-b bg-transparent focus:bg-transparent placeholder:text-gray-600' type='text' placeholder={dataText.adStreet} value={userData.street} name="street" onChange={(e) => setUserData({ ...userData, street: e.target.value })} />
                                        <input className='2xl:w-full 2xl:mb-4 border-b bg-transparent focus:bg-transparent placeholder:text-gray-600' type='text' placeholder={dataText.adHouse} value={userData.house} name="house" onChange={(e) => setUserData({ ...userData, house: e.target.value })} />
                                        <div className='flex 2xl:justify-center 2xl:items-center'>
                                            <input className='2xl:w-full 2xl:mb-4 border-b bg-transparent focus:bg-transparent placeholder:text-gray-600' type='text' placeholder={dataText.adEntrance} value={userData.entrance} name="entrance" onChange={(e) => setUserData({ ...userData, entrance: e.target.value })} />
                                            <input type="checkbox" id="checkbox" name="housePrivate" checked={userData.housePrivate} onChange={(e) => { setUserData({ ...userData, housePrivate: e.target.checked }) }} /> <span className='text-sm'>{dataText.adCheck}</span>
                                        </div>
                                        <input className='2xl:w-full 2xl:mb-4 border-b bg-transparent focus:bg-transparent placeholder:text-gray-600' type='text' placeholder={dataText.adComment} value={userData.commentOrder} name="commentOrder" onChange={(e) => setUserData({ ...userData, commentOrder: e.target.value })} />
                                        <button className='bg-gray-200 2xl:rounded-xl 2xl:h-[2.5em] 2xl:w-full my-[1em] shadow-md shadow-gray-600'
                                            onClick={() => enviarFormulario()}
                                        >
                                            Save edit
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className='bg-gray-500 2xl:p-2 rounded-lg'>
                                <div className='bg-white 2xl:p-3  2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center rounded-lg'>
                                    {carrito.length > 0 && (
                                        <div className='max-h-[400px] min-w-[80%] overflow-y-auto'>
                                            {carrito.map((item, index) => (
                                                <div key={index} className='flex flex-row '>

                                                    <div className='flex mr-8'>
                                                        <img src={item.image} alt={item.title} className='w-16 h-16 rounded-full object-cover' />

                                                    </div>

                                                    <div className='flex flex-col'>
                                                        <div>
                                                            <h4 className='mr-4'>{item.title}</h4>
                                                        </div>
                                                        <div className='flex mt-3 mb-6 '>
                                                            <div className='w-36 flex'>
                                                                {/* Botón para decrementar cantidad */}
                                                                <button
                                                                    className='2xl:w-6 2xl:h-6 rounded-[50%] bg-gray-300 2xl:text-center 2xl:items-center content-center 2xl:text-xl'
                                                                    onClick={() => handleQuantityChange(index, item.quantity, item.price, item.id, "-")}
                                                                    disabled={item.quantity == 1 ? 'disable' : ''}
                                                                >
                                                                    -
                                                                </button>

                                                                <span className='2xl:mx-2'>{item.quantity > 0 ? item.quantity : 1}</span>

                                                                {/* Botón para incrementar cantidad */}
                                                                <button
                                                                    className='2xl:w-6 2xl:h-6 rounded-[50%] bg-yellow-300 2xl:mr-2 2xl:text-center content-center 2xl:text-xl'
                                                                    onClick={() => handleQuantityChange(index, item.quantity, item.price, item.id, "+")}
                                                                >
                                                                    +
                                                                </button>

                                                                <span className=''>{item.newPrice.toLocaleString('es-ES', {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2
                                                                })}
                                                                </span>
                                                            </div>


                                                            <button className='w-6 h-6 rounded-[50%] shadow-sm shadow-black border flex items-center justify-center left-15'
                                                                onClick={() => eliminarDeCarrito(index, item.id)}
                                                                state={{ dataChange1: item._id }}
                                                            >
                                                                x
                                                            </button>

                                                        </div>

                                                    </div>
                                                </div>

                                            ))}
                                            
                                        </div>
                                    )}


                                    < div className='flex flex-col text-gray-400 justify-around w-full'>
                                        <SelectCupon></SelectCupon>
                                        <div>
                                            <strong>Subtotal:</strong>
                                            <strong>
                                                ${subTotalPrice.toLocaleString('es-ES', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </strong>
                                        </div>

                                        <div>
                                            <Link to="/cupons">
                                                <strong>Cupon:</strong>
                                            </Link>

                                            <strong className='text-orange-400'>-{descuento}%</strong>
                                        </div>

                                        <div>
                                            <strong>Delivery:</strong>
                                            <strong className='text-orange-400'>${(checkboxSeleccionado ? delivery : 0).toLocaleString('es-ES', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}</strong>
                                        </div>

                                        <div>
                                            <strong>Total:</strong>
                                            <strong className='text-orange-400'>${totalPrice.toLocaleString('es-ES', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}</strong>
                                        </div>

                                    </div>


                                </div>




                            </div>

                            <div></div>
                            <div className='bg-gray-500 2xl:p-2 rounded-lg '>
                                <div className='bg-white 2xl:p-4 rounded-lg h-full'>
                                    <strong>{dataText.titlePay}</strong>
                                    <div className='flex flex-row place-content-around  2xl:items-center'>
                                        <Link onClick={() => setPagoModal(!pagoModal)} className='bg-gray-500  w-28 h-18 rounded-lg '>
                                            <div className='w-8 h-8 bg-green-500'></div>
                                            <div>{dataText.payOp1}</div>

                                        </Link>
                                        <Link className='bg-red-500 w-28 h-18 rounded-lg '>
                                            <div className='w-8 h-8 bg-green-500'></div>
                                            <div>{dataText.payOp2}</div>

                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div >

                    </div>
                )}
            </div>


        </>
    )
}

export { Checkout }