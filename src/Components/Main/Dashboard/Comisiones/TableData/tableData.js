import React from "react";
import TableRow from "./tableRow/tableRow";
import { Button } from "antd";
import CurrencyFormat from "react-currency-format";
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
      firstSale: '',
    };
    this.updateItems = this.updateItems.bind(this);
  }

  MonthPresupuesto = this.props.data.presupuestoMensual;

  /* crearFila(months, presupuestoVenta) {
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
  } */

  consultFila(data) {
    return {
      month: data.months,
      pptoVenta: data.pptoVenta,
      VentaEjecutada: data.VentaEjecutada,
      porcCumplimiento: data.Cumplimiento,
      ClienteActual: data.VentaActual,
      Porcentaje: data.PorcentajeVentaActual,
      ClienteNuevo: data.VentaNueva,
      PorcentajeNuevo: data.PorcentaVentaNuevo,
      PresupuestoAcumulado: data.PresupuestoAcumulado,
      ComisionAct: data.ComisionAct,
      ComisionNue: data.ComisionNue,
      salarioTotal: data.salarioTotal,
    };
  }

  updateItems(item, index) {
    console.log(item)
    console.log(index)
    const items = this.state.items;
    console.log(items)    
    items[index] = item;
    console.log(items)
     this.setState({
      items: items,
    }); 
  }

  SetFirstSale(firstSale) {
   this.setState({
     firstSale: firstSale,
   })
  }



  // METODO DE CONSUMO API PARA CONSULTAR INFORMACION

  consultData() {
    var representative = this.props.data.representante;
    //  if(representative != "Daniela"){
    var request = "/api/tests/" + representative;
    axios.get(url_base + request).then((res) => {
      this.setState({
        datos: res.data,
      });
    });
    /*  } else {
      var request = "/api/tests/coordinator/" + representative;
      // + fecha.getMonth() + "/" + this.props.data.representante;
      axios.get(url_base + request).then((res) => {
        this.setState({
          datos: res.data,
        });
      });
    } */
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
    var inactiveMonth = false;



    if (representative === "general") {
      rol = "general";
    }

    if (
      this.state.method === "consult" && this.state.items.length === 0 && data.length > 0) {
     // this.state.items.push(this.crearFila(1, "-"));
      data.forEach((element) => {
        this.state.items.push(this.consultFila(element));
      });
    }


    let itemAnterior = null;

    const body = this.state.items.map((item, index) => {
      if (index > 1) {
        itemAnterior = this.state.items[index - 1];
      }

     /*  if (item.month < fecha.getMonth()+1) {
        inactiveMonth = true;
      } */

    /*   if (index < 1) {
        return (
          <tr>
            <td>{item.month}</td>
            <td>-</td>
            <td>
            <CurrencyFormat
              placeholder="Ingrese valor"
              type="text"
              thousandSeparator="."
              decimalSeparator=","
              className="form-control form-control-sm CurrencyInput"
              onChange={(e) => {this.SetFirstSale(e.target.value);}}
              onBlur={() => this.sendFirstSale()}
              disabled={inactiveMonth}
              value={this.state.firstSale}
              style={{ border: "none", width: "120%" }}
            />
          </td>
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
      } */


      return (
        <>
          <TableRow
            item={item}
            itemAnterior={itemAnterior}
            key={index}
            itemIndex={index}
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

    const headerStyle = { backgroundColor: "#09294F", color: "White"};
    const tableStyle = { marginTop: "0.5%", fontSize: "80%", whiteSpace: "nowrap", overflowX: "auto" };
    const auxHeadStyle = { backgroundColor: "#f0f2f5", lineHeight: "100%" };
    const auxStyle = {
      backgroundColor: "#808080",
      borderLeft: "2px solid white",
    };

    return (
      <>
        <div style={tableStyle} className="table-responsive">
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
                <td>PPTO Ventas</td>
                <td>ㅤㅤㅤVENTASㅤㅤㅤ</td>
                <td>% Cumplimiento</td>
                <td>Fact. Acumulada</td>
                <td>%</td>
                <td>Fact. Crecimiento</td>
                <td>%</td>
                <td>PPTO Acumulado</td>
                <td>Comisión <br/> Acumulada</td>
                <td>Comisión <br/> Crecimiento</td>
                <td>Básico + <br/> Comisión</td>
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
