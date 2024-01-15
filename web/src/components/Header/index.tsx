'use client'
import { PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/hooks/auth'

import { Button } from '../ui/button'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '../ui/menubar'
import NavLink from './NavLink'

export function Header() {
  const router = useRouter()
  const { isLogged, user, signOut } = useAuth()

  return (
    <nav className="flex flex-col justify-between py-12 md:flex-row">
      <Link href="/" className="self-start md:self-auto">
        <h1 className="text-3xl font-bold">Blog</h1>
      </Link>
      <div className="my-6 flex space-x-8 self-center md:my-0 md:self-auto">
        <ul className="flex items-center space-x-8">
          <Link href={'/post/new'}>
            <Button variant="secondary">
              <PlusIcon className="mr-2 h-4 w-4" />
              Novo Post
            </Button>
          </Link>
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
