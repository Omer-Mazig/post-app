import { ModeToggle } from "../shared/mode-toggle";

export const AppHeader = () => {
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b">
      <div>PostApp</div>
      <ModeToggle />
    </header>
  );
};
