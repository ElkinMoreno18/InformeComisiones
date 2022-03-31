import React from "react";
import GaugeChart from 'react-gauge-chart'
import axios from 'axios'


export default class SBC extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datos: [],
    };
  }


  consultData() {
    const headers = {
      'Authorization': 'djsadjsa'
    }
    var request = "http://10.10.104.44/actions/authToken";
    axios.post(request,"",{headers: headers}).then((res) => {
      this.setState({
        datos: res.data,
      });
    });
  }

  componentDidMount(){
    this.consultData();
  }

  render() {
    var data = this.state.datos;
    data.forEach((element) => {
      console.log(element)
    });
    return( <>
    <p></p>
    <div style={{width:"10%"}}>
<GaugeChart id="gauge-chart5"
  nrOfLevels={420}
  arcsLength={[0.3, 0.5, 0.2]}
  colors={['#5BE12C', '#F5CD19', '#EA4228']}
  percent={0.37}
  arcPadding={0.02}
/>
</div></>
)
  }
}
