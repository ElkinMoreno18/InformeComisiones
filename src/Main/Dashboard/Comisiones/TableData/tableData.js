import React from "react";
import TableRow from "./tableRow/tableRow";

class tableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  MonthPresupuesto = this.props.data.presupuestoMensual;
  // console.log(MonthPresupuesto + "Received")

  crearFila(month, presupuestoVenta) {
    return {
      month: month,
      pptoVenta: presupuestoVenta,
      VentaEjecutada: 0,
      porcCumplimiento: 0,
      ClienteActual: 0,
      Porcentaje: 0,
      PorcentajeNuevo: 0,
      ClienteNuevo: 0,
      PresupuestoAcumulado: 0,
      ComisionAct: 0,
      ComisionNue: 0,
      salarioTotal: 0,
    };
  }

  render() {
    var monthPpto = this.props.data.presupuestoMensual;
    var monthSalary = this.props.data.salario;

    var fecha = new Date();
    var items = [];

    items.push(this.crearFila(1, "-"));

    for (let index = 1; index < 4 + 1; index++) {
      items.push(this.crearFila(index + 1, monthPpto));
    }

    let itemAnterior = null;

    const body = items.map((item, index) => {
      if (index > 1) {
        itemAnterior = items[index - 1];
      }

      return <TableRow item={item} itemAnterior={itemAnterior} key={index} salarioMensual={monthSalary}/>;
    });

    return (
      <>
        <table>
          <thead>
            <tr>
              <td>Mes</td>
              <td>PptoVenta</td>
              <td>Venta Ejecutada</td>
              <td>% Cumplimiento</td>
              <td>Cliente Facturando</td>
              <td>%</td>
              <td>Cliente Nuevo</td>
              <td>%</td>
              <td>Ppto Acumulado</td>
              <td>Comision Actual</td>
              <td>Comision Nueva</td>
              <td>Comisiones Total</td>
              <td>Salario Total</td>
            </tr>
          </thead>
          <tbody>
              {body}
          </tbody>
        </table>
      </>
    );
  }
}

export default tableData;