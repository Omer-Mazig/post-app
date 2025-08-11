import { ModeToggle } from "../shared/mode-toggle";

export const AppHeader = () => {
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b sticky top-0 bg-background z-10">
      <div>PostApp</div>
      <ModeToggle />
    </header>
  );
};
