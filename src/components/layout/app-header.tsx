import { Link } from "react-router-dom";
import { ModeToggle } from "../shared/mode-toggle";

export const AppHeader = () => {
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b bg-background">
      <Link to="/">PostApp</Link>
      <ModeToggle />
    </header>
  );
};
