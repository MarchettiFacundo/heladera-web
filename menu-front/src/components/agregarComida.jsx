import Swal from 'sweetalert2';
import { Button } from 'antd';
import { Timestamp } from 'firebase/firestore';


const FormularioAgregar = ({ onAgregar }) => {
  const mostrarModal = async () => {
 const { value: formValues } = await Swal.fire({
      title: 'Agregar comida',
      html: `
        <div style="
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        ">
          <input id="swal-nombre" class="swal2-input" placeholder="Nombre" />
          <input id="swal-cantidad" type="number" class="swal2-input" placeholder="Cantidad" />
          <input id="swal-fecha" type="date" class="swal2-input" />
        </div>
      `,
      customClass: {
        popup: 'custom-modal'
      },
      confirmButtonText: 'Agregar',
      focusConfirm: false,
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <Button
        style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
        type="primary"
        onClick={mostrarModal}
      >
        Agregar comida
      </Button>
    </div>
  );
};
export default FormularioAgregar;
