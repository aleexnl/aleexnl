import type { ConnectItem as ConnectItemType } from "@/types/connect";
import { Card } from "./Card";
import { ConnectItem } from "./ConnectItem";
import { ConnectIcon } from "./icons/ConnectIcon";

interface ConnectProps {
	items: ConnectItemType[];
}

export const Connect = ({ items }: ConnectProps) => {
	return (
		<Card title="Connect" icon={<ConnectIcon />}>
			<ul className="space-y-4">
				{items.map((item) => (
					<ConnectItem key={item.href} {...item} />
				))}
			</ul>
		</Card>
	);
};
