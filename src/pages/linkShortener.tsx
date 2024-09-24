import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

const Links = () => {
  return <>burat</>;
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
