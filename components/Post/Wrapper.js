import styled from 'styled-components'

const Wrapper = styled.div`
  border-bottom: 1px solid #ddd;

  a {
    text-decoration: none;
    display: block;
    margin: 0 10px 8px 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    
    &:hover {
      background: #F5F5F5;

    }
  }


  p {
    font-size: 1.2rem;
    line-height: 35px;
    color: #444;
    font-family: "PT Serif", sans-serif;
    margin: 0;
  }
`

export default Wrapper
