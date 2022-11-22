import React from 'react'
import styled from '@emotion/styled'

const DivResultado = styled.div`
    color: #FFF;
    font-family: 'Lato',sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 20px;
`;
const Texto = styled.p`
    span{
        font-weight:700;
    }
`;
const Precio = styled.p`
    font-size:20px;
    span{
        font-weight:700;
    }

`;
const ImagenCrypto = styled.img`
    display: block;
    width: 110px;
`;

//si lo llamamos en App directo, se mostraria altiro sin haber una cotizacion previa, por lo que en APP hay que valida que exista una cotizacion por la propiedad PRICE y luego mostrar el componente
const Resultado = ( {resultado}) => {
    //destructuramos la data que necesitamos
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado

  return (
    <DivResultado>
        <ImagenCrypto src={`https://cryptocompare.com/${IMAGEURL}`} alt="icono criptomoneda" />
        <div>
            <Precio>El precio es: <span>{PRICE}</span></Precio>
            <Texto>El precio más alto del dia: <span>{HIGHDAY}</span></Texto>
            <Texto>El precio más bajo del dia: <span>{LOWDAY}</span></Texto>
            <Texto>Variación últimas 24 hrs: <span>{CHANGEPCT24HOUR}%</span></Texto>
            <Texto>El último cambio del dia: <span>{LASTUPDATE}</span></Texto>
        </div>
       
    </DivResultado>
  )
}

export default Resultado
