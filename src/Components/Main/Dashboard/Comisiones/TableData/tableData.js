import React from "react";
import TableRow from "./tableRow/tableRow";
import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import axios from 'axios';

class tableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.updateItems = this.updateItems.bind(this);
  }

  MonthPresupuesto = this.props.data.presupuestoMensual;

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

  updateItems(item, index) {
    const items = this.state.items;
    items[index] = item;
    this.setState({
      items: items,
    });
  }

  render() {
    var monthPpto = this.props.data.presupuestoMensual;
    var monthSalary = this.props.data.salario;
    var representative = this.props.data.representante;

    var fecha = new Date();

    if (this.state.items.length == 0) {
      this.state.items.push(this.crearFila(1, "-"));
      for (let index = 1; index < 12; index++) {
        this.state.items.push(this.crearFila(index + 1, monthPpto));
      }
    }

    let itemAnterior = null;

    const body = this.state.items.map((item, index) => {
      if (index > 1) {
        itemAnterior = this.state.items[index - 1];
      }

      if (index == 0) {
        return (
          <tr>
            <td>{item.month}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        );
      }

      console.log(item);
      console.log(itemAnterior);
      console.log(monthSalary);
      console.log(representative);

      // METODO DE CONSUMO API PARA ALMACENAR INFORMACION




      return (
        <>
        <TableRow
          item={item}
          itemAnterior={itemAnterior}
          key={index}
          salarioMensual={monthSalary}
          updateItems={this.updateItems}
          representative={representative}
        />
        </>
      );
    });


    const headerStyle = { backgroundColor: "rgb(0, 99, 71)", color: "White" };
    const tableStyle = { marginTop: "0.5%", fontSize: "80%" };
    const auxHeadStyle = { backgroundColor: "white", lineHeight: "100%" };
    const auxStyle = {
      backgroundColor: "#808080",
      borderLeft: "2px solid white",
    };

    return (
      <>
        <div style={tableStyle} className="table-responsive ">
          <table className="table table-hover table-sm">
            <thead style={headerStyle}>
              <tr style={auxHeadStyle}>
                <td></td>
                <td></td>
                <td> </td>
                <td style={auxStyle} colSpan={2}>
                  Venta Actual
                </td>
                <td style={auxStyle} colSpan={2}>
                  Venta Nueva
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
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
                <td>Salario Total</td>
              </tr>
            </thead>
            <tbody>{body}</tbody>
          </table>
        </div>
      </>
    );
  }
}

export default tableData;
