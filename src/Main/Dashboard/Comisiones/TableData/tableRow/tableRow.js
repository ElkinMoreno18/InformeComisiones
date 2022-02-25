import React from "react";
import CurrencyInput from "react-currency-input-field";

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      itemAnterior: props.itemAnterior,
      salarioMensual: props.salarioMensual,
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
    const item = this.state.item;
    const itemAnterior = this.state.itemAnterior;
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

    this.setState({
      item: item,
    });
  }

  calcularClienteFacturando(event) {
    const item = this.state.item;
    var nuevoValor = parseInt(event.target.value);
    item.ClienteActual = nuevoValor;

    item.Porcentaje =
      item.VentaEjecutada > item.ClienteActual
        ? item.ClienteActual / item.VentaEjecutada
        : 0;

    item.ComisionAct =
      item.ClienteActual * this.Percentages(item.porcCumplimiento, "act");

    this.setState({
      item: item,
    });
  }

  render() {
    const item = this.state.item;
    const itemAnterior = this.state.itemAnterior;

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

    item.ComisionNue =
      item.ClienteNuevo * this.Percentages(item.porcCumplimiento, "new");

    item.salarioTotal =
      item.ComisionAct + item.ComisionNue + parseInt(this.state.salarioMensual);

    if (itemAnterior == null && item.month == 1) {
      item.month = 1;
      item.VentaEjecutada = "-";
      item.porcCumplimiento = "-";
    }

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

    // ------------------------------ STYLES --------------------------

    const inputStyle = { width: "100%" };
    const columnStyle = { width: "7%" };
    const secondInput = { width: "10%" };

    // ----------------------------- CODE HTML RETURN -------------------

    return (
      <>
        <tr>
          <td>{item.month}</td>
          <td>{presuVenta}</td>
          <td style={columnStyle}>
            <input
              type="number"
              onChange={(e) => this.calcularVentaEjecutada(e)}
              value={item.VentaEjecutada == 0 ? "" : item.VentaEjecutada}
              id={`VentaEjecutada${item.month}`}
              min="0"
            ></input>
          </td>
          {/* Venta Ejecutada */}
          <td style={columnStyle}>{porcentajeCumpli + "%"}</td>
          <td style={secondInput}>
            <input
              type="number"
              onChange={(evt) => this.calcularClienteFacturando(evt)}
              value={item.ClienteActual == 0 ? "" : item.ClienteActual}
              id={`ClienteActual${item.month}`}
              style={inputStyle}
              min="0"
            ></input>
          </td>
          {/* Cliente Facturando */}
          <td>{porcentajeActu + "%"}</td>
          <td>{ventaClienteNuevo}</td>
          <td>{porcentajeVentaNueva + "%"}</td>
          <td>
            {item.PresupuestoAcumulado.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}
          </td>
          <td>
            {item.ComisionAct.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}
          </td>
          <td>
            {item.ComisionNue.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}
          </td>
          <td>
            {item.salarioTotal.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}
          </td>
        </tr>
      </>
    );
  }
}

export default TableRow;
