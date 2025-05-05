import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "../common/ThemeSwitcher";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (err: any) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <ThemeSwitcher />
      <h1 className="text-3xl font-bold mb-6 text-center">Grocery List App</h1>
      <Button onClick={handleLogout} variant="outline">
        Logout
      </Button>
    </header>
  );
}