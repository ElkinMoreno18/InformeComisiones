import React from "react";
import Table from "./TableData/tableData";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
import "material-icons/iconfont/material-icons.css";

var url_base = "http://localhost:8080";

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
      datos: [],
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

  componentDidMount(){
    alert("Los porcentajes actualizados diariamente en esta plataforma son de seguimiento y meramente informativos, por lo cual no constituyen datos únicos y/o concluyentes para la realización de los pagos de comisiones, ya que estos están sujetos a las políticas de facturación, comisión y nómina de Infinivirt Technologies S.A.S.")
  }

  handleChange(event) {
    this.setState({
      salario: "",
      presupuesto: "",
      mostrarTabla: false,
      representante: event.target.value,
      activarCampos: true,
    });

    var representative = event.target.value;
    var request = "/api/tests/" + representative;
    // + fecha.getMonth() + "/" + this.props.data.representante;
    axios.get(url_base + request).then((res) => {
      this.setState({
        datos: res.data,
      });
    });
  }

  render() {
    const styleContainer = {
      textAlign: "center",
    };

    const styleTwoLastColumns = {
      marginTop: "3%",
    };

    var data = this.state.datos;

    if (data.length > 0) {
      data.forEach((element) => {
        this.state.salario = element.monthSalary;
        this.state.presupuesto = element.pptoAnual;
      });
    }

    if (this.state.salario > 0 && this.state.presupuesto > 0) {
      this.state.activarButton = true;
    } else {
      this.state.activarButton = false;
    }

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
                    if (this.state.representante != "Daniela") {
                      this.state.rol = "vendedor";
                    } else if (this.state.representante === "general") {
                      this.state.rol = "general";
                    } else {
                      this.state.rol = "coordinador";
                    }
                  }}
                  name="selectRepresentante"
                >
                  <option selected hidden>
                    Seleccione
                  </option>
                  <option value="general">General</option>
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
                <CurrencyFormat
                  className="form-control form-control-sm CurrencyInput"
                  type="text"
                  id="inputMonthSalary"
                  name="monthSalary"
                  thousandSeparator="."
                  decimalSeparator=","
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
                <CurrencyFormat
                  className="form-control form-control-sm CurrencyInput"
                  type="text"
                  id="inputPptoAnual"
                  name="pptoAnual"
                  value={this.state.presupuesto}
                  thousandSeparator="."
                  decimalSeparator=","
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
                <CurrencyFormat
                  className="form-control form-control-sm CurrencyInput"
                  type="text"
                  id="inputPptoMonth"
                  name="pptoMonth"
                  thousandSeparator="."
                  decimalSeparator=","
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
