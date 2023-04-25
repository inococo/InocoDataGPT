import { Ring } from "@uiball/loaders";

interface LoaderProps {
  className?: string;
  size?: number;
  speed?: number;
  lineWeight?: number;
}

const Loader: React.FC<LoaderProps> = ({
  className,
  size = 16,
  speed = 2,
  lineWeight = 7,
}) => {
  return