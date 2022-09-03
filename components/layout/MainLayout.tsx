import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';
import useSize from '../../utils/hooks/useSize';
import Navbar from '../navbar/Navbar';

interface IMainLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const MainLayout = ({ children }: IMainLayoutProps) => {

  const target = useRef(null);
  const size = useSize(target);

  return (
    <Provider store={store}>
      <Navbar refHeight={target} />
      <div className='blur' />
      <main
        className='container container-xl'
        style={{ paddingTop: size?.height }}
      >
        { children }
      </main>
    </Provider>
  )
}

export default MainLayout;
