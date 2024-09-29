import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type email = {
  email: string;
};

export const UserIcon = ({ email }: email) => {
  if (email != "") {
    const getInitials = (name: string) => {
      const initials = name.split("_").map((i) => i[0].toUpperCase());
      return initials.length == 2 ? initials.join("") : initials[0];
    };

    const initials = getInitials(email);

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
  } else {
    return (
      <>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="text-black"></AvatarFallback>
        </Avatar>
      </>
    );
  }
};
