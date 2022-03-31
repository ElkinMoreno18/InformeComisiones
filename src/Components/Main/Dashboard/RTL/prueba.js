import React from "react";
import axios from "axios";

var url_base = "http://localhost:8080";

export default class Tests extends React.Component {
  state = {
    tests: [],
    status: false,
  };

  chargeTests = () => {
    var request = "/api/tests";
    axios.get(url_base + request).then((res) => {
      this.setState({
        tests: res.data,
        status: true,
      });
    });
  }

  componentDidMount = () => {
    this.chargeTests();
  }

  render(){
    return(
<>
{this.state.tests.map((test, i) => {
  return(
    <h2>{test.description}</h2>
  )
})}
</>
    );
  }
}

/* var API_HOST = "mybilling.infinivirt.com:443";
var API_USER = "svc_api";
var API_PASSWORD = "e27c4db0-a86a-4568-9b85-9f74b337b7e7";
var VERIFY_HOSTNAME = "false";
var PASS = "[4YZ.9008*";
var api_base = "https://" + API_HOST + "/rest/";

const data = { login: API_USER, token: API_PASSWORD };

function API() {

const instance = axios.create({
    baseURL: api_base,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*'}
})

  instance.post("Session/login", data).then((res) => {
    const elements = res.data;
    console.log(elements);
  });

  return "Entra";

  //      var req_data = { 'params':JSON.stringify({'login':process.env.API_USER, 'token': process.env.API_PASSWORD})}
  //  var r = request.post(api_base + 'Customer/get_customer_list', data=req_data, verify=false);

  //  var data = r.JSON();

  //   customer_list = data['customer_list']
}

export default API; */
