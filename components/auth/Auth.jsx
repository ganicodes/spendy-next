import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import dummyProfile from "../../public/dummy_profile_pic.svg";
import { ToggleTheme } from "../ui/themeToggle";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  return (
    <>
      <div className="absolute right-8 top-8">
        <ToggleTheme />
      </div>
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border p-4 rounded">
        <div className="w-full mb-4">
          <Image
            height={100}
            width={100}
            priority={false}
            alt="dummy-profile"
            src={dummyProfile}
            className="mx-auto"
          />
        </div>
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="w-full mx-auto">
            <TabsTrigger value="login" className="w-1/2">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="w-1/2">
              Signup
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default Auth;
