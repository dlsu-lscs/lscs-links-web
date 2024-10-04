import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

import { Links } from "@/components/Links/Links";
import { CreateLink } from "@/components/Forms/CreateLink";

import { useCookies } from "react-cookie";

export const LinkShortener = () => {
  const lscsCommittees = [
    { name: "Research and Development", abbreviation: "rnd" },
    { name: "Academics", abbreviation: "acads" },
  ];

  //check if there is current token
  const [currentToken, ,] = useCookies(["currentToken"]);
  if (!("currentToken" in currentToken))
    window.location.replace("/accessAccount");

  return (
    <>
      <div className="min-h-screen bg-[#000000] text-white md:px-28 py-8">
        <div className="flex flex-wrap items-end space-x-5 space-y-6">
          <h1 className="font-bold text-4xl">Shortened Links</h1>
          <CreateLink></CreateLink>
          <Select>
            <SelectTrigger className="w-[180px] border-2 border-[#1D283A] bg-[#030711] text-white">
              <SelectValue placeholder="Committee" />
            </SelectTrigger>
            <SelectContent>
              {lscsCommittees.map((committee, index) => {
                return (
                  <>
                    <SelectItem key={index} value={committee.abbreviation}>
                      {committee.name}
                    </SelectItem>
                  </>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <Separator className="my-6 bg-[#1D283A]" />
        <Links></Links>
      </div>
    </>
  );
};
