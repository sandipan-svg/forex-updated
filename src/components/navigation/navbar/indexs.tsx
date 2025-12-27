import { authClient } from "@/lib/auth/auth-client";
import AuthItems from "../authItems";
import AuthNavbar from "../authNavbar";

const ClientNavbar = () => {
  const { data: session } = authClient.useSession();
  return (
    <div>
      {session?.session?.token ? (
        <AuthItems user={session?.user} />
      ) : (
        <AuthNavbar />
      )}
    </div>
  );
};
export default ClientNavbar;
