import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'neutral';


interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger:'red',
  success: 'green',
  neutral: 'gray',
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  background-color: ${props => props.theme['green-500']};
  color: white;
  border-radius: 4px;
  margin: 8px;
  border: 0;

  /* ${props => {
    return css`
      background-color: ${buttonVariants[props.variant]}`
  }} */
`
