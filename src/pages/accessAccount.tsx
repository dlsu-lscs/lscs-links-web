import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LogIn } from "@/components/Forms/LogIn";

export const AccessAccount = () => {
  return (
    <>
      <div className="min-h-screen bg-[#000000] text-white px-28 py-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <Tabs
            defaultValue="logIn"
            className="w-[400px] flex flex-col items-center space-y-10"
          >
            <TabsList className="bg-[#1D283A]">
              <TabsTrigger value="logIn" className="bg-[#1D283A]">
                Log-In
              </TabsTrigger>
              <TabsTrigger value="password" className="bg-[#1D283A]">
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="logIn" className="space-y-3">
              <p className="font-bold text-3xl">Log-In</p>
              <LogIn></LogIn>
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};
