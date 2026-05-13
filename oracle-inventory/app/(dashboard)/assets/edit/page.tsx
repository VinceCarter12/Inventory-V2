"use client";

import TopBar from "@/components/TopBar";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/auth";

type Lookup = {
  categories: { id: string; name: string }[];
  sites: { id: string; name: string }[];
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  height: 42,
  background: "#252829",
  border: "1px solid rgba(255,255,255,.07)",
  borderRadius: 10,
  padding: "0 14px",
  color: "#fff",
  fontSize: 13,
  outline: "none",
  fontFamily: "inherit",
  cursor: "pointer",
};

function EditAssetContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const router = useRouter();
  const [lookup, setLookup] = useState<Lookup>({ categories: [], sites: [] });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    serialNumber: "",
    categoryId: "",
    siteId: "",
    condition: "usable",
    ownership: "company",
    description: "",
  });

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    Promise.all([
      apiFetch(`/api/assets/${id}`).then((r) => r.json()),
      apiFetch("/api/lookup").then((r) => r.json()),
    ]).then(([asset, lk]) => {
      setForm({
        name: asset.name ?? "",
        serialNumber: asset.serialNumber ?? "",
        categoryId: asset.category?.id ?? "",
        siteId: asset.site?.id ?? "",
        condition: asset.condition ?? "usable",
        ownership: asset.ownership ?? "company",
        description: asset.description ?? "",
      });
      setLookup(lk);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const res = await apiFetch(`/api/assets/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error ?? "Failed to save.");
      return;
    }

    toast.success("Asset updated successfully.");
    router.push(`/assets/detail?id=${id}`);
  }

  if (loading) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg)", borderRadius: 16 }}>
        <div style={{ height: 60 }} />
        <div style={{ padding: "0 24px 24px" }}>
          <Card style={{ maxWidth: 680 }}>
            <CardContent style={{ padding: 24 }}>
              <Skeleton className="h-5 w-32 mb-5" />
              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={i === 0 || i === 5 ? "col-span-2" : ""}>
                    <Skeleton className="h-3 w-24 mb-2" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg)", borderRadius: 16 }}>
      <TopBar title="Edit Asset" />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>
        <form onSubmit={handleSubmit}>
          <Card style={{ maxWidth: 680, border: "1px solid rgba(255,255,255,0.07)" }}>
            <CardContent style={{ padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Asset Details</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                <div style={{ gridColumn: "span 2" }}>
                  <Label className="field-label">Asset Name *</Label>
                  <Input
                    className="field-input mt-1.5"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label className="field-label">Serial Number</Label>
                  <Input
                    className="field-input mt-1.5"
                    value={form.serialNumber}
                    onChange={(e) => set("serialNumber", e.target.value)}
                  />
                </div>

                <div>
                  <Label className="field-label">Category</Label>
                  <select style={selectStyle} className="mt-1.5" value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}>
                    <option value="">— Select category —</option>
                    {lookup.categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <Label className="field-label">Site</Label>
                  <select style={selectStyle} className="mt-1.5" value={form.siteId} onChange={(e) => set("siteId", e.target.value)}>
                    <option value="">— Select site —</option>
                    {lookup.sites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>

                <div>
                  <Label className="field-label">Condition</Label>
                  <select style={selectStyle} className="mt-1.5" value={form.condition} onChange={(e) => set("condition", e.target.value)}>
                    <option value="usable">Usable</option>
                    <option value="for_repair">For Repair</option>
                    <option value="for_disposal">For Disposal</option>
                  </select>
                </div>

                <div>
                  <Label className="field-label">Ownership</Label>
                  <select style={selectStyle} className="mt-1.5" value={form.ownership} onChange={(e) => set("ownership", e.target.value)}>
                    <option value="company">Company</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <Label className="field-label">Description</Label>
                  <Textarea
                    className="field-input mt-1.5"
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={3}
                    style={{ height: "auto", padding: "10px 14px", resize: "vertical" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full h-[34px] px-4 text-xs font-bold border border-white/7 text-muted-foreground hover:text-white"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-full h-[34px] px-4 text-xs font-bold"
                  style={{ background: "var(--lime)", color: "#0F1112" }}
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default function EditAssetPage() {
  return (
    <Suspense fallback={
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg)", borderRadius: 16 }}>
        <div style={{ height: 60 }} />
      </div>
    }>
      <EditAssetContent />
    </Suspense>
  );
}
