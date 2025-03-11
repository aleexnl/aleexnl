import { ReactNode } from "react";

export interface ConnectItem {
  href: string;
  icon: ReactNode;
  name: string;
  hoverColor?: {
    light: string;
    dark: string;
  };
}
