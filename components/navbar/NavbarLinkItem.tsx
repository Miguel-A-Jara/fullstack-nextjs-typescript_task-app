import { useRouter } from 'next/router';

import styles  from '../../styles/navbar.module.css';

import NavLink from './NavLink'

interface INavbarLinkItemProps {
  href: string;
  text: string;
  children: React.ReactNode;
}

const NavbarLinkItem: React.FC<INavbarLinkItemProps> = ({ href, text, children }) => {

  const router = useRouter();

  return (
    <div className={
      `px-3 gap-2 ${styles['link-item']}
        ${ router.pathname === href ? 'bg-primary' : '' }
      `}
    >
      { children }
      <NavLink href={ href } text={ text } />
    </div>
  )
}

export default NavbarLinkItem;
