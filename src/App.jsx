import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ImagenCrypto from './img/imagen-criptos.png'
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const  Heading = styled.h1`
  font-family:'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin: 80px 0 50px;
  font-size: 34px;
  &::after{
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display:block;
    margin: 10px auto 0;
  }
`;
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media(min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0;
  display: block;
`;
function App() {

const [monedas, setMonedas] = useState( {}) //un objeto que tendra ambas monedas
const [resultado, setResultado] = useState ({})
//Spinner para mostrar mientras carga la API
const [cargando, setCargando] = useState(false)


useEffect( ()=>{
  if(Object.keys(monedas).length >0){
    
    const cotizarCripto = async () =>{
      //spinner lo Activamos cuando empieza la cotizacion
      setCargando(true)
      setResultado({}) //limpiamos el resultado para que se note el spinner y se vea luego el nuevo
      //podriamos destructurar el objeto
      const {moneda, criptomoneda} = monedas; //y usar esas variables en la url
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${monedas.criptomoneda}&tsyms=${monedas.moneda}`
        console.log(url);

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        // console.log(resultado.DISPLAY[criptomoneda][moneda]);
        // console.log(resultado.DISPLAY[criptomoneda][moneda].PRICE);
        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        //Spinner lo desactivamos luego de que ya cargó la data
        setCargando(false)
    }
    cotizarCripto()
  }
},[monedas]) //dependencia cuando cambie el valor de monedas (en Formulario.jsx)

  return (
      <Contenedor>
        <Imagen 
            src={ImagenCrypto}
            alt="Imagenes criptomonedas"
        />
        <div>
            <Heading>Cotiza criptomonedas al instante</Heading>
            <Formulario
              setMonedas = {setMonedas}
            />

            {cargando && <Spinner/>}
            {/* //si lo llamamos directo, se mostraria altiro sin haber una cotizacion previa, por lo que hay que valida que exista una cotizacion por la propiedad PRICE y luego mostrar el componente 
            ademas le pasamos el state como prop al componente para extraer la data*/}
            {resultado.PRICE && <Resultado resultado={resultado}/>}
        </div>
      </Contenedor>
    
  )
}

export default App
