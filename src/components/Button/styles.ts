import styled from 'styled-components'

export const Container = styled.button`
  height: 42px;
  padding: 0 24px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  background: #8257e6;
  border-radius: 5px;
  border: 0;

  color: #FFF;
  font-size: 12px;
  font-weight: bold;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.7);
  }
`
