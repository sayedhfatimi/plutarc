"use client";
import localFont from "next/font/local";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, Box, Flex, Heading, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";
import { useSession } from "next-auth/react";
import Spinner from "./Spinner";
import ThemeToggle from "./ThemeToggle";

const Gugi = localFont({
  src: "../assets/fonts/Gugi.ttf",
});

const NavBar = () => {
  return (
    <>
      <Box className="border-b p-1 shadow-sm" width="100%">
        <Flex justify="between">
          <Flex align="center" gap="3">
            <NavMenu />
          </Flex>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="mr-3">
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
    { label: "Dashboard", href: "/dashboard" },
    { label: "Trade History", href: "/trade-history" },
    { label: "Terminal", href: "/terminal" },
    { label: "Help", href: "/help" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/">
            <Text className={`${Gugi.className}`} size="5">
              plutarc
            </Text>
          </Link>
        </NavigationMenuItem>
        {status === "authenticated" &&
          NavLinks.map((link) => (
            <NavigationMenuItem key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ProfileMenu = () => {
  const { status, data: session } = useSession();

  if (status === "loading")
    return (
      <NavigationMenuItem>
        <Spinner />
      </NavigationMenuItem>
    );

  if (status === "unauthenticated")
    return (
      <NavigationMenuItem>
        <Link href="/api/auth/signin">Login</Link>
      </NavigationMenuItem>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          src={session!.user!.image!}
          fallback="?"
          size="2"
          className="mr-2 cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Text size="2">{session!.user!.email}</Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>
          <NextLink href="/settings/userApiCredentials">API Keys</NextLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <NextLink href="/api/auth/signout">Sign Out</NextLink>
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
