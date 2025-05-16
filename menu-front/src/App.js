import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './components/firebase';
import { deleteDoc } from 'firebase/firestore';
import TablaComidas from './components/tablaComidas';
import FormularioAgregar from './components/agregarComida';

const App = () => {
  const [comidas, setComidas] = useState([]);
  const ref = collection(db, 'comidas');

  useEffect(() => {
    const unsub = onSnapshot(ref, (snapshot) => {
      setComidas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub; // limpiar listener
  }, []);

  const agregarComida = async (comida) => {
    await addDoc(ref, comida);
  };


const actualizarCantidad = async (id, delta) => {
  const comida = comidas.find(c => c.id === id);
  if (!comida) return;

  const nuevaCantidad = comida.cantidad + delta;

  if (nuevaCantidad <= 0) {
    await deleteDoc(doc(db, 'comidas', id));
  } else {
    await updateDoc(doc(db, 'comidas', id), { cantidad: nuevaCantidad });
  }
};


  return (
    <>
      <FormularioAgregar onAgregar={agregarComida} />
      <TablaComidas comidas={comidas} onActualizarCantidad={actualizarCantidad} />
    </>
  );
};

export default App;
