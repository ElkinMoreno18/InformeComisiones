import React from "react";
import AutosizeInput from "react-input-autosize";
import axios from "axios";

var url_base = "http://localhost:8080";
var fecha = new Date();

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
    };
  }

  Percentages(value, string) {
    var porc = 0;
    if (value < 0.5) {
      porc = string == "act" ? 0.004 : 0.008;
    } else if (value > 0.51 && value < 0.6) {
      porc = string == "act" ? 0.005 : 0.0093;
    } else if (value > 0.61 && value < 0.7) {
      porc = string == "act" ? 0.006 : 0.0095;
    } else if (value > 0.71 && value < 0.8) {
      porc = string == "act" ? 0.006 : 0.0096;
    } else if (value > 0.81 && value < 0.9) {
      porc = string == "act" ? 0.006 : 0.0098;
    } else if (value > 0.91 && value < 1.0) {
      porc = string == "act" ? 0.006 : 0.0098;
    }
    return porc;
  }

  calcularVentaEjecutada(e) {
    const item = this.props.item;
    const itemAnterior = this.props.itemAnterior;
    var newValor = parseInt(e.target.value);
    item.VentaEjecutada = newValor;

    item.porcCumplimiento =
      item.PresupuestoAcumulado > item.VentaEjecutada
        ? item.VentaEjecutada / item.PresupuestoAcumulado
        : 0;

    item.Porcentaje =
      item.VentaEjecutada > item.ClienteActual
        ? item.ClienteActual / item.VentaEjecutada
        : 0;

    item.ClienteNuevo = item.VentaEjecutada * item.PorcentajeNuevo;

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
    var nuevoValor = parseInt(event.target.value);
    item.ClienteActual = nuevoValor;

    item.Porcentaje =
      item.VentaEjecutada > item.ClienteActual
        ? item.ClienteActual / item.VentaEjecutada
        : 0;

    item.ComisionAct =
      item.ClienteActual * this.Percentages(item.porcCumplimiento, "act");

    this.props.updateItems(item);
  }

  sendData() {
    // Crear metodo de envio de informacion
    const item = this.props.item;
    const representative = this.props.representative;
    const monthSalary = parseInt(this.props.salarioMensual);
    const pptoMensual = this.props.pptoMensual;
    const pptoAnual = parseInt(this.props.pptoAnual);
    const rol = this.props.rol;
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
      pptoAnual: pptoAnual,
      rol:rol,
    };
    console.log(info);
    axios.put(request, info).then((res) => {
      this.setState({
        status: true,
      });
      console.log(res);
    });
  }

  render() {

    const item = this.props.item;
    const itemAnterior = this.props.itemAnterior;

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
      item.ClienteActual * this.Percentages(item.porcCumplimiento, "act");

    item.ClienteNuevo = Math.round(item.VentaEjecutada * item.PorcentajeNuevo);

    item.ComisionNue = Math.round(
      item.ClienteNuevo * this.Percentages(item.porcCumplimiento, "new")
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

      item.PresupuestoAcumulado =
        item.pptoVenta +
        itemAnterior.PresupuestoAcumulado -
        itemAnterior.VentaEjecutada;
    }

    ////////////////////////////////////////////////////////////////////

    const presuVenta = item.pptoVenta.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

    const porcentajeCumpli = Math.round(item.porcCumplimiento * 100);

    const porcentajeActu = Math.round(item.Porcentaje * 100);

    const ventaClienteNuevo = item.ClienteNuevo.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

    const porcentajeVentaNueva = Math.round(item.PorcentajeNuevo * 100);

    const presupuestoAcum = item.PresupuestoAcumulado.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

    const comiActualPesos = item.ComisionAct.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

    const comiNuevaPesos = item.ComisionNue.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

    const salarioPesos = item.salarioTotal.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

    // Crearia una funcion con el insert donde se le envien todos los datos,
    // En los metodos de table Data
    ///////////////////////////////////////////////////////


    // ------------------------------ STYLES --------------------------

    const columnInputStyle = { width: "150%", width: "150%" };
    const inputStyle = { backgroundColor: "red" };

    // ----------------------------- CODE HTML RETURN -------------------

    return (
      <>
        <tr>
          <td>{item.month}</td>
          <td>{presuVenta}</td>
          <td>
            <AutosizeInput
              placeholder="Ingrese valor"
              type="number"
              onChange={(e) => this.calcularVentaEjecutada(e)}
              value={item.VentaEjecutada == 0 ? "" : item.VentaEjecutada}
              onBlur={() => this.sendData(item)}
              id={`VentaEjecutada${item.month}`}
              min="0"
              inputStyle={{ border: "none" }}
            />
          </td>
          {/* Venta Ejecutada */}
          <td>{porcentajeCumpli + "%"}</td>
          <td>
            <AutosizeInput
              placeholder="Ingrese valor"
              type="number"
              onChange={(evt) => this.calcularClienteFacturando(evt)}
              value={item.ClienteActual == 0 ? "" : item.ClienteActual}
              id={`ClienteActual${item.month}`}
              onBlur={() => this.sendData(item)}
              min="0"
              inputStyle={{ border: "none" }}
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
