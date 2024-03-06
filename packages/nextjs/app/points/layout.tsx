import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Bloom Point",
  description: "Bloom Point created with 🏗 Scaffold-ETH 2",
});

const LobbyLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LobbyLayout;
