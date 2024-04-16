import { HeaderContainer, HeaderContent } from "./styles";

import logo from 'src/assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src="logo" alt="" />

        <button>New transaction</button>
      </HeaderContent>
    </HeaderContainer>
  )
}
