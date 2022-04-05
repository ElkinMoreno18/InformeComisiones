import React from "react";
import LiquidFillGauge from "react-liquid-gauge";
import axios from "axios";

var url_base = "http://localhost:8080/";

export default class SBC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
    };
  }

  consultData() {
    var request = "api/sbc/kpi/claroDPBX/";
    axios.get(url_base + request).then((res) => {
      this.setState({
        datos: res.data,
      });
    });
  }

  componentDidMount() {
    this.consultData();
  }

  componentDidUpdate() {
    this.consultData();
  }

  render() {
    var data = this.state.datos;

    return (
      <>
        <div>
          <h4>Active Calls</h4>
          <div>
            <LiquidFillGauge
            style={{ margin: '0 1%' }}
              value={(data.value * 100) / 250}
              percent="%"
              width={100}
              height={100}
              riseAnimation={false}
              waveAnimation={false}
            ></LiquidFillGauge>
            <h5 style={{marginLeft: "4%", marginTop: "-4%", color: "white"}}>{data.value}</h5>
          </div>
        </div>
      </>
    );
  }
}
