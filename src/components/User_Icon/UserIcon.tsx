import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserIcon = (userName: string) => {
  const getInitials = (name: string) => {
    const initials = name.split("_").map((i) => i[0].toUpperCase());
    return initials.length == 2 ? initials.join("") : initials[0];
  };

  const initials = getInitials("jose_simbillo@dlsu.edu.ph");

  return (
    <>
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback className="text-black">
          {initials.toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </>
  );
};
