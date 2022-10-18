import { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import styles         from '../../styles/navbar.module.css';

import NavbarLinkItem from './NavbarLinkItem';
import DropDownFilter     from './DropDownFilter'
import NavbarToggleButton from './NavbarToggleButton';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { removeAuthentication } from '../../redux/slices/authSlice';
import { deleteAllTodos, filterTodos, updateFilterParams } from '../../redux/slices/todoSlice';

interface INavbarProps {
  refHeight: any;
}

const Navbar = ({ refHeight }: INavbarProps) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(updateFilterParams(null));
    dispatch(filterTodos());
  };
  
  const handleClickLogOut = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    dispatch(removeAuthentication());
    dispatch(deleteAllTodos());

    router.push('/login');
  };

  return (
    <div 
      ref={refHeight} 
      className={styles.navbar}
    >
      <nav className='navbar navbar-dark navbar-expand-lg app-shadow'>
        <div className='container-fluid'>

          <NavbarLinkItem href='/' text='Tasks'>
            <i className='d-none d-lg-inline bi bi-house-fill fs-4'/>
          </NavbarLinkItem>

          <NavbarToggleButton />
          
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav w-100 gap-2 justify-content-around align-items-lg-center'>
              <li className='nav-item d-flex align-items-center justify-content-around gap-1'>
                <NavbarLinkItem styleProps='mt-3 mb-1 my-lg-0 w-100' href='/add-todo' text='Add Task'>
                  <i className='bi bi-plus-circle-fill fs-4' />
                </NavbarLinkItem>
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
                  className={
                    `btn w-100 btn-primary text-secondary d-flex justify-content-center 
                    justify-content-lg-start align-items-center ${styles.button} px-2`
                  }
                >
                <i className='bi bi-x-circle-fill me-2'/>
                  No filters
                </button>
              </li>

              <li className='nav-item'>
                <button 
                  onClick={handleClickLogOut}
                  className={
                    `btn w-100 btn-primary d-flex justify-content-center 
                    justify-content-lg-start align-items-center ${styles.button} bg-danger text-white px-2`
                  }
                >
                <i className='bi bi-x-circle-fill me-2'/>
                  Logout
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
