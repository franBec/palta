import React from "react";
//prettier-ignore

const Tabla = ({ data }) => {
  return (
    <table className="text-center">
          <thead>
                <tr className="border-b w-full bg-lime-400 border-lime-500">
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 w-96">
                    ID.
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 w-96">
                    Nombre
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 w-96">
                    Orígen
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 w-96">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
              {data.map((it, i) => (
                  <tr key={i} className="border-b bg-green-100 border-green-200">
                    <td className="text-sm text-gray-900 font-medium  py-4 whitespace-nowrap">{it._id ?? "-"}</td>
                    <td className="text-sm text-gray-900 font-medium  py-4 whitespace-nowrap">{it.data.nombre ?? "-"}</td>
                    <td className="text-sm text-gray-900 font-medium  py-4 whitespace-nowrap">{it.data.origen ?? "-"}</td>
                    <td className="text-sm text-gray-900 font-medium  py-4 whitespace-nowrap">{}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
  );
};

export default Tabla;
