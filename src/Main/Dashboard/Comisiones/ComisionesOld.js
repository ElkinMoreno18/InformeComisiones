import { render } from "@testing-library/react";
import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import Table from "./TableData/TableDataOld.js";
import MaterialTable from "material-table";
import "material-icons/iconfont/material-icons.css";

class comisiones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          salario: "",
          presupuesto: "",
          meses: 10,
          presupuestoMensual: "",
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
          presupuestoMensual: Math.floor(presupuesto/10)
        });
      }
    
      
    
      submitForm = (event) => {
        var SalarioMensual = this.state.salario;
        var Presupuesto = this.state.presupuesto;
        var Meses = this.state.meses;
        this.state.presupuestoMensual = Math.floor(Presupuesto / Meses)
        var PresupuestoMensual = this.state.presupuestoMensual;
        console.log(SalarioMensual);
        console.log(this.state);
        console.log(Presupuesto);
        console.log(Meses);
        console.log(PresupuestoMensual);
        event.preventDefault();
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
                  value={Math.floor(this.state.presupuesto/this.state.meses)}
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
    
          <Table data={this.state}/>
          </>
        );
      }
  }

  /* 
function Percentages(value) {
  switch (value) {
    case value < 0.5:
      percAct = 0.004;
      percNue = 0.008;
      break;
    case value > 0.51 && value < 0.6:
      percAct = 0.005;
      percNue = 0.0093;
      break;
  }
}


var presu;
var presupuestoVenta,
pptoAnual = 0,
VentaEjecutada = 0,
PorcentajeCumplimiento = 0,
ClienteActual = 0,
porcPorcentaje = 0,
ClienteNuevo = 0,
PorcentajeNuevo = 0,
PresupuestoAcumulado = 0,
pptoVenta = 0,
Porcentaje = 0,
percAct = 0,
percNue = 0,
ComisionAct = 0,
ComisionNue = 0,
monthSalary = 0,
porcCumplimiento = 0;
var data = [];


  render() {
    return (
      <div className="container">
        <h2 className="text-center">Informe de Comisiones</h2>
        
        <MaterialTable
          columns={columns}
            data={data}
            title="Tabla de Comisiones"
            options={{
              headerStyle: {
                backgroundColor: "#d8d8d8",
                color: "black",
              },
            }}
             cellEditable={{
              cellStyle: {},
              onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                return new Promise((resolve, reject) => {
                  console.log("newValue: " + newValue);
                  setTimeout(resolve, 4000);
                });
              },
            }}
            />
       {/* <Hijo
          asignarDatos={this.asignarDatos}
          salMonth={this.state.monthSalary}
          pptoAn={this.state.pptoAnual}
        />
         <MaterialTable
            columns={columns}
            data={data}
            title="Tabla de Comisiones"
            options={{
              headerStyle: {
                backgroundColor: "#d8d8d8",
                color: "black",
              },
            }}
             cellEditable={{
              cellStyle: {},
              onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                return new Promise((resolve, reject) => {
                  console.log("newValue: " + newValue);
                  setTimeout(resolve, 4000);
                });
              },
            }}
            /> }
      </div>
    );
  }
}





class representativeInfo extends React.Component {
  render() {
    return <h2>dsadsa</h2>;
  }
}

class tableComisiones extends React.Component {
  render() {
    return <div className="table-responsive"></div>;
  }
}

 */

export default comisiones;
