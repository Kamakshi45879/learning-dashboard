import {
  Layers,
  Network,
  Code2,
  BrainCircuit,
  BookOpen,
  Cpu,
  Database,
  Globe,
  Microscope,
  Music,
  Palette,
  Terminal,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Network,
  Code2,
  BrainCircuit,
  BookOpen,
  Cpu,
  Database,
  Globe,
  Microscope,
  Music,
  Palette,
  Terminal,
  Zap,
};

export function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? BookOpen;
  return <Icon className={className} />;
}
