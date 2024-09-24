import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";

import { ScrollArea } from "@/components/ui/scroll-area";

const Link = () => {
  return (
    <>
      <div>
        <div className="flex items-center space-x-3">
          <p className="text-2xl">
            <span className="font-bold">lscs.info</span>/ExcuseLetterForm
          </p>
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
      </div>
    </>
  );
};

const Links = () => {
  return (
    <>
      <Link></Link>
      {/* <ScrollArea className="h-[200px] w-[350px] rounded-md p-4 border-2 my-8">
      </ScrollArea> */}
    </>
  );
};

export const LinkShortener = () => {
  const lscsCommittees = [
    { name: "Research and Development", abbreviation: "rnd" },
    { name: "Academics", abbreviation: "acads" },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#000000] text-white px-28 py-8">
        <div className="flex items-end space-x-5">
          <h1 className="font-bold text-5xl">Shortened Links</h1>
          <Button variant="outline" className="text-black">
            Create New
          </Button>
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
