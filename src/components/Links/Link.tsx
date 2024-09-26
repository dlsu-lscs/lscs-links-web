import { UserIcon } from "@/components/User_Icon/UserIcon";

import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useFetch } from "@/hooks/useFetch";

type linkData = {
  createdBy: string;
  longLink: string;
  shortLink: string;
  qr: string;
};

import { useCookies } from "react-cookie";

export const Link = ({ createdBy, longLink, shortLink, qr }: linkData) => {
  const [currentToken] = useCookies(["currentToken"]);
  const token = currentToken.currentToken;
  const { data, loading, error } = useFetch(
    `https://lscs.info/analytics/${shortLink}`,
    token
  );

  if (loading) {
    return (
      <>
        <p className="text-white"></p>
      </>
    );
  }
  console.log(qr);
  return (
    <>
      <div className="mb-12">
        <div className="flex items-center space-x-3">
          <a href={`https://lscs.info/${shortLink}`} className="text-2xl">
            <span className="font-bold">lscs.info</span>/{shortLink}
          </a>
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <Badge className="text-black bg-white font-bold">rnd</Badge>
        </div>
        <div className="text-slate-500 flex items-center space-x-2 mt-1">
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
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
          <a href={longLink} className="text-xl">
            {longLink}
          </a>
        </div>
        <div className="my-3">{data.count} clicks</div>
        <div className="flex items-center space-x-3 my-3">
          <UserIcon email={{ email: createdBy }}></UserIcon>
          <p>Created by {createdBy}</p>
        </div>
        {qr ? (
          <>
            <img src={qr} alt="" />
          </>
        ) : null}
        <Separator className="bg-[#1D283A] my-2`" />
      </div>
    </>
  );
};
