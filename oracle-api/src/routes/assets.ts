import { Router, Response } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();
router.use(requireAuth);

const include = {
  category: { select: { id: true, name: true } },
  site: { select: { id: true, name: true } },
  assignments: {
    where: { status: "active" as const },
    include: { employee: { select: { id: true, name: true, employeeId: true } } },
  },
  movementLogs: {
    orderBy: { createdAt: "desc" as const },
    include: { employee: { select: { id: true, name: true } } },
  },
};

// GET /api/assets
router.get("/", async (_req: AuthRequest, res: Response) => {
  const assets = await prisma.asset.findMany({
    include,
    orderBy: { createdAt: "desc" },
  });
  res.json(assets);
});

// GET /api/assets/:id
router.get("/:id", async (req: AuthRequest, res: Response) => {
  const asset = await prisma.asset.findUnique({
    where: { id: req.params.id },
    include,
  });
  if (!asset) { res.status(404).json({ error: "Asset not found" }); return; }
  res.json(asset);
});

// POST /api/assets
router.post("/", async (req: AuthRequest, res: Response) => {
  const { name, serialNumber, categoryId, siteId, condition, ownership, description } = req.body;
  if (!name) { res.status(400).json({ error: "Asset name is required." }); return; }

  const asset = await prisma.asset.create({
    data: {
      name,
      serialNumber: serialNumber || null,
      categoryId: categoryId || null,
      siteId: siteId || null,
      condition: condition ?? "usable",
      ownership: ownership ?? "company",
      description: description || null,
    },
    include,
  });
  res.status(201).json(asset);
});

// PUT /api/assets/:id
router.put("/:id", async (req: AuthRequest, res: Response) => {
  const { name, serialNumber, categoryId, siteId, condition, ownership, description } = req.body;
  if (!name) { res.status(400).json({ error: "Asset name is required." }); return; }

  const existing = await prisma.asset.findUnique({ where: { id: req.params.id } });
  if (!existing) { res.status(404).json({ error: "Asset not found" }); return; }

  const asset = await prisma.asset.update({
    where: { id: req.params.id },
    data: {
      name,
      serialNumber: serialNumber || null,
      categoryId: categoryId || null,
      siteId: siteId || null,
      condition: condition ?? existing.condition,
      ownership: ownership ?? existing.ownership,
      description: description || null,
    },
    include,
  });
  res.json(asset);
});

// DELETE /api/assets/:id
router.delete("/:id", async (req: AuthRequest, res: Response) => {
  const existing = await prisma.asset.findUnique({ where: { id: req.params.id } });
  if (!existing) { res.status(404).json({ error: "Asset not found" }); return; }
  await prisma.asset.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export default router;
