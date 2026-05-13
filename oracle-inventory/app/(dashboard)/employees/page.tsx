import TopBar from "@/components/TopBar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const EMPLOYEES = [
  ["Maria Santos", "IT Dept", "Manila HQ", 5, 8, "#C6FF00", "#0F1112"],
  ["Jun Reyes", "HR", "Manila HQ", 3, 8, "#7B5CF5", "#fff"],
  ["Marco Cruz", "Finance", "Manila HQ", 2, 8, "#3B82F6", "#fff"],
  ["Anna Lim", "Operations", "Cebu", 4, 8, "#22C55E", "#fff"],
  ["Priya Natarajan", "Design", "Manila HQ", 6, 8, "#F59E0B", "#0F1112"],
  ["Daniel Kim", "Engineering", "Cebu", 3, 8, "#EC4899", "#fff"],
  ["Aaron Cruz", "Finance", "Manila HQ", 2, 8, "#14B8A6", "#fff"],
  ["Lara Mendoza", "Marketing", "Manila HQ", 4, 8, "#C6FF00", "#0F1112"],
  ["Tomás Rivera", "Engineering", "Manila HQ", 5, 8, "#7B5CF5", "#fff"],
] as const;

export default function EmployeesPage() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg)", borderRadius: 16 }}>
      <TopBar placeholder="Search employees…" title="Employees" actionLabel="Add Employee">
        <Button variant="ghost" size="sm" className="rounded-full h-8 px-3.5 text-xs font-semibold text-muted-foreground border border-white/7 hover:text-white">
          All Depts ▾
        </Button>
      </TopBar>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>

        {/* KPI strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 14 }}>
          {[["Total", "142", "Across 6 departments"], ["With Assets", "98", "69% coverage"], ["Unassigned", "44", "Pending onboarding"]].map(([label, val, sub]) => (
            <Card key={label}>
              <CardContent style={{ padding: "16px 18px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginTop: 4 }}>{val}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Employee grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {EMPLOYEES.map(([name, dept, site, assigned, total, bg, fg]) => {
            const initials = (name as string).split(" ").map((w: string) => w[0]).slice(0, 2).join("");
            const pct = Math.round((assigned as number) / (total as number) * 100);
            return (
              <Card key={name as string}>
                <CardContent style={{ padding: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar style={{ width: 40, height: 40, flexShrink: 0 }}>
                      <AvatarFallback style={{ background: bg as string, color: fg as string, fontWeight: 800, fontSize: 13 }}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name as string}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{dept as string} · {site as string}</div>
                    </div>
                    <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-white flex-shrink-0">
                      ⋯
                    </Button>
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>Items assigned</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                        {assigned as number}<span style={{ color: "var(--muted)", fontWeight: 500 }}>/{total as number}</span>
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 3 }}>
                      {Array.from({ length: total as number }, (_, i) => (
                        <span key={i} className={`pip${i < (assigned as number) ? " on" : ""}`} />
                      ))}
                    </div>
                    <div style={{ height: 3, background: "rgba(255,255,255,.06)", borderRadius: "9999px", marginTop: 8, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: bg as string, borderRadius: "9999px" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
