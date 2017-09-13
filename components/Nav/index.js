// import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.nav`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  background: #387EF5;

  a {
    padding: 0 15px;
    color: #FFF;
  }
`

const Nav = () => (
  <Wrapper>
    <a href='/'>Home</a> |
    <a href='/about'>About</a> |
    <a href='/contact' >Contact</a>
  </Wrapper>
)

export default Nav
