import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-md shadow-md flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-4">Página no encontrada</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            // Puedes manejar la redirección aquí
            // window.location.href = '/ruta-de-redireccion';
          }}
        >
          <Link to="/">Volver al inicio</Link>
          
        </motion.button>
      </motion.div>
    </div>
  );
};

export { NotFound };