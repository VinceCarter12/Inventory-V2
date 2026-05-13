"use client";

import TopBar from "@/components/TopBar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ROWS = [
  ["Dell XPS 15 Laptop", "LAP-0241", "Maria Santos", "IT Dept", "Manila HQ", "Mar 12", "Active", "active"],
  ["Logitech MX Keys", "KB-0118", "Jun Reyes", "HR", "Manila HQ", "Apr 02", "Active", "active"],
  ["HP Z27 Monitor", "MON-0334", "Marco Cruz", "Finance", "Manila HQ", "Jan 18", "Active", "active"],
  ["iPad Air 5", "TAB-0034", "Anna Lim", "Operations", "Cebu", "May 06", "Pending", "pending"],
  ["MacBook Pro 14\"", "LAP-0299", "Priya Natarajan", "Design", "Manila HQ", "Feb 25", "Active", "active"],
  ["Cisco IP Phone", "PHN-0042", "Daniel Kim", "Engineering", "Cebu", "Apr 22", "Active", "active"],
  ["Brother L2540 Printer", "PR-0088", "—", "—", "Service Bay", "May 05", "Returned", "returned"],
  ["Dell U2723QE", "MON-0341", "Aaron Cruz", "Finance", "Manila HQ", "Mar 30", "Active", "active"],
];

function statusBadge(key: string, label: string) {
  switch (key) {
    case "active":
      return <Badge style={{ background: "rgba(198,255,0,.12)", color: "#C6FF00", borderColor: "transparent" }}>{label}</Badge>;
    case "pending":
      return <Badge style={{ background: "rgba(255,193,7,.1)", color: "#FFC107", borderColor: "transparent" }}>{label}</Badge>;
    case "returned":
      return <Badge style={{ background: "rgba(255,255,255,.07)", color: "#6B7280", borderColor: "transparent" }}>{label}</Badge>;
    default:
      return <Badge variant="secondary">{label}</Badge>;
  }
}

const TABS = ["All", "Active", "Pending", "Returned"];

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg)", borderRadius: 16 }}>
      <TopBar placeholder="Search assignments…" title="Assignments" actionLabel="New Assignment">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-9 rounded-full px-1 gap-0.5" style={{ background: "#1E2124", border: "1px solid rgba(255,255,255,0.07)" }}>
            {TABS.map(t => (
              <TabsTrigger
                key={t}
                value={t}
                className="rounded-full px-3.5 h-7 text-xs font-semibold data-[state=active]:bg-white/8 data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </TopBar>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>
        <div className="d-card" style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
              Active assignments <span style={{ color: "var(--muted)", fontWeight: 500 }}>· 184</span>
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              {["Dept ▾", "Site ▾", "Sort ▾"].map(f => (
                <Button key={f} variant="ghost" size="sm" className="rounded-full h-7 px-3 text-xs font-semibold text-muted-foreground border border-white/7 hover:text-white">
                  {f}
                </Button>
              ))}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Asset", "Tag", "Assignee", "Dept", "Site", "Since", "Status", ""].map(h => (
                  <TableHead key={h} className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map(([asset, tag, assignee, dept, site, since, status, key]) => (
                <TableRow key={tag} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <TableCell className="font-semibold text-white">{asset}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{tag}</TableCell>
                  <TableCell style={{ color: "#E8E8E8" }}>{assignee}</TableCell>
                  <TableCell className="text-muted-foreground">{dept}</TableCell>
                  <TableCell className="text-muted-foreground">{site}</TableCell>
                  <TableCell className="text-muted-foreground">{since}</TableCell>
                  <TableCell>{statusBadge(key, status)}</TableCell>
                  <TableCell className="text-muted-foreground text-right cursor-pointer">⋯</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 11, color: "var(--muted)" }}>
            <span>Showing 8 of 184</span>
            <div style={{ display: "flex", gap: 4 }}>
              {["‹", "1", "2", "3", "›"].map((p, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="sm"
                  className="w-7 h-7 p-0 rounded-full text-xs"
                  style={p === "1" ? { background: "var(--lime)", color: "#0F1112", fontWeight: 700 } : { background: "rgba(255,255,255,.06)", color: "var(--muted)" }}
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
