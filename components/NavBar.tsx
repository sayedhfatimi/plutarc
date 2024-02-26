'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Avatar, Box, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import localFont from 'next/font/local';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';
import ApiCredentialSelector from './ApiCredentialSelector';
import ThemeToggle from './ThemeToggle';
import { Skeleton } from './ui/skeleton';

const Gugi = localFont({
  src: '../assets/fonts/Gugi.ttf',
});

const NavBar = () => {
  const { status } = useSession();

  return (
    <>
      <Box className='border-b p-1 shadow-sm' width='100%'>
        <Flex justify='between'>
          <Flex align='center'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href='/'>
                    <Text className={`${Gugi.className}`} size='5'>
                      plutarc
                    </Text>
                  </Link>
                </NavigationMenuItem>
                <NavMenu />
              </NavigationMenuList>
            </NavigationMenu>
          </Flex>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {status === 'authenticated' && <ApiCredentialSelector />}
              </NavigationMenuItem>
              <NavigationMenuItem className='mr-3'>
                <ThemeToggle />
              </NavigationMenuItem>
              <ProfileMenu />
            </NavigationMenuList>
          </NavigationMenu>
        </Flex>
      </Box>
    </>
  );
};

const NavMenu = () => {
  const { status } = useSession();

  const NavLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Account Details', href: '/account-details' },
    { label: 'Trade History', href: '/trade-history' },
    { label: 'Terminal', href: '/terminal' },
    { label: 'Help', href: '/help' },
  ];

  if (status === 'loading') return <Skeleton className='h-4 w-[200px]' />;

  return (
    <>
      {status === 'authenticated' &&
        NavLinks.map((link) => (
          <NavigationMenuItem key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </NavigationMenuItem>
        ))}
    </>
  );
};

const ProfileMenu = () => {
  const { status, data: session } = useSession();

  if (status === 'loading')
    return <ReloadIcon className='mr-4 h-4 w-4 animate-spin' />;

  if (status === 'unauthenticated')
    return (
      <NavigationMenuItem>
        <Link href='/api/auth/signin'>Login</Link>
      </NavigationMenuItem>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          src={session!.user!.image!}
          fallback='?'
          size='2'
          className='mr-2 cursor-pointer'
          referrerPolicy='no-referrer'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Text size='2'>{session!.user!.email}</Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NextLink href='/settings/profile'>Profile</NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NextLink href='/settings/userApiCredentials'>API Keys</NextLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NextLink href='/api/auth/signout'>Sign Out</NextLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Link = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: ReactNode;
  props?: PropsWithChildren;
}) => {
  const currentPath = usePathname();
  const isActive = currentPath === href;

  return (
    <NextLink href={href} passHref legacyBehavior>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle()}
        active={isActive}
        {...props}
      >
        {children}
      </NavigationMenuLink>
    </NextLink>
  );
};

export default NavBar;
