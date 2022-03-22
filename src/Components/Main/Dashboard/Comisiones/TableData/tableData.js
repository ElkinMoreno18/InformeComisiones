import React from "react";
import TableRow from "./tableRow/tableRow";
import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import axios from "axios";

var url_base = "http://localhost:8080";
var fecha = new Date();

class tableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      datos: [],
      method: "consult",
    };
    this.updateItems = this.updateItems.bind(this);
  }

  MonthPresupuesto = this.props.data.presupuestoMensual;

  crearFila(months, presupuestoVenta) {
    return {
      month: months,
      pptoVenta: presupuestoVenta,
      VentaEjecutada: 0,
      porcCumplimiento: 0,
      VentaActual: 0,
      PorcentajeVentaActual: 0,
      PorcentajeVentaNuevo: 0,
      VentaNuevo: 0,
      PresupuestoAcumulado: 0,
      ComisionAct: 0,
      ComisionNue: 0,
      salarioTotal: 0,
    };
  }

  consultFila(data) {
    var pptoVenta = parseInt(data.pptoVenta);
    var VentaEjecutada = parseInt(data.VentaEjecutada);
    var Cumplimiento = parseInt(data.Cumplimiento);
    var ClienteActual = parseInt(data.VentaActual);
    var PorcentajeAct = parseInt(data.PorcentajeVentaActual);
    var ClienteNuevo = parseInt(data.VentaNuevo);
    var PorcentajeNuevo = parseInt(data.PorcentajeVentaNuevo);
    var PresupuestoAcumulado = parseInt(data.PresupuestoAcumulado);
    var ComisionAct = parseInt(data.ComisionAct);
    var ComisionNue = parseInt(data.ComisionNue);
    var salarioTotal = parseInt(data.salarioTotal);
    return {
      month: data.months,
      pptoVenta: pptoVenta,
      VentaEjecutada: VentaEjecutada,
      porcCumplimiento: Cumplimiento,
      ClienteActual: ClienteActual,
      Porcentaje: PorcentajeAct,
      ClienteNuevo: ClienteNuevo,
      PorcentajeNuevo: PorcentajeNuevo,
      PresupuestoAcumulado: PresupuestoAcumulado,
      ComisionAct: ComisionAct,
      ComisionNue: ComisionNue,
      salarioTotal: salarioTotal,
    };
  }

  updateItems(item, index) {
    const items = this.state.items;
    items[index] = item;
    this.setState({
      items: items,
    });
  }

  // METODO DE CONSUMO API PARA CONSULTAR INFORMACION

  consultData() {
    var representative = this.props.data.representante;
    if(representative != "Daniela"){
      var request = "/api/tests/" + representative;
    axios.get(url_base + request).then((res) => {
      this.setState({
        datos: res.data,
      });
    });
    } else {
      var request = "/api/tests/coordinator/" + representative;
      // + fecha.getMonth() + "/" + this.props.data.representante;
      axios.get(url_base + request).then((res) => {
        this.setState({
          datos: res.data,
        });
      });
    }
   
  }

  componentDidMount() {
    this.consultData();
  }


  render() {
    var monthPpto = this.props.data.presupuestoMensual;
    var monthSalary = this.props.data.salario;
    var representative = this.props.data.representante;
    var pptoAnual = this.props.data.presupuesto;
    var rol = this.props.data.rol;
    var data = this.state.datos;
    
    if (this.state.method == "consult" && this.state.items.length == 0 && data.length > 0) {
      this.state.items.push(this.crearFila(1, "-"));
        data.forEach((element) => {
          this.state.items.push(this.consultFila(element));
        });
      //  console.log(this.state.items);
    }

    // console.log(data)
   /*  if (this.state.items.length == 0) {
      this.state.items.push(this.crearFila(1, "-"));
      for (let index = 1; index < 12; index++) {
        this.state.items.push(this.crearFila(index + 1, monthPpto));
      }
    } */

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

      return (
        <>
          <TableRow
            item={item}
            itemAnterior={itemAnterior}
            key={index}
            salarioMensual={monthSalary}
            updateItems={this.updateItems}
            representative={representative}
            pptoAnual={pptoAnual}
            pptoMensual={monthPpto}
            rol={rol}
          />
        </>
      );
    });

    const headerStyle = { backgroundColor: "rgb(0, 99, 71)", color: "White" };
    const tableStyle = { marginTop: "0.5%", fontSize: "80%" };
    const auxHeadStyle = { backgroundColor: "#f0f2f5", lineHeight: "100%" };
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
