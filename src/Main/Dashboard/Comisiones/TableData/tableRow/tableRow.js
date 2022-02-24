import React from "react";

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      itemAnterior: props.itemAnterior,
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
      item.VentaEjecutada > item.PresupuestoAcumulado
        ? item.VentaEjecutada / item.PresupuestoAcumulado
        : 0;
    item.Porcentaje =
      item.ClienteActual > item.VentaEjecutada
        ? item.ClienteActual / item.VentaEjecutada
        : 0;
    item.ClienteNuevo = item.VentaEjecutada * item.PorcentajeNuevo;
    item.pptoAcumulado =
      item.pptoVenta + itemAnterior.pptoAcumulado - itemAnterior.VentaEjecutada;
    
      this.setState({
      item: item,
    });
  }

  calcularClienteFacturando(event) {
    const item = this.state.item;
    console.log(item)
    var nuevoValor = parseInt(event.target.value);
    item.ClienteActual = nuevoValor;

    item.Porcentaje =
      item.ClienteActual > item.VentaEjecutada
        ? item.ClienteActual / item.VentaEjecutada
        : 0;

    item.ComisionAct =
      item.ClienteActual * this.Percentages(item.porcCumplimiento, "act");

      console.log(item);

    this.setState({
      item: item,
    });
  }

  render() {
    const item = this.state.item;
    const itemAnterior = this.state.itemAnterior;

    item.porcCumplimiento =
      item.VentaEjecutada > item.PresupuestoAcumulado
        ? item.VentaEjecutada / item.PresupuestoAcumulado
        : 0;

    if (itemAnterior !== null) {
   /*    item.ClienteActual =
        item.VentaEjecutada < itemAnterior.ClienteNuevo
          ? item.VentaEjecutada
          : itemAnterior.ClienteNuevo;
 */
      item.PresupuestoAcumulado =
        item.pptoVenta +
        itemAnterior.PresupuestoAcumulado -
        itemAnterior.VentaEjecutada;
    } else {
    //   item.ClienteActual = 0;
      item.PresupuestoAcumulado = item.pptoVenta;
    }

    item.Porcentaje =
      item.ClienteActual > item.VentaEjecutada
        ? item.ClienteActual / item.VentaEjecutada
        : 0;

    return (
      <tr>
        <td>{item.month}</td>
        <td>{item.pptoVenta}</td>
        <td>
          <input
            type="number"
            onChange={(e) => this.calcularVentaEjecutada(e)}
            value={item.VentaEjecutada}
            id={`VentaEjecutada${item.month}`}
          ></input>
        </td>
        {/* Venta Ejecutada */}
        <td>{item.porcCumplimiento*100}</td>
        <td>
          <input
            type="number"
            onChange={(evt) => this.calcularClienteFacturando(evt)}
            value={item.ClienteActual}
            id={`ClienteActual${item.month}`}
          ></input>
        </td>
        {/* Cliente Facturando */}
        <td>{item.Porcentaje*100}</td>
        <td>{item.VentaEjecutada * item.PorcentajeNuevo}</td>
        <td>{(1 - item.Porcentaje)*100}</td>
        <td>{item.PresupuestoAcumulado}</td>
        <td>
          {item.ClienteActual * this.Percentages(item.porcCumplimiento, "act")}
        </td>
        <td>
          {item.ClienteNuevo * this.Percentages(item.porcCumplimiento, "new")}
        </td>
        <td>{item.ComisionAct + item.ComisionNue}</td>
        <td>
          {item.ComisionAct + item.ComisionNue + this.props.SalarioMensual}{" "}
        </td>
      </tr>
    );
  }
}

export default TableRow;
