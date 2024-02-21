import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Gardens",
  description: "Gardens created with 🏗 Scaffold-ETH 2",
});

const LobbyLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LobbyLayout;
