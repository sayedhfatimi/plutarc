'use client';
import ThemeToggle from '@/components/ThemeToggle';
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
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { gugiFont } from '@/lib/utils';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Avatar, Box, Flex, Text } from '@radix-ui/themes';
import {
  LuBookKey,
  LuCandlestickChart,
  LuHelpCircle,
  LuHistory,
  LuLayoutDashboard,
  LuLogOut,
  LuUser,
  LuWallet,
} from 'react-icons/lu';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import ApiKeySelector from './ApiKeySelector';

const NavBar = () => {
  return (
    <>
      <Box className='border-b p-1 shadow-sm' width='100%'>
        <Flex justify='between'>
          <Flex align='center'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Text size='5' className={`${gugiFont.className} px-4 py-2`}>
                    plutarc
                  </Text>
                </NavigationMenuItem>
                <TooltipProvider delayDuration={0}>
                  <NavMenu />
                </TooltipProvider>
              </NavigationMenuList>
            </NavigationMenu>
          </Flex>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <ApiKeySelector />
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

  const NavLinks: { label: string; href: string; icon: React.ReactNode }[] = [
    {
      label: 'Dashboard',
      href: '/auth/dashboard',
      icon: <LuLayoutDashboard />,
    },
    {
      label: 'Account Details',
      href: '/auth/account-details',
      icon: <LuWallet />,
    },
    {
      label: 'Trade History',
      href: '/auth/trade-history',
      icon: <LuHistory />,
    },
    {
      label: 'Terminal',
      href: '/auth/terminal',
      icon: <LuCandlestickChart />,
    },
    {
      label: 'Help',
      href: '/auth/help',
      icon: <LuHelpCircle />,
    },
  ];

  if (status === 'loading') return <Skeleton className='h-4 w-[200px]' />;

  return (
    <>
      {NavLinks.map((link) => (
        <Tooltip key={link.label}>
          <TooltipTrigger>
            <NavigationMenuItem>
              <Link href={link.href}>{link.icon}</Link>
            </NavigationMenuItem>
          </TooltipTrigger>
          <TooltipContent>{link.label}</TooltipContent>
        </Tooltip>
      ))}
    </>
  );
};

const ProfileMenu = () => {
  const { status, data: session } = useSession();

  if (status === 'loading')
    return <ReloadIcon className='mr-4 h-4 w-4 animate-spin' />;

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
          <Text size='2'>{session!.user!.email!}</Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <NextLink href='/auth/settings/profile'>
            <LuUser className='mr-2' />
            Profile
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <NextLink href='/auth/settings/userApiCredentials'>
            <LuBookKey className='mr-2' />
            API Keys
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
          <LuLogOut className='mr-2' />
          Sign Out
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
  children: React.ReactNode;
  props?: React.ComponentPropsWithoutRef<'a'>;
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
