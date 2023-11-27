import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

const Carrusel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt="Carousel Image"
          className="w-full h-full rounded-b-xl rounded-l-xl sm:rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <div className="flex justify-between absolute top-0 left-2 right-2 bottom-0 items-center">
        <button
          onClick={prevImage}
          className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center focus:bg-yellow-300 xs:w-10 xs:h-10"
        >
          <Icon icon="ooui:next-ltr" hFlip={true} width={30} className='' />
        </button>
        <button
          onClick={nextImage}
          className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center focus:bg-yellow-300 xs:w-10 xs:h-10"
        >
          <Icon icon="ooui:next-ltr" width={30} />
        </button>
      </div>
    </div>
  );
};

export default Carrusel;
