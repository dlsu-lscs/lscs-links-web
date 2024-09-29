import { UserIcon } from "@/components/User_Icon/UserIcon";
import { EditLink } from "@/components/Forms/EditLink";

import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useFetch } from "@/hooks/useFetch";

type linkData = {
  linkID: string;
  createdBy: string;
  longLink: string;
  shortLink: string;
  qr: string;
};

type countData = {
  count: number;
};

import { useCookies } from "react-cookie";

export const Link = ({
  linkID,
  createdBy,
  longLink,
  shortLink,
  qr,
}: linkData) => {
  const [currentToken] = useCookies(["currentToken"]);
  const token = currentToken.currentToken;
  const { data, loading } = useFetch(
    `https://lscs.info/analytics/${shortLink}`,
    token
  );

  const fetchedData: countData | null = data as countData | null;
  console.log(fetchedData);

  if (loading) {
    return (
      <>
        <p className="text-white"></p>
      </>
    );
  }
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3">
              <h1
                className="text-2xl cursor-pointer"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `lscs.info/${shortLink}`
                    );
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <span className="font-bold">lscs.info</span>/{shortLink}
              </h1>
              <EditLink linkID={linkID}></EditLink>
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
              <p
                className="text-xl cursor-pointer	"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(longLink);
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                {longLink}
              </p>
            </div>
            <div className="my-3">{fetchedData?.count ?? 0} clicks</div>
            <div className="flex items-center space-x-3 my-3">
              <UserIcon email={createdBy}></UserIcon>
              <p>Created by {createdBy}</p>
            </div>
          </div>
          <div className="px-8">
            {qr ? (
              <>
                <div className="flex justify-center flex-col items-center space-y-3">
                  <img src={qr} className="rounded-md w-32" alt="" />
                  <a href={qr} className="underline text-[#7F8EA3]">
                    Download
                  </a>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <Separator className="bg-[#1D283A] my-2`" />
      </div>
    </>
  );
};
