import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  button {
    margin-top: 24px;
  }
`

export const Text = styled.p`
  margin-top: 24px;
  font-size: 18px;
`

export const Divider = styled.div `
  width: 100%;
  background: #d3d3d3;
  height: 1px;
`;

export const Title = styled.p `
  margin-bottom: 10px;
  font-size: 30px;
  color: #4E74FC;
  font-weight: bold;
`;

export const Header = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const Label = styled.p `
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`;    

export const Input = styled.input `
  width: 100%;
  border: 1px solid #d3d3d3;
  padding: 17px 15px;
  border-radius: 5px;
`;    

export const StatusConnection = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`;  

type StatusCircleProps = {
  connected: boolean
}

export const StatusCircle = styled.div<StatusCircleProps> `
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.connected ? '#B1C2FF' : '#B1C2FF'};
  margin-right: 10px;
`;    

export const StatusText = styled.p `
  color: #d3d3d3;
  font-size: 14px;
  font-size: 12px;
`;

export const Subtitle = styled.p `
  font-size: 12px;
  color: #4E74FC;
  text-align: start;
  font-weight: bold;
`;    

export const Description= styled.p `
  font-size: 12px;
  color: #6666;
  margin-top: 5px;
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  flex-direction: column;
  margin-top: 20px;
  
`;

export const Help = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: start;
  align-self: start;
  flex-direction: column;
`;


export const Footer = styled.div `
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;