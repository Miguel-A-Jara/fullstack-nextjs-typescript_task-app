import { useRouter } from 'next/router';

import styles  from '../../styles/navbar.module.css';

import NavLink from './NavLink'

interface INavbarLinkItemProps {
  href    : string;
  text    : string;
  children: React.ReactNode;
  styleProps? : string;
}

const NavbarLinkItem: React.FC<INavbarLinkItemProps> = ({ href, text, children, styleProps }) => {

  const router = useRouter();

  return (
    <div className={
      `${styleProps} px-3 gap-2 d-flex ${styles['link-item']}
        ${ router.pathname === href ? 'bg-primary' : '' }
      `}
    >
      { children }
      <NavLink href={ href } text={ text } />
    </div>
  )
}

export default NavbarLinkItem;
