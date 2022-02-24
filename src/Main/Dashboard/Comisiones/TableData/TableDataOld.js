import React from "react";
import MaterialTable from "material-table";

const columns = [
  {
    title: "Mes",
    field: "month",
    type: "numeric",
  },
  {
    title: "Presupuesto Venta",
    field: "pptoVenta",
    type: "numeric",
  },
  {
    title: "Venta Ejecutada",
    field: "ventaEjecutada",
    type: "numeric",
  },
  {
    title: "Porcentaje de Cumplimiento",
    field: "porcCumplimiento",
  },
  {
    title: "Cliente Activo",
    field: "clienteAct",
    type: "numeric",
  },
  {
    title: "Porcentaje Actual",
    field: "porc",
  },
  {
    title: "Cliente Nuevo",
    field: "clienteNue",
    type: "numeric",
  },
  {
    title: "Porcentaje Cliente Nuevo",
    field: "porcNue",
  },
  {
    title: "Presupuesto Acumulado",
    field: "pptoAcumulado",
    type: "numeric",
  },
  {
    title: "Comision Actual",
    field: "comisionActual",
    type: "numeric",
  },
  {
    title: "Comision Nueva",
    field: "comisionNueva",
    type: "numeric",
  },
  {
    title: "Comisiones Totales",
    field: "comisionTotal",
    type: "numeric",
  },
  {
    title: "Salario Total",
    field: "salarioTotal",
    type: "numeric",
  },
];

var presu;
var presupuestoVenta,
  pptoAnual = 0,
  VentaEjecutada = 0,
  PorcentajeCumplimiento = 0,
  ClienteActual = 0,
  porcPorcentaje = 0,
  ClienteNuevo = 0,
  PorcentajeNuevo = 0,
  PresupuestoAcumulado = 0,
  pptoVenta = 0,
  Porcentaje = 0,
  percAct = 0,
  percNue = 0,
  ComisionAct = 0,
  ComisionNue = 0,
  monthSalary = 0,
  porcCumplimiento = 0;
var data = [];
let month = 1;
var salarioTotal = 0;

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  MonthPresupuesto = this.props.data.presupuestoMensual;
  // console.log(MonthPresupuesto + "Received")

  render() {
    var monthPpto = this.props.data.presupuestoMensual;
    var monthSalary = this.props.data.salario;
    console.log(monthPpto);
    tableFun(monthPpto, monthSalary);

    return (
      <>
        <MaterialTable
          columns={columns}
          data={data}
          title="Tabla de Comisiones"
          options={{
            headerStyle: {
              backgroundColor: "#d8d8d8",
              color: "black",
            },
          }}
          cellEditable={{
            cellStyle: {},
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return new Promise((resolve, reject) => {
                console.log("newValue: " + newValue);
                setTimeout(resolve, 4000);
              });
            },
          }}
        />
      </>
    );
  }
}

data = [
  {
    month: month,
    pptoVenta: "-",
    VentaEjecutada: "-",
    PorcentajeCumplimiento: "-",
    ClienteActual: "-",
    porcPorcentaje: "-",
    ClienteNuevo: "-",
    PorcentajeNuevo: "-",
    PresupuestoAcumulado: "-",
  },
];

function tableFun(monthPpto, monthSalary) {
  /*  switch (month) {
      case 1:
        data = [
          {
            month: month,
            pptoVenta: "-",
            VentaEjecutada: "-",
            PorcentajeCumplimiento: "-",
            ClienteActual: "-",
            porcPorcentaje: "-",
            ClienteNuevo: "-",
            PorcentajeNuevo: "-",
            PresupuestoAcumulado: "-",
          },
        ];
        break;
      case 2:
        data = [
          {
            month: month,
            pptoVenta: monthPpto,
            VentaEjecutada: 0,
            porcCumplimiento: VentaEjecutada / PresupuestoAcumulado,
            ClienteActual: 0,
            Porcentaje: VentaEjecutada / ClienteActual,
            PorcentajeNuevo: 1 - Porcentaje,
            ClienteNuevo: VentaEjecutada * PorcentajeNuevo,
            PresupuestoAcumulado: pptoVenta,
            ComisionAct:Percentages(Porcentaje),
            ComisionNue: 80,
            salarioTotal: ComisionAct + ComisionNue + monthSalary,
          },
        ];
        break;
    }

    console.log(month + "sdasdsad")
    month++;
    console.log(month + "month2")

    return data; */
}

function Percentages(value) {
  switch (value) {
    case value < 0.5:
      percAct = 0.004;
      percNue = 0.008;
      break;
    case value > 0.51 && value < 0.6:
      percAct = 0.005;
      percNue = 0.0093;
      break;
  }
}

/*
function calcData() {
  for (let month = 1; month <= 12; month++) {
    switch (month) {
      case 1:
        data = [
          {
            month: month,
            pptoVenta: "-",
            VentaEjecutada: "-",
            PorcentajeCumplimiento: "-",
            ClienteActual: "-",
            porcPorcentaje: "-",
            ClienteNuevo: "-",
            PorcentajeNuevo: "-",
            PresupuestoAcumulado: "-",
          },
        ];
        break;
      case 2:
        data = [
          {
            month: month,
            pptoVenta: presupuestoVenta,
            VentaEjecutada: pptoVenta * 0.1,
            porcCumplimiento: VentaEjecutada / PresupuestoAcumulado,
            ClienteActual: "-",
            Porcentaje: VentaEjecutada / 0,
            ClienteNuevo: VentaEjecutada * PorcentajeNuevo,
            PorcentajeNuevo: 1 - Porcentaje,
            PresupuestoAcumulado: pptoVenta,
            ComisionAct: percAct,
            ComisionNue: percNue,
            salarioTotal: ComisionAct + ComisionNue + monthSalary,
          },
        ];
        break;
    }
  }
}
 */
