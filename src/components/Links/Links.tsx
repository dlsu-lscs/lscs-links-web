import { useFetch } from "@/hooks/useFetch";
import { Link } from "@/components/Links/Link";

import { useCookies } from "react-cookie";

import { ScrollArea } from "../ui/scroll-area";

export const Links = () => {
  const [currentToken] = useCookies(["currentToken"]);
  const token = currentToken.currentToken;
  const { data, loading, error } = useFetch(
    "https://lscs.info/admin/links",
    token
  );
  console.log(data);
  if (loading) {
    return (
      <>
        <p className="text-white">Loading....</p>
      </>
    );
  }
  return (
    <>
      <ScrollArea className="h-[400px] w-[720px] rounded-md  space-y-3">
        {data.data.data.map((link) => {
          return (
            <>
              <Link
                createdBy={link.created_by}
                longLink={link.longlink}
                shortLink={link.shortlink}
              ></Link>
            </>
          );
        })}
      </ScrollArea>
    </>
  );
};
