import styled from "@emotion/styled"

const Texto = styled.div`
    background-color: #b7322c;
    color: #FFF;
    font-size:19px;
    padding: 13px;
    font-weight: 700;
    border-radius: 10px;
    text-align: center;
    font-family: 'Lato', sans-serif;
    text-transform: uppercase;

`;

const Error = ({children}) => {
  return (
    <Texto>
      {children}
    </Texto>
  )
}

export default Error
