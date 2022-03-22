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
      representante: "",
      activarCampos: false,
      activarButton: false,
      rol: "",
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
    var Presupuesto = this.state.presupuesto;
    var Meses = this.state.meses;
    this.state.presupuestoMensual = Math.round(Presupuesto / Meses);
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
    const styleContainer = {
      textAlign: "center",
    };

    const styleTwoLastColumns = {
      marginTop: "3%",
    };

    return (
      <>
        <div className="contenedor" style={styleContainer}>
          <h3>Informe de Comisiones</h3>
          <form>
            <div
              className="row w-100 align-items-end text-center p-1"
              style={{ fontSize: "80%" }}
            >
              <div className="col-3">
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
                  className="form-select form-select-sm"
                  value={this.state.representante}
                  onChange={this.handleChange}
                  onBlur={() => {
                    if(this.state.representante != "Daniela"){
                      this.state.rol = "vendedor"
                    } else {
                      this.state.rol = "coordinador"
                    }
                  }}
                  name="selectRepresentante"
                >
                  <option value={"general"} selected>
                    General
                  </option>
                  <optgroup label="Vendedores">
                    <option value="Leidy">Leidy tangarife</option>
                    <option value="Andres">Andres Mesa</option>
                    <option value="Sergio">Sergio Muñoz</option>
                    <option value="Sandra">Sandra Ramos</option>
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
                  className="form-control form-control-sm"
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
                  className="form-control form-control-sm"
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
              <div className="col-1">
                <label className="form-label" htmlFor="months" name="months">
                  Meses
                </label>
                <br />
                <input
                  className="form-control form-control-sm"
                  type="number"
                  id="inputMonths"
                  name="months"
                  value={this.state.meses}
                  disabled
                />
              </div>
              <div className="col-2">
                <label
                  className="form-label"
                  htmlFor="pptoMonth"
                  name="pptoMonth"
                >
                  Presupuesto Mensual
                </label>
                <br />
                <input
                  className="form-control form-control-sm"
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
              <div className="col me-0 pe-0">
                <br />
                <button
                  className="btn btn-success w-75 me-0"
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
