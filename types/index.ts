export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface Student {
  name: string;
  streak: number;
  totalXP: number;
  level: number;
  avatarInitials: string;
}

export interface ActivityDay {
  date: string;
  count: number; // 0-4 intensity
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}
