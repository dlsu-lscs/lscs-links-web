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
      <header className="bg-[black] text-[#FFFFFF] flex justify-between items-center px-8 py-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={lscs_white} alt="" className="w-20" />
          <div>
            <h1 className="font-bold text-3xl">Research and Development</h1>
            <p>39th La Salle Computer Society</p>
          </div>
        </Link>
        <div className="flex space-x-8">
          {"currentToken" in currentToken ? (
            <>
              <div className="flex bg-[#1D283A] rounded-lg">
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
          {/* <NavigationMenu>
            <NavigationMenuList className="bg-[#1D283A] rounded-lg">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-[#1D283A]  hover:bg-[#333] hover:text-white">
                  <Link to="/">Link Shortener</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent></NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-[#1D283A]">
                  Other Applications
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col p-8  bg-[#030711] border-2 border-[#1D283A] rounded-lg text-white">
                    <a href>DocuSeal</a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
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
      </header>
    </>
  );
};
