import { MouseEvent } from 'react';
import styles         from '../../styles/navbar.module.css';

import NavLink            from './NavLink'
import DropDownFilter     from './DropDownFilter'
import NavbarToggleButton from './NavbarToggleButton';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { filterTodos, updateFilterParams } from '../../redux/slices/todoSlice';

interface INavbarProps {
  refHeight: any;
}

const Navbar = ({ refHeight }: INavbarProps) => {

  const dispatch = useAppDispatch();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(updateFilterParams(null));
    dispatch(filterTodos());
  };

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
              <li className='nav-item'>
                <button 
                  onClick={handleClick}
                  className={`btn btn-primary text-secondary fw-bold d-flex align-items-center ${styles.button}`}
                >
                <i className='bi bi-x-circle-fill me-2 fs-5'/>
                  Clear all filters
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
