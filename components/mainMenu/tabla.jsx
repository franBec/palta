import React from "react";

const Tabla = ({ data }) => {
  return (
    <table class="table-auto">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Origen</th>
        </tr>
      </thead>
      <tbody>
        {/* <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr> */}

        {data.map((it, i) => (
          <tr key={i}>
            <td>{it._id ?? "-"}</td>
            <td>{it.data.nombre ?? "-"}</td>
            <td>{it.data.origen ?? "-"}</td>
            <td>{}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;
