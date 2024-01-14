'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/hooks/auth'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '../ui/menubar'
import NavLink from './NavLink'

export default function Header() {
  const router = useRouter()
  const { isLogged, user, signOut } = useAuth()

  return (
    <nav className="flex flex-col justify-between py-12 md:flex-row">
      <Link href="/" className="self-start md:self-auto">
        <h1 className="text-3xl font-bold">Blog</h1>
      </Link>
      <div className="my-6 flex space-x-8 self-center md:my-0 md:self-auto">
        <ul className="flex space-x-8">
          {isLogged ? (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="text-primary hover:cursor-pointer">
                  {user.name}
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    className="hover:cursor-pointer"
                    onClick={() => router.push('/profile')}
                  >
                    Profile
                  </MenubarItem>
                  <MenubarItem
                    className="hover:cursor-pointer"
                    onClick={signOut}
                  >
                    Sair
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <NavLink href="/sign-in">Sign In / Sign Up</NavLink>
          )}
        </ul>
      </div>
    </nav>
  )
}
