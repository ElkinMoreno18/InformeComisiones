import React from "react";
import Table from "./TableData/tableData";
import "material-icons/iconfont/material-icons.css";
import CurrencyInput from "react-currency-input-field";

const options = [
  {
    value: "leidy",
    name: "Leidy Tangarife",
  },
  {
    value: "andres",
    name: "Andres Mesa",
  },
  {
    value: "coordinador",
    name: "Coordinador",
  },
  {
    value: "general",
    name: "General",
  },
];

class Comisiones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salario: "",
      presupuesto: "",
      meses: 10,
      presupuestoMensual: "",
      mostrarTabla: false,
      representante: "",
      activarCampos: false,
      activarButton: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  cambioSalario(salario) {
    this.setState({
      salario: salario,
    });
  }



  cambioPresupuesto(presupuesto) {
    this.setState({
      presupuesto: presupuesto,
      presupuestoMensual: Math.round(presupuesto / 10),
      activarButton: true,
    });
  }

  submitForm = (event) => {
    var SalarioMensual = this.state.salario;
    var Presupuesto = this.state.presupuesto;
    var Meses = this.state.meses;
    this.state.presupuestoMensual = Math.round(Presupuesto / Meses);
    var PresupuestoMensual = this.state.presupuestoMensual;
    event.preventDefault();
    this.setState({
      mostrarTabla: true,
    });
  };

  handleChange(event) {
    if (event.target.value !== "general") {
      this.setState({
        salario: "",
        presupuesto: "",
        mostrarTabla: false,
      });
    }
    this.setState({
      representante: event.target.value,
      activarCampos: true,
    });
  }

  render() {

    const prefix = "$ ";

    const styleContainer = {
      width: "90%",
      marginLeft: "5%",
      marginRigth: "5%",
      marginTop: "0.5%",
      textAlign: "center",
    };
    const titleStyle = { paddingTop: "1%" };
    const styleTwoLastColumns = {
      width: "74%",
      margin: "auto",
      marginTop: "3%",
    };

    return (
      <>
        <div className="contenedor" style={styleContainer}>
          <h2 style={titleStyle}>Informe de Comisiones</h2>
          <form>
            <div className="row w-100 align-items-start text-center p-3">
              <div className="col ">
                <label
                  className="form-label"
                  htmlFor="selectRepresentante"
                  name="selectRepresentante"
                >
                  Representante
                </label>
                <br />
                <select
                  defaultValue={"default"}
                  className="form-select"
                  value={this.state.representante}
                  onChange={this.handleChange}
                  name="selectRepresentante"
                >
                  <option value={"default"} selected>
                    General
                  </option>
                  <optgroup label="Vendedores">
                    <option value="Leidy">Leidy tangarife</option>
                    <option value="Andres">Andres Mesa</option>
                  </optgroup>
                  <optgroup label="Coordinadores">
                    <option value="Daniela">Daniela Zapata</option>
                  </optgroup>
                </select>
              </div>
              <div className="col">
                <label
                  className="form-label"
                  htmlFor="inputMonthSalary"
                  name="monthSalary"
                >
                  Salario Mensual
                </label>

                <input
                  className="form-control"
                  type="number"
                  id="inputMonthSalary"
                  name="monthSalary"
                  value={this.state.salario}
                  onChange={(ev) => {
                    this.cambioSalario(ev.target.value);
                  }}
                  disabled={this.state.activarCampos ? false : true}
                />
              </div>
              <div className="col">
                <label
                  className="form-label"
                  htmlFor="pptoAnual"
                  name="pptoAnual"
                >
                  Presupuesto Anual
                </label>
                <br />
                <input
                  className="form-control"
                  type="number"
                  id="inputPptoAnual"
                  name="pptoAnual"
                  value={this.state.presupuesto}
                  onChange={(ev) => {
                    this.cambioPresupuesto(ev.target.value);
                  }}
                  disabled={this.state.activarCampos ? false : true}
                />
              </div>
              <div className="col">
                <label className="form-label" htmlFor="months" name="months">
                  Meses
                </label>
                <br />
                <input
                  className="form-control"
                  type="number"
                  id="inputMonths"
                  name="months"
                  value={this.state.meses}
                  disabled
                />
              </div>
              <div className="col">
                <label
                  className="form-label"
                  htmlFor="pptoMonth"
                  name="pptoMonth"
                >
                  Presupuesto Mensual
                </label>
                <br />
                <input
                  className="form-control"
                  type="number"
                  id="inputPptoMonth"
                  name="pptoMonth"
                  value={Math.round(this.state.presupuesto / this.state.meses)}
                  onChange={(ev) => {
                    this.cambioPresupuestoMensual(ev.target.value);
                  }}
                  disabled
                />
              </div>
              <div className="col">
                <br />
                <button
                  className="btn btn-success"
                  onClick={this.submitForm}
                  disabled={this.state.activarButton ? false : true}
                  style={styleTwoLastColumns}
                >
                  Calcular
                </button>
              </div>
            </div>
          </form>

          {this.state.mostrarTabla ? <Table data={this.state} /> : null}
        </div>
      </>
    );
  }
}

export default Comisiones;
