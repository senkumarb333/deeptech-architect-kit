import {
  LayoutDashboard, Building2, AppWindow, Database, Plug, Server,
  ShieldCheck, Bot, BookOpen, Network, Workflow, Gavel, Briefcase,
  Search, ScrollText, Settings, GitBranch, Boxes, Wrench,
} from "lucide-react";

export interface NavItem {
  title: string;
  to: string;
  icon: any;
}
export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const APP_NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Executive Dashboard", to: "/app", icon: LayoutDashboard },
      { title: "Enterprise Search", to: "/app/search", icon: Search },
    ],
  },
  {
    label: "Business Architecture",
    items: [
      { title: "Capabilities", to: "/app/capabilities", icon: Building2 },
      { title: "Value Streams", to: "/app/value-streams", icon: GitBranch },
      { title: "Processes", to: "/app/processes", icon: Workflow },
    ],
  },
  {
    label: "Application Architecture",
    items: [
      { title: "Applications", to: "/app/applications", icon: AppWindow },
      { title: "Services", to: "/app/services", icon: Boxes },
      { title: "APIs & Events", to: "/app/apis", icon: Plug },
    ],
  },
  {
    label: "Data & Integration",
    items: [
      { title: "Data Domains", to: "/app/data", icon: Database },
      { title: "Integration", to: "/app/integration", icon: Plug },
    ],
  },
  {
    label: "Technology & Security",
    items: [
      { title: "Infrastructure", to: "/app/infrastructure", icon: Server },
      { title: "Security", to: "/app/security", icon: ShieldCheck },
    ],
  },
  {
    label: "AI Architecture",
    items: [
      { title: "Agent Studio", to: "/app/agents", icon: Bot },
      { title: "Prompts & Knowledge", to: "/app/knowledge", icon: BookOpen },
    ],
  },
  {
    label: "Repository & Governance",
    items: [
      { title: "Knowledge Graph", to: "/app/graph", icon: Network },
      { title: "Architecture Decisions", to: "/app/decisions", icon: ScrollText },
      { title: "Reviews", to: "/app/reviews", icon: Gavel },
      { title: "Risks & Controls", to: "/app/risks", icon: ShieldCheck },
      { title: "Portfolio", to: "/app/portfolio", icon: Briefcase },
    ],
  },
  {
    label: "Admin",
    items: [
      { title: "Audit Log", to: "/app/audit", icon: ScrollText },
      { title: "Settings", to: "/app/settings", icon: Settings },
      { title: "Workspace Admin", to: "/app/admin", icon: Wrench },
    ],
  },
];
