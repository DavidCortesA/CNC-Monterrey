"use client";

import {
  Cog, Wrench, FlaskConical, Factory, ScanLine,
  Award, Zap, ShieldCheck, Layers,
  Crosshair, Target, Shield, Lightbulb,
  Eye, CheckCircle2, MapPin, Phone, Mail, Clock,
  ArrowRight, Globe,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

const iconMap = {
  cog: Cog,
  wrench: Wrench,
  flask: FlaskConical,
  factory: Factory,
  scan: ScanLine,
  award: Award,
  zap: Zap,
  "shield-check": ShieldCheck,
  layers: Layers,
  crosshair: Crosshair,
  target: Target,
  shield: Shield,
  lightbulb: Lightbulb,
  eye: Eye,
  "check-circle": CheckCircle2,
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  "arrow-right": ArrowRight,
  globe: Globe,
} as const;

export type IconKey = keyof typeof iconMap;

interface Props extends LucideProps {
  name: IconKey;
}

export default function IconBox({ name, ...props }: Props) {
  const Icon = iconMap[name];
  return <Icon {...props} />;
}
