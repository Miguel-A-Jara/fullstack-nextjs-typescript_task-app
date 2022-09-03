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
      <nav className='navbar navbar-dark navbar-expand-lg app-shadow'>
        <div className='container-fluid'>

            <i className='d-none d-lg-inline bi bi-house-fill fs-4'/>
            <NavLink href='/' text='Tasks' />

          <NavbarToggleButton />
          
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav w-100 justify-content-around align-items-center'>
              <li className='nav-item d-flex align-items-center justify-content-around gap-1'>
                <i className='bi bi-plus-circle-fill fs-4' />
                <NavLink href='/add-todo' text='Add Task' />
              </li>
              <li className='nav-item'>
                <DropDownFilter 
                  fieldToFilter='author' 
                  placeholderText='Authors...' 
                />
              </li>
              <li className='nav-item'>
                <DropDownFilter
                  fieldToFilter='completed'
                  placeholderText='Completed...'
                />
              </li>
              <li className='nav-item'>
                <DropDownFilter
                  fieldToFilter='priority'
                  placeholderText='Priority...'
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
