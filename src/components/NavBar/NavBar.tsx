import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import lscs_white from "../../assets/lscs_white.png";

import { UserIcon } from "@/components/User_Icon/UserIcon";

import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <header className="bg-[black] text-[#FFFFFF] flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-3">
          <img src={lscs_white} alt="" className="w-20" />
          <div>
            <h1 className="font-bold text-3xl">Research and Development</h1>
            <p>39th La Salle Computer Society</p>
          </div>
        </div>
        <div className="flex space-x-8">
          <div className="flex bg-[#1D283A] rounded-lg">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-[#1D283A]">
                    <Link to="/">Link Shortener</Link>
                  </NavigationMenuTrigger>
                  {/* <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent> */}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-[#1D283A]">
                    Analytics
                  </NavigationMenuTrigger>
                  {/* <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent> */}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-[#1D283A]">
                    Other Applications
                  </NavigationMenuTrigger>
                  {/* <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent> */}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Link to="/login">
            <UserIcon></UserIcon>
          </Link>
        </div>
      </header>
    </>
  );
};
