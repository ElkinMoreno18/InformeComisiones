import React from "react";
import LiquidFillGauge from "react-liquid-gauge";
import axios from "axios";
import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";

var url_base = process.env.REACT_APP_DB_HOST;

export default class SBC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
    };
  }

  consultData() {
    var request = "/api/sbc/kpi/claroDPBX/";
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
    var activeCallsArray = data[0];
    var ASRArray = data[1];
    var ACDArray = data[2];
    var callRateInArray = data[3];
    var activeCalls = 0;
    var ASR = 0;
    var ACD = 0;
    var callRateIn = 0;

    for (const property in activeCallsArray) {
      if (property === "value") {
        activeCalls = `${activeCallsArray[property]}`;
      }
    }
    for (const property in ASRArray) {
      if (property === "value") {
        ASR = `${ASRArray[property]}`;
      }
    }
    for (const property in ACDArray) {
      if (property === "value") {
        ACD = `${ACDArray[property]}`;
      }
    }
    for (const property in callRateInArray) {
      if (property === "value") {
        callRateIn = `${callRateInArray[property]}`;
      }
    }

    return (
      <>
        <div className="container">
          <div className="row text-center">
            <h3>Monitor SBC</h3>
          </div>
          <div className="row">
            <div className="col">
              <LiquidFillGauge
                style={{ margin: "0 auto" }}
                value={parseInt((activeCalls * 100) / 250)}
                percent="%"
                width={100}
                height={100}
                riseAnimation={true}
                waveAnimation={true}
              >             
              </LiquidFillGauge>
              <h6 className="text-center">Active Calls: {activeCalls} </h6>
            </div>

            <div className="col">
              <LiquidFillGauge
                style={{ margin: "0 auto" }}
                value={parseInt(ASR)}
                percent="%"
                width={100}
                height={100}
                riseAnimation={true}
                waveAnimation={true}
              ></LiquidFillGauge>
              <h6 className="text-center">ASR</h6>
            </div>

            <div className="col">
              <LiquidFillGauge
                style={{ margin: "0 auto"}}
                value={parseInt(ACD)}
                percent=""
                width={100}
                height={100}
                riseAnimation={true}
                waveAnimation={true}
              ></LiquidFillGauge>
              <h6 className="text-center">ACD</h6>
            </div>

            <div className="col">
              <LiquidFillGauge
                style={{ margin: "0 auto"}}
                value={parseInt(callRateIn)}
                percent=""
                width={100}
                height={100}
                riseAnimation={true}
                waveAnimation={true}
              ></LiquidFillGauge>
              <h6 className="text-center">Calls per sec.</h6>
            </div>

            {/* <div className="col">
              <LiquidFillGauge
                style={{ margin: "0 1%" }}
                value={parseInt(ASR)}
                percent="%"
                width={100}
                height={100}
                riseAnimation={true}
                waveAnimation={true}
              ></LiquidFillGauge>
              <h6 className="w-50 text-center">ASR</h6>
            </div> */}
          </div>
        </div>
      </>
    );
  }
}
