import React from 'react'
import axios from 'axios'
import './rtl.css'
import rtl from '../../../../rtl.json'
import { Table, Tag, Space } from 'antd'
import { CSVLink } from 'react-csv'
import Select, { IndicatorSeparatorProps } from 'react-select'
import { render } from 'react-dom'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Countries = require('countries-api')

var url_base = process.env.REACT_APP_DB_HOST

const indicatorSeparatorStyle = {
  alignSelf: 'stretch',
  marginBottom: 8,
  marginTop: 8,
  width: 1
}

const columns = [
  {
    title: 'Dial Code',
    dataIndex: 'dialCode',
    key: 'dialCode'
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country'
  },
  {
    title: 'Destination Group',
    dataIndex: 'destinationGroup',
    key: 'destinationGroup'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'WHL $ USD',
    dataIndex: 'whlUSD',
    key: 'whlUSD'
  },
  {
    title: 'WHL $ COP',
    dataIndex: 'whlCOP',
    key: 'whlCOP'
  },
  {
    title: 'Tier 1 (70%)',
    dataIndex: 'tier1',
    key: 'tier1'
  },
  {
    title: 'Tier 2 (60%)',
    dataIndex: 'tier2',
    key: 'tier2'
  },
  {
    title: 'Tier 3 (50%)',
    dataIndex: 'tier3',
    key: 'tier3'
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor',
    key: 'vendor'
  },
  {
    title: 'Initial Billing',
    dataIndex: 'initialBilling',
    key: 'initialBilling'
  },
  {
    title: 'Incremental Billing',
    dataIndex: 'incrementalBilling',
    key: 'incrementalBilling'
  }
]

class RTL extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      country: '',
      archivos: '',
      columnDefs: [
        {
          field: 'dialCode',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              {
                filter: 'agTextColumnFilter',
                display: 'subMenu'
              },
              {
                filter: 'agSetColumnFilter'
              }
            ]
          }
        },
        {
          field: 'Country',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              {
                filter: 'agTextColumnFilter',
                display: 'accordion',
                title: 'Expand Me for Text Filters'
              },
              {
                filter: 'agSetColumnFilter',
                display: 'accordion'
              }
            ]
          }
        },
        {
          field: 'sport',
          filter: 'agMultiColumnFilter'
        }
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        menuTabs: ['filterMenuTab']
      },
      sideBar: {
        toolPanels: [
          {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel'
          }
        ]
      },
      rowData: null
    }
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi

    const updateData = data => params.api.setRowData(data)

    fetch(rtl)
      .then(resp => resp.json())
      .then(data => updateData(data))
  }

  handleChangeInput (event) {
    this.setState({
      country: event.target.value
    })
  }

  cambioPais (country) {
    this.setState({
      country: country
    })
  }

  searchByName () {
    var a = Countries.findByName(this.state.country)
    console.log(a.data)
    return a
  }

  uploadFiles = e => {
    this.setState({
      archivos: e
    })
  }

  insertFiles = async () => {
    const f = new FormData()

    for (let index = 0; index < this.state.archivos.length; index++) {
      f.append('files', this.state.archivos[index])
    }

    await axios
      .post('http://localhost:8080/api/files/upload', f)
      .then(response => {
        console.log(response.data)
      })
  }

  render () {
    var pais = this.state.country
    var paises = []
    var result = rtl.reduce((element, index) => {
      if (!element.includes(index.country)) {
        element.push(index.country)
      }
      return element
    }, [])

    console.log(result)

    const filtrada = rtl.filter(element =>
      element.country.includes(pais.toUpperCase())
    )

    return (
      <>
        <h3 id='title'>Informe de Comisiones</h3>
        <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            sideBar={this.state.sideBar}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
        {/*   <div className="col-3">
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
        </div>  */}
        <Select
          closeMenuOnSelect={false}
          isMulti
          options={
            rtl.country /* result.forEach(element => {
            console.log(element)
          }) */
          }
        ></Select>
        <input
          type='text'
          value={this.state.country}
          onChange={ev => {
            this.cambioPais(ev.target.value)
          }}
          placeholder='Digite el pais a buscar'
          //          onBlur={() => this.searchByName()}
        ></input>

        <Table size='small' dataSource={filtrada} columns={columns}></Table>

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
        <CSVLink data={filtrada}>Descargar CSV</CSVLink>
      </>
    )
  }
}

export default RTL
