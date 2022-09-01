import styles from '../../styles/navbar.module.css';

import DropDownFilter from './DropDownFilter'
import NavbarToggleButton from './NavbarToggleButton';
import NavLink from './NavLink'

interface INavbarProps {
  refHeight: any;
}

const Navbar = ({ refHeight }: INavbarProps) => {

  return (
    <div 
      ref={refHeight} 
      className={styles.navbar}
    >
      <nav className='navbar navbar-dark bg-secondary navbar-expand-lg'>
        <div className='container-fluid'>

          <NavLink href='/' text='Todo' />

          <NavbarToggleButton />
          
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav align-items-center'>
              <li className='nav-item'>
                <NavLink href='/add-todo' text='Add Todo' />
              </li>
              <li className='nav-item'>
                <DropDownFilter />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
