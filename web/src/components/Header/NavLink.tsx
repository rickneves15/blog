'use client'

import Link, { LinkProps } from 'next/link'

type NavLinkProps = LinkProps & {
  children: React.ReactNode
}

export default function NavLink({ children, ...rest }: NavLinkProps) {
  return (
    <Link className="group" {...rest}>
      {children}
      <span className="block h-0.5 max-w-0 bg-white transition-all duration-300 group-hover:max-w-full"></span>
    </Link>
  )
}
