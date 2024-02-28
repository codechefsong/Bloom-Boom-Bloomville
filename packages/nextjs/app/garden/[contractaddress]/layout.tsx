import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Garden",
  description: "Garden created with 🏗 Scaffold-ETH 2",
});

const GardenLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default GardenLayout;
