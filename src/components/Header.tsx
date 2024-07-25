import { Avatar } from "./plate-ui/avatar";
import { Button } from "./plate-ui/button";
import { Input } from "./plate-ui/input";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-2 bg-secondary/10">
      <div className="flex items-center">
        <Input 
          type="text" 
          placeholder="Quick find" 
          className="px-3 py-1 mr-2 text-sm rounded bg-input"
        />
        <span className="text-sm">⌘F</span>
      </div>
      <div className="flex items-center">
        <Button className="px-3 py-1 mr-2 text-sm rounded bg-primary text-primary-foreground">New note</Button>
        <Avatar className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-background">QN</Avatar>
      </div>
    </header>
  );
};

export default Header;
