import React from "react";
import Table from "./TableData/tableData";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
import "material-icons/iconfont/material-icons.css";
import { Modal, Button } from "antd";
import './Comisiones.css'

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
      modalVisible: true,
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
      presupuestoMensual: presupuesto / 10,
    });
  }

  submitForm = (event) => {
    var Presupuesto = this.state.presupuesto;
    var Meses = this.state.meses;
    this.state.presupuestoMensual = Presupuesto / Meses;
    event.preventDefault();
    this.setState({
      mostrarTabla: true,
    });
  };

  componentDidMount() {
    this.setState({
      modalVisible: true,
    });
    /*  alert(
      "Los porcentajes actualizados diariamente en esta plataforma son de seguimiento y meramente informativos, por lo cual no constituyen datos únicos y/o concluyentes para la realización de los pagos de comisiones, ya que estos están sujetos a las políticas de facturación, comisión y nómina de Infinivirt Technologies S.A.S."
    ); */
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

    const infoLogin = this.props.infoLogin;
    console.log(infoLogin);
    var hidden = true;

    const handleOk = () => {
      this.setState({
        modalVisible: false,
      });
    };

    if (
      infoLogin.username == "leidy.tangarife" ||
      infoLogin.username == "andres.mesa" ||
      infoLogin.username == "sergio.munoz" ||
      infoLogin.username == "sandra.ramos" ||
      infoLogin.username == "maria.zapata" ||
      infoLogin.username == "ingry.marquez" ||
      infoLogin.username == "jorge.arango" ||
      infoLogin.username == "elkin.moreno"
    ) {
      hidden = false;
    } else {
      hidden = true;
    }

    console.log(hidden);


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
    console.log(this.state.modalVisible);
    return (
      <>
      <div hidden={hidden}>
        <Modal
          centered="true"
          title="Mensaje Importante"
          okText="Aceptar"
          closable={false}
          visible={this.state.modalVisible}
          onOk={handleOk}
          cancelButtonProps={{ hidden: true }}
        >
          <p>
            Los porcentajes actualizados diariamente en esta plataforma son de
            seguimiento y meramente informativos, por lo cual no constituyen
            datos únicos y/o concluyentes para la realización de los pagos de
            comisiones, ya que estos están sujetos a las políticas de
            facturación, comisión y nómina de Infinivirt Technologies S.A.S.
          </p>
        </Modal>

        <div className="contenedor">
          <h3>Informe de Comisiones</h3>
            <div
              className="row w-100 align-items-end text-center"
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
                  <option
                    hidden={
                      infoLogin.username == "ingry.marquez" ||
                      infoLogin.username == "jorge.arango" ||
                      infoLogin.username == "elkin.moreno"
                        ? false
                        : true
                    }
                    value="general"
                  >
                    General
                  </option>
                  <optgroup label="Vendedores">
                    <option
                      hidden={
                        (infoLogin.username == "leidy.tangarife" ||
                          infoLogin.username == "maria.zapata" ||
                          infoLogin.username == "ingry.marquez" ||
                          infoLogin.username == "jorge.arango") &&
                        hidden == false
                          ? false
                          : true
                      }
                      value="Leidy"
                    >
                      {console.log(infoLogin.username)}
                      Leidy tangarife
                    </option>
                    <option
                      hidden={
                        (infoLogin.username == "andres.mesa" ||
                          infoLogin.username == "maria.zapata" ||
                          infoLogin.username == "ingry.marquez" ||
                          infoLogin.username == "jorge.arango") &&
                        hidden == false
                          ? false
                          : true
                      }
                      value="Andres"
                    >
                      Andres Mesa
                    </option>
                    <option
                      hidden={
                        (infoLogin.username == "sergio.munoz" ||
                          infoLogin.username == "maria.zapata" ||
                          infoLogin.username == "ingry.marquez" ||
                          infoLogin.username == "jorge.arango") &&
                        hidden == false
                          ? false
                          : true
                      }
                      value="Sergio"
                    >
                      Sergio Muñoz
                    </option>
                    <option
                      hidden={
                        (infoLogin.username == "sandra.ramos" ||
                          infoLogin.username == "maria.zapata" ||
                          infoLogin.username == "ingry.marquez" ||
                          infoLogin.username == "jorge.arango") &&
                        hidden == false
                          ? false
                          : true
                      }
                      value="Sandra"
                    >
                      Sandra Ramos
                    </option>
                  </optgroup>
                  <optgroup
                    hidden={
                      infoLogin.username == "ingry.marquez" ||
                      infoLogin.username == "jorge.arango" ||
                      (infoLogin.username == "maria.zapata" && hidden == false)
                        ? false
                        : true
                    }
                    label="Coordinadores"
                  >
                    {console.log(infoLogin.username)}
                    {console.log(hidden)}

                    <option
                      hidden={
                        (infoLogin.username == "maria.zapata" ||
                          infoLogin.username == "ingry.marquez" ||
                          infoLogin.username == "jorge.arango") &&
                        hidden == false
                          ? false
                          : true
                      }
                      value="Daniela"
                    >
                      Daniela Zapata
                    </option>
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
                  decimalScale={0}
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
                  decimalScale={0}
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
                  decimalScale={0}
                  value={this.state.presupuesto / this.state.meses}
                  // onChange={(ev) => {
                  //   this.cambioPresupuestoMensual(ev.target.value);
                  // }}
                  disabled
                />
              </div>
              <div className="col">
                <br />
                <button
                  className="btn w-100"
                  id="calcular"
                  onClick={this.submitForm}
                  disabled={this.state.activarButton ? false : true}
                >
                  Calcular
                </button>
              </div>
            </div>

          {this.state.mostrarTabla ? <Table data={this.state} /> : null}
        </div>
        </div>
      </>
    );
  }
}

export default Comisiones;
