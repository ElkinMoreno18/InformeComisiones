import React from "react";
import AutosizeInput from "react-input-autosize";
import axios from "axios";
import CurrencyFormat from "react-currency-format";

var url_base = "http://localhost:8080";
var fecha = new Date();
var firstSale = "";
var mostrar = '';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      itemAnterior: props.itemAnterior,
      salarioMensual: props.salarioMensual,
      representative: props.representative,
      pptoAnual: props.pptoAnual,
      pptoMensual: props.pptoMensual,
      data: props.data,
      rol: props.rol,
      firstSale: props.firstSale,
    };
  }

  Percentages(value, string, rol) {

    var porc = 0;
    if (value < 0.5 && rol === "vendedor") {
      porc = string == "act" ? 0.004 : 0.008;
    } else if (value > 0.51 && value < 0.6 && rol == "vendedor") {
      porc = string == "act" ? 0.005 : 0.0093;
    } else if (value > 0.61 && value < 0.7 && rol == "vendedor") {
      porc = string == "act" ? 0.006 : 0.0095;
    } else if (value > 0.71 && value < 0.8 && rol == "vendedor") {
      porc = string == "act" ? 0.006 : 0.0096;
    } else if (value > 0.81 && value < 0.9 && rol == "vendedor") {
      porc = string == "act" ? 0.006 : 0.0098;
    } else if (value > 0.91 && value < 1.0 && rol == "vendedor") {
      porc = string == "act" ? 0.006 : 0.0098;
    } else if (value < 0.5 && rol === "coordinador") {
      porc = string == "act" ? 0.001 : 0.0045;
    } else if (value > 0.51 && value < 0.6 && rol == "coordinador") {
      porc = string == "act" ? 0.001 : 0.0045;
    } else if (value > 0.61 && value < 0.7 && rol == "coordinador") {
      porc = string == "act" ? 0.001 : 0.0045;
    } else if (value > 0.71 && value < 0.8 && rol == "coordinador") {
      porc = string == "act" ? 0.001 : 0.0045;
    } else if (value > 0.81 && value < 0.9 && rol == "coordinador") {
      porc = string == "act" ? 0.001 : 0.0045;
    } else if (value > 0.91 && value < 1.0 && rol == "coordinador") {
      porc = string == "act" ? 0.001 : 0.0045;
    } else if (value < 0.5 && rol == "general") {
      porc = string == "act" ? 0.004 : 0.008;
    } else if (value > 0.51 && value < 0.6 && rol == "general") {
      porc = string == "act" ? 0.005 : 0.0093;
    } else if (value > 0.61 && value < 0.7 && rol == "general") {
      porc = string == "act" ? 0.006 : 0.0095;
    } else if (value > 0.71 && value < 0.8 && rol == "general") {
      porc = string == "act" ? 0.006 : 0.0096;
    } else if (value > 0.81 && value < 0.9 && rol == "general") {
      porc = string == "act" ? 0.006 : 0.0098;
    } else if (value > 0.91 && value < 1.0 && rol == "general") {
      porc = string == "act" ? 0.006 : 0.0098;
    }
    return porc;
  }

  calcularVentaEjecutada(e) {
    const item = this.props.item;
    const itemAnterior = this.props.itemAnterior;

     if (e != null) {
      var calculateNumber = e.replace(/\./g, "");
      var doubleNumber = calculateNumber.replace(/\,/g, ".")
    }
    var num = parseFloat(doubleNumber);

    mostrar = e;
    item.VentaEjecutada = num;

    if (item.month == 1) {
      firstSale = item.VentaEjecutada;
    } 

     item.porcCumplimiento =
      item.PresupuestoAcumulado > num ? num / item.PresupuestoAcumulado : 0;
    item.Porcentaje = num > item.ClienteActual ? item.ClienteActual / num : 0;

    item.ClienteNuevo = num * item.PorcentajeNuevo;

    if (itemAnterior == null) {
      item.pptoAcumulado = item.pptoVenta;
    } else {
      item.pptoAcumulado =
        item.pptoVenta +
        itemAnterior.pptoAcumulado -
        itemAnterior.VentaEjecutada;
    }
    this.props.updateItems(item);
  }

  calcularClienteFacturando(event) {
    const item = this.props.item;
    const rol = this.props.rol;

    if (event != null) {
      var calculateNumber = event.replace(/\./g, "");
      var doubleNumber = calculateNumber.replace(/\,/g, ".")
    }

    var number = parseFloat(doubleNumber);

    var mostrarActual = event;
    item.ClienteActual = number;

    item.Porcentaje =
      item.VentaEjecutada > number ? number / item.VentaEjecutada : 0;

    item.ComisionAct =
      number * this.Percentages(item.porcCumplimiento, "act", rol);

   this.props.updateItems(item);
  }

  sendData() {
    // Crear metodo de envio de informacion
    const item = this.props.item;
    const representative = this.props.representative;
    const monthSalary = parseFloat(this.props.salarioMensual);
    const pptoMensual = this.props.pptoMensual;
    const pptoAnual = parseFloat(this.props.pptoAnual);
    var rol = this.props.rol;
    var presupuestoAn = 0;

    if (representative === "general") {
      rol = "general";
      presupuestoAn = pptoAnual / 4;
    } else if (representative === "Daniela") {
      presupuestoAn = pptoAnual / 4;
    } else {
      presupuestoAn = pptoAnual;
    }

    var request = url_base + "/api/tests/" + item.month + "/" + representative;
    var info = {
      months: item.month,
      pptoVenta: item.pptoVenta,
      VentaEjecutada: item.VentaEjecutada,
      Cumplimiento: item.porcCumplimiento,
      VentaActual: item.ClienteActual,
      PorcentajeVentaActual: item.Porcentaje,
      VentaNueva: item.ClienteNuevo,
      PorcentajeVentaNueva: item.PorcentajeNuevo,
      PresupuestoAcumulado: item.PresupuestoAcumulado,
      ComisionAct: item.ComisionAct,
      ComisionNue: item.ComisionNue,
      salarioTotal: item.salarioTotal,
      usuarioLogueado: "prueba",
      representante: representative,
      monthSalary: monthSalary,
      pptoMensual: pptoMensual,
      pptoAnual: presupuestoAn,
      rol: rol,
    };
    axios.put(request, info).then((res) => {
      this.setState({
        status: true,
      });
    });

  }

  render() {
    const item = this.props.item;
    const itemAnterior = this.props.itemAnterior;
    const rol = this.props.rol;
    var inactiveMonth = false;

    /* if (item.month < fecha.getMonth()+1) {
      inactiveMonth = true;
    } */


   // this.mostrar = item.VentaEjecutada;
    this.mostrarActual = item.ClienteActual;

    item.porcCumplimiento =
      item.PresupuestoAcumulado > item.VentaEjecutada
        ? item.VentaEjecutada / item.PresupuestoAcumulado
        : 0;

    item.Porcentaje =
      item.VentaEjecutada > item.ClienteActual
        ? item.ClienteActual / item.VentaEjecutada
        : 0;

    item.PorcentajeNuevo = 1 - item.Porcentaje;

    item.ComisionAct =
      item.ClienteActual * this.Percentages(item.porcCumplimiento, "act", rol);

    item.ClienteNuevo = Math.round(item.VentaEjecutada * item.PorcentajeNuevo);

    item.ComisionNue = Math.round(
      item.ClienteNuevo * this.Percentages(item.porcCumplimiento, "new", rol)
    );

    item.salarioTotal =
      item.ComisionAct + item.ComisionNue + parseInt(this.props.salarioMensual);

    if (itemAnterior == null && item.month == 2) {
      item.PresupuestoAcumulado = item.pptoVenta;
    } else if (itemAnterior !== null && item.month > 2) {
      /*    item.ClienteActual =
             item.VentaEjecutada < itemAnterior.ClienteNuevo
               ? item.VentaEjecutada
               : itemAnterior.ClienteNuevo;
      */
      if (item.month == 3) {
        item.PresupuestoAcumulado =
          item.pptoVenta +
          itemAnterior.PresupuestoAcumulado -
          firstSale -
          itemAnterior.VentaEjecutada;
      } else {
        item.PresupuestoAcumulado =
          item.pptoVenta +
          itemAnterior.PresupuestoAcumulado -
          itemAnterior.VentaEjecutada;
      }
    }

    ////////////////////////////////////////////////////////////////////

    const presuVenta = item.pptoVenta.toLocaleString("es-CO");

    const porcentajeCumpli = Math.round(item.porcCumplimiento * 100);

    const porcentajeActu = Math.round(item.Porcentaje * 100);

    const ventaClienteNuevo = item.ClienteNuevo.toLocaleString("es-CO");

    const porcentajeVentaNueva = Math.round(item.PorcentajeNuevo * 100);

    const presupuestoAcum = item.PresupuestoAcumulado.toLocaleString("es-CO");

    const comiActualPesos = item.ComisionAct.toLocaleString("es-CO");

    const comiNuevaPesos = item.ComisionNue.toLocaleString("es-CO");

    const salarioPesos = item.salarioTotal.toLocaleString("es-CO");

    // Crearia una funcion con el insert donde se le envien todos los datos,
    // En los metodos de table Data
    ///////////////////////////////////////////////////////

    // ------------------------------ STYLES --------------------------

    const columnInputStyle = { width: "150%", width: "150%" };
    const inputStyle = { backgroundColor: "red" };
    // ----------------------------- CODE HTML RETURN -------------------

    if (item.month == 1) {
      return (
        <>
          <tr>
            <td>{item.month}</td>
            <td>-</td>
            <td>
              <CurrencyFormat
                placeholder="Ingrese valor"
                type="text"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={3}
                className="form-control form-control-sm CurrencyInput"
                onChange={(e) => this.calcularVentaEjecutada(e.target.value)}
                value={item.VentaEjecutada == 0 ? "" : item.VentaEjecutada}
                onBlur={() => this.sendData(item)}
                id={`VentaEjecutada${item.month}`}
                min="0"
                disabled={inactiveMonth}
                style={{ border: "none", width: "120%" }}
              />
            </td>
            {/* Venta Ejecutada */}
            <td> - %</td>
            <td> - </td>
            <td> - %</td>
            <td> - </td>
            <td> - %</td>
            <td> - </td>
            <td> - </td>
            <td> - </td>
            <td> - </td>
          </tr>
        </>
      );
    }

    return (
      <>
        <tr>
          <td>{item.month}</td>
          <td>{presuVenta}</td>
          <td>
            <CurrencyFormat
              placeholder="Ingrese valor"
              type="text"
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={3}
              className="form-control form-control-sm CurrencyInput"
              onChange={(e) => this.calcularVentaEjecutada(e.target.value)}
              value={item.VentaEjecutada == 0 ? "" : item.VentaEjecutada}
              onBlur={() => this.sendData(item)}
              id={`VentaEjecutada${item.month}`}
              min="0"
              disabled={inactiveMonth}
              style={{ border: "none", width: "120%" }}
            />
          </td>
          {/* Venta Ejecutada */}
          <td>{porcentajeCumpli + "%"}</td>
          <td>
            <CurrencyFormat
              className="form-control form-control-sm CurrencyInput"
              placeholder="Ingrese valor"
              type="text"
              thousandSeparator="."
              decimalSeparator=","
              onChange={(evt) =>
                this.calcularClienteFacturando(evt.target.value)
              }
              disabled={inactiveMonth}
              value={item.ClienteActual == 0 ? "" : this.mostrarActual}
              id={`ClienteActual${item.month}`}
              onBlur={() => this.sendData(item)}
              min="0"
              inputStyle={{ border: "none", width: "120%" }}
            />
          </td>
          {/* Cliente Facturando */}
          <td>{porcentajeActu + "%"}</td>
          <td>{ventaClienteNuevo}</td>
          <td>{porcentajeVentaNueva + "%"}</td>
          <td>{presupuestoAcum}</td>
          <td>{comiActualPesos}</td>
          <td>{comiNuevaPesos}</td>
          <td>{salarioPesos}</td>
        </tr>
      </>
    );
  }
}

export default TableRow;
