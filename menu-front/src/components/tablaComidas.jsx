import React from 'react';
import { Table, Button, Space } from 'antd';

const TablaComidas = ({ comidas, onActualizarCantidad }) => {
  const columns = [
    {
      title: 'Comida',
      dataIndex: 'nombre',
      key: 'nombre',
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: (nombre) => (
        <div style={{ wordBreak: 'break-word', maxWidth: 150 }}>{nombre}</div>
      ),
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
      responsive: ['xs', 'sm', 'md'],
      sorter: (a, b) => a.cantidad - b.cantidad,

      render: (cantidad) => (
        <span style={{ color: cantidad === 0 ? '#ff4d4f' : '#52c41a', fontWeight: 'bold' }}>
          {cantidad}
        </span>
      ),
    },
    {
      title: 'Fecha de fabricación',
      dataIndex: 'fecha',
      key: 'fecha',
      sorter: (a, b) => a.fecha?.toDate() - b.fecha?.toDate(),
      render: (fecha) =>
        fecha ? fecha.toDate().toLocaleDateString('es-AR') : '-',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => onActualizarCantidad(record.id, -1)}
            disabled={record.cantidad <= 0}
            type="primary"
            danger
            size="small"
          >
            Comer
          </Button>
          <Button
            onClick={() => onActualizarCantidad(record.id, 1)}
            type="default"
            size="small"
          >
            Sumar
          </Button>
        </Space>
      ),
    },
  ];


  return (
    <Table
      dataSource={comidas}
      columns={columns}
      rowKey="id"
      pagination={false}
      scroll={{ x: 'max-content' }}
      bordered
      style={{
        marginTop: 20,
        borderRadius: 8,
        overflowX: 'auto',
      }}
    />

  );
};

export default TablaComidas;
