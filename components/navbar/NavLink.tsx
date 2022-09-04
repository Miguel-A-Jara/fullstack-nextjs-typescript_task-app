import Link from "next/link";
import { useRouter } from "next/router";

interface INavLinkProps {
  href: string;
  text: string;
}

const NavLink = ({ href, text }: INavLinkProps) => {

  return (
    <Link href={ href }>
      <a className={`navbar-brand`}>
        { text }
      </a>
    </Link>
  )
}

export default NavLink;
