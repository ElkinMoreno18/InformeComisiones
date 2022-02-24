import React from "react";
import Table from "./TableData/tableData";
import "material-icons/iconfont/material-icons.css";

class Comisiones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salario: "",
      presupuesto: "",
      meses: 10,
      presupuestoMensual: "",
      mostrarTabla: false,
    };
  }

  cambioSalario(salario) {
    this.setState({
      salario: salario,
    });
  }

  cambioPresupuesto(presupuesto) {
    this.setState({
      presupuesto: presupuesto,
      presupuestoMensual: Math.floor(presupuesto / 10),
    });
  }

  submitForm = (event) => {
    var SalarioMensual = this.state.salario;
    var Presupuesto = this.state.presupuesto;
    var Meses = this.state.meses;
    this.state.presupuestoMensual = Math.floor(Presupuesto / Meses);
    var PresupuestoMensual = this.state.presupuestoMensual;
    console.log(SalarioMensual);
    console.log(this.state);
    console.log(Presupuesto);
    console.log(Meses);
    console.log(PresupuestoMensual);
    event.preventDefault();
    this.setState({
        mostrarTabla: true,
    })
  };

  render() {
    return (
      <>
        <form>
          <div className="row align-items-start text-center p-3">
            <div className="col">
              <label htmlFor="monthSalary" name="monthSalary">
                Salario Mensual
              </label>
              <input
                type="number"
                id="inputMonthSalary"
                name="monthSalary"
                value={this.state.salario}
                onChange={(ev) => {
                  this.cambioSalario(ev.target.value);
                }}
              />
            </div>
            <div className="col">
              <label htmlFor="pptoAnual" name="pptoAnual">
                Presupuesto Anual
              </label>
              <input
                type="number"
                id="inputPptoAnual"
                name="pptoAnual"
                value={this.state.presupuesto}
                onChange={(ev) => {
                  this.cambioPresupuesto(ev.target.value);
                }}
              />
            </div>
            <div className="col">
              <label htmlFor="months" name="months">
                Meses
              </label>
              <br />
              <input
                type="number"
                id="inputMonths"
                name="months"
                value={this.state.meses}
                disabled
              />
            </div>
            <div className="col">
              <label htmlFor="pptoMonth" name="pptoMonth">
                Presupuesto Mensual
              </label>
              <input
                type="number"
                id="inputPptoMonth"
                name="pptoMonth"
                value={Math.floor(this.state.presupuesto / this.state.meses)}
                onChange={(ev) => {
                  this.cambioPresupuestoMensual(ev.target.value);
                }}
                disabled
              />
            </div>
            <div className="col">
              <input onClick={this.submitForm} type="submit" value="Calcular" />
            </div>
          </div>
        </form>

        {(this.state.mostrarTabla) ? <Table data={this.state}/> : null}
      </>
    );
  }
}

export default Comisiones;