import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import lscs_white from "../../assets/lscs_white.png";

import { UserIcon } from "@/components/User_Icon/UserIcon";

import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const NavBar = () => {
  const [currentUser] = useCookies(["currentUser"]);
  const user = currentUser.currentUser;

  const [currentToken, , removeCurrentToken] = useCookies(["currentToken"]);

  return (
    <>
      <header className="bg-[black] text-[#FFFFFF] flex justify-between items-center px-2 md:px-8 py-4">
        <Link to="/" className="flex items-center space-x-1 md:space-x-3">
          <img src={lscs_white} alt="" className="w-12 md:w-20" />
          <div>
            <h1 className="font-bold text-md md:text-3xl">
              Research and Development
            </h1>
            <p className="text-xs md:text-base">
              39th La Salle Computer Society
            </p>
          </div>
        </Link>
        <div className="hidden md:flex space-x-8">
          {"currentToken" in currentToken ? (
            <>
              <div className="hidden md:flex bg-[#1D283A] rounded-lg">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink>
                        <NavigationMenuTrigger className="bg-[#1D283A]">
                          <Link to="/">Link Shortener</Link>
                        </NavigationMenuTrigger>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                {/* <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-[#1D283A]">
                        Analytics
                      </NavigationMenuTrigger>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu> */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-[#1D283A]">
                        Other Applications
                      </NavigationMenuTrigger>
                      {/* <NavigationMenuContent className="bg-transparent"> */}
                      {/*   DocuSeal */}
                      {/* </NavigationMenuContent> */}
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </>
          ) : null}
          {"currentToken" in currentToken ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserIcon email={user.email}></UserIcon>{" "}
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" bg-[#030711] border-2 border-[#1D283A] rounded-lg text-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#030711]" />
                <DropdownMenuItem
                  onClick={() => {
                    removeCurrentToken("currentToken");
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <UserIcon email={""}></UserIcon>
          )}
        </div>
        {"currentToken" in currentToken ? (
          <div className="flex md:hidden">
            <Menubar className="bg-[#030711] border-2 border-[#1D283A] rounded-lg">
              <MenubarMenu>
                <MenubarTrigger>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </MenubarTrigger>
                <MenubarContent className="bg-[#030711] border-2 border-[#1D283A] rounded-lg text-white">
                  <MenubarItem>
                    <Link to="/">Link Shortener</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link to="">DocuSeal</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>{user.email}</MenubarItem>
                  <MenubarItem
                    onClick={() => {
                      removeCurrentToken("currentToken");
                    }}
                  >
                    Log Out
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        ) : null}
      </header>
    </>
  );
};
