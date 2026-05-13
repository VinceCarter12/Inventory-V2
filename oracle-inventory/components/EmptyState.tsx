import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode, ElementType } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 24px",
      textAlign: "center",
      gap: 12,
    }}>
      <div style={{ color: "var(--muted)", opacity: 0.5, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--txt)", marginBottom: 4 }}>{title}</p>
        {description && (
          <p style={{ fontSize: 13, color: "var(--muted)" }}>{description}</p>
        )}
      </div>
      {action && (
        <Button render={<Link href={action.href} />} size="sm" className="mt-2 rounded-full h-8 px-4 text-xs font-bold" style={{ background: "var(--lime)", color: "#0F1112" }}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
