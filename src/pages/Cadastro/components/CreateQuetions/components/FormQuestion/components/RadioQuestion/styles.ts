import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-top: 5px;
  display: flex;
  align-items: center;

  label {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  label span {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #ffffff;
    border-radius: 50%;
    border: 1px solid var(--secondary);
    text-align: center;
  }

  label input:checked ~ span {
    background: var(--secondary);
    color: #fff;
  }

  input:last-of-type {
    background: #fff;
    height: 45px;
    width: 100%;
    margin-left: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    border: none;
    padding: 0 10px;
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
  }
`
