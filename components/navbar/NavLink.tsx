import Link from "next/link";
import { useRouter } from "next/router";

interface INavLinkProps {
  href: string;
  text: string;
}

const NavLink = ({ href, text }: INavLinkProps) => {

  const router = useRouter();

  return (
    <Link href={ href }>
      <a className={`navbar-brand ${ router.pathname === href ? 'border-bottom border-2' : '' }`}>
        { text }
      </a>
    </Link>
  )
}

export default NavLink;
