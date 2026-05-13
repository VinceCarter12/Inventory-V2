import TopBar from "@/components/TopBar";
import { Card, CardContent } from "@/components/ui/card";

const SITES = [
  { name: "Manila HQ", sub: "Makati · 3 floors", count: 168, color: "var(--lime)", pct: "78%", label: "67.7% of total" },
  { name: "Cebu Office", sub: "IT Park · 1 floor", count: 48, color: "var(--purple)", pct: "34%", label: "19.3% of total" },
  { name: "Davao Hub", sub: "Lanang · 1 floor", count: 22, color: "#3B82F6", pct: "16%", label: "8.9% of total" },
  { name: "Service Bay", sub: "Repair queue", count: 10, color: "var(--muted)", pct: "8%", label: "4.0% of total" },
];

const PINS = [
  { label: "Manila HQ · 168", left: "28%", top: "52%", color: "var(--lime)" },
  { label: "Cebu · 48", left: "48%", top: "66%", color: "var(--purple)" },
  { label: "Davao · 22", left: "70%", top: "72%", color: "#3B82F6" },
  { label: "Service Bay · 10", left: "38%", top: "80%", color: "var(--muted)" },
];

export default function SitesPage() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg)", borderRadius: 16 }}>
      <TopBar placeholder="Search sites…" title="Sites" actionLabel="Add Site" />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
          {/* Map card */}
          <Card style={{ position: "relative", minHeight: 420, overflow: "hidden" }}>
            <CardContent style={{ padding: 20, height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Coverage Map</span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>4 active sites</span>
              </div>
              <div style={{ position: "absolute", inset: 0, opacity: .05, backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
              <svg style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", opacity: .04 }} viewBox="0 0 600 400" width="600" height="400" fill="white">
                <ellipse cx="300" cy="200" rx="260" ry="160" />
              </svg>
              <div style={{ position: "relative", width: "100%", height: 340 }}>
                {PINS.map(pin => (
                  <div key={pin.label} className="pin" style={{ left: pin.left, top: pin.top }}>
                    <div className="pin-lbl">{pin.label}</div>
                    <div className="pin-dot" style={{ background: pin.color }} />
                  </div>
                ))}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M28 52 L48 66 L70 72" stroke="rgba(255,255,255,.12)" strokeWidth=".4" strokeDasharray="2 2" fill="none" />
                  <path d="M28 52 L38 80" stroke="rgba(255,255,255,.08)" strokeWidth=".4" strokeDasharray="2 2" fill="none" />
                </svg>
              </div>
            </CardContent>
          </Card>

          {/* Site list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SITES.map(s => (
              <Card key={s.name}>
                <CardContent style={{ padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{s.sub}</div>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.count}</span>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,.06)", borderRadius: "9999px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: s.pct, background: s.color, borderRadius: "9999px" }} />
                  </div>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 5 }}>{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
