import React from "react";
const Countries = require("countries-api");

class RTL extends React.Component {
    
 
  constructor(props) {
    super(props);
    this.state = {
      country: "",
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

  searchByName(){
      var a = Countries.findByName(this.state.country);
      console.log(a);
      return a;
  }

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.country}
          onChange={(ev) => {
            this.cambioPais(ev.target.value);
          }}
          placeholder="Digite el pais a buscar"
          onBlur={() => this.searchByName()}
        ></input>
        <h2>{this.searchByName}</h2>
      </>
    );
  }
}

export default RTL;
