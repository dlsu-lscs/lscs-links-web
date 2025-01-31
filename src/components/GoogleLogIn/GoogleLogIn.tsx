import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
// import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast";

export const GoogleLogIn = () => {
    //Constant URI LINK
    const URLLINK =
        import.meta.env.REACT_APP_LINKS_URL || "https://linksapidev.app.dlsu-lscs.org";

    const [user, setUser] = useState<any>();
    const [, setCurrentUser] = useCookies<string>(["currentUser"]);
    const [, setCurrentToken] = useCookies<string>(["currentToken"]);
    const [, setCurrentLinksToken] = useCookies<string>(["currentLinksToken"]);

    const logIn = useGoogleLogin({
        onSuccess: (response) => {
            setUser(response);
        },
        onError: (error) => {
            console.log(error);
            setUser(null);
        },
    });

    // const { toast } = useToast();

    useEffect(() => {
        const getGoogleAccount = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: "application/json",
                        },
                    }
                );

                const getLogin = async (token: string, email: string) => {
                    try {
                        const response = await axios.post(
                            `${URLLINK}/auth/login`,
                            { token: token },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        console.log(response.data);
                        if (response.data.status == "success") {
                            setCurrentLinksToken(
                                "currentLinksToken",
                                response.data.jwt_token
                            );
                            setCurrentUser("currentUser", email, { path: "/" });
                            setCurrentToken("currentToken", user.access_token, { path: "/" });
                            window.location.reload();
                            window.location.replace("/");
                        }
                    } catch (e) {
                        console.log("Log In Error: " + e);
                    }
                };

                // const checkEmail = async (email: string) => {
                //   try {
                //     const response = await axios.post(
                //       "/auth/check-email",
                //       { email: email },
                //       {
                //         headers: {
                //           "Content-Type": "application/json",
                //         },
                //       }
                //     );
                //     if (response.data.state == "present") {
                //       setCurrentUser("currentUser", email, { path: "/" });
                //       setCurrentToken("currentToken", user.access_token, { path: "/" });
                //       getLogin(currentToken.currentToken);
                //     } else if (response.data.state == "absent") {
                //       toast({
                //         variant: "destructive",
                //         title: "bossing d ka member ng lscs",
                //         description: "sino ka ba hahahaah",
                //         action: (
                //           <ToastAction altText="Try again">
                //             try mo ulet hehehe
                //           </ToastAction>
                //         ),
                //       });
                //     }
                //   } catch (e) {
                //     console.log(e);
                //     toast({
                //       variant: "destructive",
                //       title: "bossing d ka member ng lscs",
                //       description: "sino ka ba hahahaah",
                //       action: (
                //         <ToastAction altText="Try again">
                //           try mo ulet hehehe
                //         </ToastAction>
                //       ),
                //     });
                //   }
                // };
                // checkEmail(response.data.email);
                getLogin(user.access_token, response.data.email);
            } catch (e) {
                console.log(e);
            }
        };
        if (user) {
            getGoogleAccount();
        }
    }, user);

    return (
        <>
            <Button
                variant="outline"
                className="flex justify-center items-center hover:brightness-50"
                onClick={() => {
                    setUser(null);
                    logIn();
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="0.98em"
                    height="1em"
                    viewBox="0 0 256 262"
                    className="mr-3"
                >
                    <path
                        fill="black"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    ></path>
                    <path
                        fill="black"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    ></path>
                    <path
                        fill="black"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                    ></path>
                    <path
                        fill="black"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    ></path>
                </svg>
                Log In using Gmail
            </Button>
        </>
    );
};
