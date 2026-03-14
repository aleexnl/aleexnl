import type { ConnectItem as ConnectItemType } from "@/types/connect";
import { Card } from "./Card";
import { ConnectItem } from "./ConnectItem";
import { ConnectIcon } from "./icons/ConnectIcon";

interface ConnectProps {
	items: ConnectItemType[];
	title: string;
}

export const Connect = ({ items, title }: ConnectProps) => {
	return (
		<Card title={title} icon={<ConnectIcon />}>
			<ul className="space-y-3">
				{items.map((item) => (
					<ConnectItem key={item.href} {...item} />
				))}
			</ul>
		</Card>
	);
};
