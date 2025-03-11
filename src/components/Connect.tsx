import { ConnectItem } from "./ConnectItem";
import { Card } from "./Card";
import { ConnectIcon } from "./icons/ConnectIcon";
import { ConnectItem as ConnectItemType } from "@/types/connect";

interface ConnectProps {
  items: ConnectItemType[];
}

export const Connect = ({ items }: ConnectProps) => {
  return (
    <Card title="Connect" icon={<ConnectIcon />}>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <ConnectItem key={index} {...item} />
        ))}
      </ul>
    </Card>
  );
};
