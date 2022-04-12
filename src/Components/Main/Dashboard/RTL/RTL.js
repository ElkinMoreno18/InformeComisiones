import React from "react";
import axios from "axios";
import "./rtl.css";

const Countries = require("countries-api");

class RTL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      archivos: "",
    };
  }

  handleChangeInput(event) {
    this.setState({
      country: event.target.value,
    });
  }

  cambioPais(country) {
    this.setState({
      country: country,
    });
  }

  searchByName() {
    var a = Countries.findByName(this.state.country);
    console.log(a.data);
    return a;
  }

  uploadFiles = (e) => {
    this.setState({
      archivos: e,
    });
  };

  insertFiles = async () => {
    const f = new FormData();

    for (let index = 0; index < this.state.archivos.length; index++) {
      f.append("files", this.state.archivos[index]);
    }

    await axios.post("", f).then((response) => {
      console.log(response.data);
    });
  };

  render() {
    return (
      <>
        <h3 id="title">Informe de Comisiones</h3>
        <div className="col-3">
          <div className="row">
          <input
          className="mx-auto w-75"
            type="file"
            name="files"
            id="files"
            onChange={(e) => this.uploadFiles(e.target.files)}
          ></input>
          </div>
          <div className="row">
          <button onClick={() => this.insertFiles()} className="btn btn-primary w-50 mx-auto">
          Cargar RTL
        </button>
          </div>
        </div>

       {/*  <input
          type="text"
          value={this.state.country}
          onChange={(ev) => {
            this.cambioPais(ev.target.value);
          }}
          placeholder="Digite el pais a buscar"
          onBlur={() => this.searchByName()}
        ></input>
        <h2>{this.searchByName}</h2> */}
      </>
    );
  }
}

export default RTL;
