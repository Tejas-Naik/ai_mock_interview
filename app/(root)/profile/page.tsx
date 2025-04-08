import ProfilePage from "@/components/ProfilePage";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

async function Profile() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/sign-in");
  }
  
  return <ProfilePage user={user} />;
}

export default Profile;
