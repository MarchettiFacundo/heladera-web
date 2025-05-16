import React from 'react';
import { Table, Button, Space } from 'antd';

const TablaComidas = ({ comidas, onActualizarCantidad }) => {
  const columns = [
    {
      title: 'Comida',
      dataIndex: 'nombre',
      key: 'nombre',
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
      responsive: ['sm'], // Visible desde sm (small) en adelante
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
      sorter: (a, b) => a.cantidad - b.cantidad,
      responsive: ['xs', 'sm', 'md'],
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
      responsive: ['md'], // Visible en md (tablets) para arriba
      render: (fecha) => fecha ? fecha.toDate().toLocaleDateString('es-AR') : '-',
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
      pagination={{ pageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
      scroll={{ x: 700 }}
      bordered
      style={{ marginTop: 20, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: 8 }}
    />
  );
};

export default TablaComidas;
