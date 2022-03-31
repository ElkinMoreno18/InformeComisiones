import React from "react";

class informeVentas extends React.Component {
  render() {
    return (
      <>
      <h3 className="text-center">Informe de Ventas</h3>
        <iframe
          title="Dashboard informe de Ventas pie - Informe Diario"
          width="1140"
          height="541.25"
          src="https://app.powerbi.com/reportEmbed?reportId=1ab4d1a0-2e24-4f10-a312-61c78f8659b5&autoAuth=true&ctid=5ab1b681-6350-4b51-aa70-20fe07a5751c&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXBhYXMtMS1zY3VzLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9"
          allowFullScreen={true}
          style={{
            border: "none",
            width: "100%",
            height: "94%",
          }}
        ></iframe>
      </>
    );
  }
}

export default informeVentas;
