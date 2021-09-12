import React, { useState } from 'react'

import LogoImg from '../../assets/Logo.svg'
import { FaCloudDownloadAlt, FaHome } from 'react-icons/fa'
import { AiOutlineFileSearch } from 'react-icons/ai'

import { Link, useLocation } from 'react-router-dom'
import { Container, NavDesktop, NavMobile } from './styles'

export const Header = () => {
  const [activeNav, setActiveNav] = useState<boolean>(false)
  const { pathname } = useLocation()

  const handleActiveNav = () => {
    setActiveNav(!activeNav)
  }

  return (
    <Container>
      <Link to="/">
        <img src={LogoImg} alt="Coruja com chapéu" />
        <strong>Infonade</strong>
      </Link>

      <nav>
        <NavMobile pathname={pathname} activeNav={activeNav}>
          <div onClick={handleActiveNav}>
            <span></span>
          </div>

          <ul>
            <li>
              <span></span>
              <Link to="/">
                <FaHome />
                Home
              </Link>
            </li>
            <li>
              <span></span>
              <Link to="/consulta">
                <AiOutlineFileSearch />
                Consulta
              </Link>
            </li>
            <li>
              <span></span>
              <Link to="/">
                <FaCloudDownloadAlt />
                Cadastro
              </Link>
            </li>
          </ul>
        </NavMobile>

        <NavDesktop pathname={pathname}>
          <li>
            <span></span>
            <Link to="/">
              <FaHome />
              <strong>Home</strong>
            </Link>
          </li>
          <li>
            <span></span>
            <Link to="/consulta">
              <AiOutlineFileSearch />
              <strong>Consulta</strong>
            </Link>
          </li>
          <li>
            <span></span>
            <Link to="/">
              <FaCloudDownloadAlt />
              <strong>Cadastro</strong>
            </Link>
          </li>
        </NavDesktop>
      </nav>
    </Container>
  )
}
