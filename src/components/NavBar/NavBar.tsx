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

import lscs_white from "../../assets/lscs_white.png";

import { UserIcon } from "@/components/User_Icon/UserIcon";

import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useFetch } from "@/hooks/useFetch";

export const NavBar = () => {
  const [currentUser] = useCookies(["currentUser"]);
  const user = currentUser.currentUser;

  const [currentToken, setCurrentToken, removeCurrentToken] = useCookies([
    "currentToken",
  ]);
  const { data, loading, error } = useFetch(
    "https://lscs.info/admin/links",
    currentToken.currentToken
  );

  return (
    <>
      <header className="bg-[black] text-[#FFFFFF] flex justify-between items-center px-8 py-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={lscs_white} alt="" className="w-20" />
          <div>
            <h1 className="font-bold text-3xl">Research and Development</h1>
            <p>39th La Salle Computer Society</p>
          </div>
        </Link>
        <div className="flex space-x-8">
          <div className="flex bg-[#1D283A] rounded-lg">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-[#1D283A]">
                    <Link to="/">Link Shortener</Link>
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-[#1D283A]">
                    Analytics
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-[#1D283A]">
                    Other Applications
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Link to="/accessAccount">
            {"currentToken" in currentToken ? (
              <UserIcon email={{ email: user.email }}></UserIcon>
            ) : (
              <UserIcon></UserIcon>
            )}
          </Link>
        </div>
      </header>
    </>
  );
};
