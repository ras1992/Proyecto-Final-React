import { Icon } from '@iconify/react';
const Contact = () => {
    const textoContacts = [
        {
            titulo: "Delivery",
            icono: "tabler:truck-delivery",
            texto: "+54923232323322"
        },
        {
            titulo: "Dirección",
            icono: "ion:location-outline",
            texto: "Bolivar esquina Junín, Posadas, Misiones"
        },
        {
            titulo: "Horarios de atención:",
            icono: "tabler:clock-hour-3",
            texto: "8:00-21:00"
        },
    ];

    return (
        <div
            id="contact" 
        >
            <div className={`w-full h-auto mt-16 ${(window.location.pathname === '/contact') && 'h-[70vh]'}`}>
                <h2 className='text-center font-lobster text-blue-950 text-4xl mb-2'>Contacts</h2>
                <div className="flex items-center justify-evenly bg-contact bg-cover bg-no-repeat w-full h-auto px-4 sm:flex-col sm:bg-center">
                    <div className="sm:p-8">
                        {textoContacts.map((data, index) => (
                            <div key={index} className='text-white my-8 xl:my-4 sm:my-4'>

                                <h3 className="font-lobster font-normal text-2xl sm:text-lg">{data.titulo}</h3>
                                <div className='flex flex-row items-center'>
                                    <Icon icon={data.icono} hFlip={true} width="20" color='#F56903' />
                                    <p className='text-xl ml-2 xl:text-base sm:text-base'>{data.texto} </p>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="w-[60%] py-4 sm:w-[90%] xs:py-1">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5789.516149584768!2d-55.89288733418452!3d-27.36513095255854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1697731124301!5m2!1ses!2sar"
                            className="w-full rounded-md h-[50vh] lg:h-[30vh] sm:h-[40vh] xs:h-[30vh]"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>

                    </div>

                </div>

            </div>


        </div>
    )
}

export { Contact }