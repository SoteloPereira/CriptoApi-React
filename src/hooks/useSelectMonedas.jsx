import styled from "@emotion/styled"
import { useState } from "react";

const Etiqueta = styled.label`
    color:#FFF;
    display:block;
    font-family: 'Lato', sans-serif;
    font-weight:700;
    font-size: 24px;
    margin : 15px 0;

`;
const Select = styled.select`
    display: block;
    width: 100%;
    font-size: 18px;
    padding: 12px;
    border-radius: 10px;
    margin-bottom: 25px;
`;

//recibimos el array con objetos con data de las monedas, con su id y nombre respectivo
const useSelectMonedas = (etiqueta, opciones) => {
  
    //un state generico para que se pueda reutilizar
    const [state, setState] = useState('')

    const SelectMonedas = () => (
       
        <>
            <Etiqueta htmlFor="">{etiqueta}</Etiqueta>
            <Select
                // asi hacemos que tome el valor seleccionado, que enviamos luego en el return
                value={state}
                onChange={e => setState(e.target.value)}
                >
                <option value="">--Seleccione--</option>
                {/* recorremos el array, y le damos los valores para opciones al select */}
                {opciones.map(opcion => (
                    <option 
                        key={opcion.id}
                        value={opcion.id}
                        // lo que mostramos es el nombre definido en el objeto
                    >{opcion.nombre}</option>
                ))}
            </Select>
        </>
    )

    //para que sea un hook operativo, debe retornar algo
    //enviamos el state para que lo podamos leer en el formulario
    return [state, SelectMonedas]
  
}

export default useSelectMonedas

/* 
Este hook nos permite recibir un label para poner el texto de referencia al input
Nos permite recibir un array estatico (monedas) y una dinamico desde API de criptos
y cargas el listado en el select, ya que recibe un array generico
Ademas de devolver a Formulario un state con el valor seleccionado de dicha lista 
*/
