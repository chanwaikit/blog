// import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 40px 50px;
    font-size: 14px;
    border-bottom: 1px solid #EEE;
    span {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font-size: 14px;
    }
    a{
      margin-right: 10px;
      color: #000;
      -webkit-text-decoration: none;
      text-decoration: none;
      padding-right: 10px;
      font-weight: 600;
    }
`

const Nav = () => (
  <Wrapper>
    <span><a href='/'>Home</a></span> 
    <span><a href='/about'>About</a></span> 
    <span><a href='/contact' >Contact</a></span>
  </Wrapper>
)

export default Nav
