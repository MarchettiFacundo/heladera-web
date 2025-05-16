import Swal from 'sweetalert2';
import { Button } from 'antd';
import { Timestamp } from 'firebase/firestore';


const FormularioAgregar = ({ onAgregar }) => {
  const mostrarModal = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar comida',
      html:
        `<input id="swal-nombre" class="swal2-input" placeholder="Nombre">` +
        `<input id="swal-cantidad" type="number" class="swal2-input" placeholder="Cantidad">` +
        `<input id="swal-fecha" type="date" class="swal2-input">`,
      focusConfirm: false,
      confirmButtonText: 'Agregar',
      preConfirm: () => {
        const nombre = document.getElementById('swal-nombre').value;
        const cantidad = parseInt(document.getElementById('swal-cantidad').value);
        const fecha = document.getElementById('swal-fecha').value;
        if (!nombre || !cantidad || !fecha) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }
        return { nombre, cantidad, fecha };
      }
    });

    if (formValues) {
        const fechaDate = new Date(formValues.fecha);

      onAgregar({
        nombre: formValues.nombre,
        cantidad: formValues.cantidad,
        fecha: Timestamp.fromDate(fechaDate),
      });
    }
  };

  return <Button type="primary" onClick={mostrarModal}>Agregar comida</Button>;
};

export default FormularioAgregar;
