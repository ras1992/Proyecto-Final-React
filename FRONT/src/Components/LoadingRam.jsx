import React from 'react';
// import logo from '/PIZZA2.svg'
import logoGif from '/pizza2.gif'
const Loading = () => {
    return (
        <>
            <div className='z-50 max-w-full flex justify-center items-center h-screen'>
                <img className='w-80' src={logoGif} alt="" />
            </div>
        </>

    )
}

export { Loading }