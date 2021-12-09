import LogoImg from '../../assets/Logo.svg'
import { FaBook, FaCloudDownloadAlt, FaHome } from 'react-icons/fa'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { RiPencilRulerFill } from 'react-icons/ri'

import { Link, useLocation } from 'react-router-dom'
import { Container, NavDesktop, NavMobile } from './styles'
import { useState } from 'react'

export const Header = () => {
  const [activeNav, setActiveNav] = useState<boolean>(false)
  const { pathname } = useLocation()

  const handleActiveNav = () => {
    setActiveNav(!activeNav)
  }

  const handleDisabledNav = () => {
    setActiveNav(false)
  }

  return (
    <Container>
      <Link to="/" onClick={handleDisabledNav}>
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
              <Link to="/" onClick={handleDisabledNav}>
                <FaHome />
                Home
              </Link>
            </li>
            <li>
              <span></span>
              <Link to="/consulta" onClick={handleDisabledNav}>
                <AiOutlineFileSearch />
                Consulta
              </Link>
            </li>
            <li>
              <span></span>
              <Link to="/cadastro" onClick={handleDisabledNav}>
                <FaCloudDownloadAlt />
                Cadastro
              </Link>
            </li>
            <li>
              <span></span>
              <Link to="/cursos" onClick={handleDisabledNav}>
                <FaBook />
                Cursos
              </Link>
            </li>
            <li>
              <span></span>
              <Link to="/disciplinas" onClick={handleDisabledNav}>
                <RiPencilRulerFill />
                Disciplinas
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
            <Link to="/cadastro">
              <FaCloudDownloadAlt />
              <strong>Cadastro</strong>
            </Link>
          </li>
          <li>
            <span></span>
            <Link to="/cursos">
              <FaBook />
              <strong>Cursos</strong>
            </Link>
          </li>
          <li>
            <span></span>
            <Link to="/disciplinas">
              <RiPencilRulerFill />
              <strong>Disciplinas</strong>
            </Link>
          </li>
        </NavDesktop>
      </nav>
    </Container>
  )
}
