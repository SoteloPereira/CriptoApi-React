import styled from '@emotion/styled'
//importamos el custom hook
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import { useEffect, useState } from 'react'
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight:700;
    text-transform:uppercase;
    font-size:20px;
    border-radius:20px;
    transition: all 500ms ease;
    &:hover{
        background-color: #7a7dfe;
        cursor: pointer;
    }
`;

//setMonedas para enviar los valores de state seleccionados a array en App 
const Formulario = ({setMonedas}) => {
    
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)
    //extraemos desde el hook lo que retorna
    //podemos inicializar el valor, pasandole a la fn un texto por ej, y le pasamos el array importado de los tipos de monedas (data/monedas.js)
    //destructuramos lo enviado desde el hook, nombrando el state como "moneda"
    const [ moneda, SelectMonedas] = useSelectMonedas('Elije tu moneda', monedas)
    //como esta "dinamico" lo podemos reutilizar para crear otro label
        //const [SelectCriptoMoneda] = useSelectMonedas('Elije la criptomoneda')
    const [criptomoneda, SelectCriptoMoneda] = useSelectMonedas('Elije la Criptomoneda', criptos)
    
    
    
    //se ejecutará solo 1 vez para cargar la info de las cripto desde API 
    useEffect( ()=>{

        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            //creamos una array para poder guardar la data
            const arrayCriptos = resultado.Data.map( cripto =>{
                
                const objetoCripto = {
                    id: cripto.CoinInfo.Name, 
                    nombre: cripto.CoinInfo.FullName
                }
                    //con el return, vamos llenando el array con los objetos
                    return objetoCripto
            })
            console.log(arrayCriptos);
            setCriptos(arrayCriptos) //para pasarle el array con la respuesta al state criptos
        }
        consultarAPI()
    },[])


    const handleSubmit = (e) =>{
        e.preventDefault()

        if([moneda, criptomoneda].includes('')){
            setError(true)
            return
        }
        setError(false)
        //usamos el mod para pasarle los valores al state en APP
        setMonedas({
                moneda,
                criptomoneda
            })
    }

  return (
    <div>
        {error && <Error>Debe completar ambos campos</Error>}
        <form
            onSubmit={handleSubmit}
            >
            <SelectMonedas />
  
            <SelectCriptoMoneda />

            <InputSubmit type="submit" value="Cotizar" />
        </form>
    </div>
  )
}

export default Formulario
