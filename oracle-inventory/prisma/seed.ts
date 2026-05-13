import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"]! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ─── System User (Sir Jay) ─────────────────────────────────────────────────
  const hash = await bcrypt.hash("Jay@Oracle2026", 10);
  await prisma.systemUser.upsert({
    where: { email: "jay@oracle.com" },
    update: {},
    create: {
      name: "Sir Jay",
      email: "jay@oracle.com",
      password: hash,
    },
  });
  console.log("✓ SystemUser: Sir Jay");

  // ─── Sites ─────────────────────────────────────────────────────────────────
  const manila = await prisma.site.upsert({
    where: { id: "site-manila" },
    update: {},
    create: { id: "site-manila", name: "Manila HQ", address: "Makati, Metro Manila" },
  });
  const cebu = await prisma.site.upsert({
    where: { id: "site-cebu" },
    update: {},
    create: { id: "site-cebu", name: "Cebu Office", address: "IT Park, Cebu City" },
  });
  const davao = await prisma.site.upsert({
    where: { id: "site-davao" },
    update: {},
    create: { id: "site-davao", name: "Davao Hub", address: "Lanang, Davao City" },
  });
  console.log("✓ Sites: Manila HQ, Cebu Office, Davao Hub");

  // ─── Departments ───────────────────────────────────────────────────────────
  const deptIT = await prisma.department.upsert({
    where: { id: "dept-it" },
    update: {},
    create: { id: "dept-it", name: "IT", siteId: manila.id },
  });
  const deptFinance = await prisma.department.upsert({
    where: { id: "dept-finance" },
    update: {},
    create: { id: "dept-finance", name: "Finance", siteId: manila.id },
  });
  const deptOps = await prisma.department.upsert({
    where: { id: "dept-ops" },
    update: {},
    create: { id: "dept-ops", name: "Operations", siteId: cebu.id },
  });
  console.log("✓ Departments: IT, Finance, Operations");

  // ─── Categories ────────────────────────────────────────────────────────────
  const catLaptop = await prisma.category.upsert({
    where: { id: "cat-laptop" },
    update: {},
    create: { id: "cat-laptop", name: "Laptop" },
  });
  const catMonitor = await prisma.category.upsert({
    where: { id: "cat-monitor" },
    update: {},
    create: { id: "cat-monitor", name: "Monitor" },
  });
  const catPeripherals = await prisma.category.upsert({
    where: { id: "cat-peripherals" },
    update: {},
    create: { id: "cat-peripherals", name: "Peripherals" },
  });
  console.log("✓ Categories: Laptop, Monitor, Peripherals");

  // ─── Employees ─────────────────────────────────────────────────────────────
  const emp1 = await prisma.employee.upsert({
    where: { employeeId: "EMP-001" },
    update: {},
    create: {
      employeeId: "EMP-001",
      name: "Maria Santos",
      email: "m.santos@oracle.com",
      siteId: manila.id,
      departmentId: deptIT.id,
    },
  });
  const emp2 = await prisma.employee.upsert({
    where: { employeeId: "EMP-002" },
    update: {},
    create: {
      employeeId: "EMP-002",
      name: "Jose Reyes",
      email: "j.reyes@oracle.com",
      siteId: manila.id,
      departmentId: deptFinance.id,
    },
  });
  const emp3 = await prisma.employee.upsert({
    where: { employeeId: "EMP-003" },
    update: {},
    create: {
      employeeId: "EMP-003",
      name: "Ana Cruz",
      email: "a.cruz@oracle.com",
      siteId: cebu.id,
      departmentId: deptOps.id,
    },
  });
  const emp4 = await prisma.employee.upsert({
    where: { employeeId: "EMP-004" },
    update: {},
    create: {
      employeeId: "EMP-004",
      name: "Carlo Bautista",
      email: "c.bautista@oracle.com",
      siteId: davao.id,
    },
  });
  const emp5 = await prisma.employee.upsert({
    where: { employeeId: "EMP-005" },
    update: {},
    create: {
      employeeId: "EMP-005",
      name: "Lisa Flores",
      email: "l.flores@oracle.com",
      siteId: manila.id,
      departmentId: deptIT.id,
    },
  });
  console.log("✓ Employees: 5 records");

  // ─── Assets ────────────────────────────────────────────────────────────────
  const asset1 = await prisma.asset.upsert({
    where: { serialNumber: "SN-LP-001" },
    update: {},
    create: {
      name: "Dell Latitude 5530",
      serialNumber: "SN-LP-001",
      categoryId: catLaptop.id,
      siteId: manila.id,
      condition: "usable",
      ownership: "company",
    },
  });
  const asset2 = await prisma.asset.upsert({
    where: { serialNumber: "SN-LP-002" },
    update: {},
    create: {
      name: "MacBook Pro 14\"",
      serialNumber: "SN-LP-002",
      categoryId: catLaptop.id,
      siteId: manila.id,
      condition: "usable",
      ownership: "company",
    },
  });
  const asset3 = await prisma.asset.upsert({
    where: { serialNumber: "SN-MON-001" },
    update: {},
    create: {
      name: "LG 27\" 4K Monitor",
      serialNumber: "SN-MON-001",
      categoryId: catMonitor.id,
      siteId: cebu.id,
      condition: "usable",
      ownership: "company",
    },
  });
  const asset4 = await prisma.asset.upsert({
    where: { serialNumber: "SN-LP-003" },
    update: {},
    create: {
      name: "Lenovo ThinkPad X1",
      serialNumber: "SN-LP-003",
      categoryId: catLaptop.id,
      siteId: davao.id,
      condition: "for_repair",
      ownership: "company",
      description: "Keyboard issue — sent to service center",
    },
  });
  const asset5 = await prisma.asset.upsert({
    where: { serialNumber: "SN-PER-001" },
    update: {},
    create: {
      name: "Logitech MX Keys Combo",
      serialNumber: "SN-PER-001",
      categoryId: catPeripherals.id,
      siteId: manila.id,
      condition: "usable",
      ownership: "company",
    },
  });
  console.log("✓ Assets: 5 records");

  // ─── Assignments ───────────────────────────────────────────────────────────
  await prisma.assetAssignment.createMany({
    skipDuplicates: true,
    data: [
      { assetId: asset1.id, employeeId: emp1.id, status: "active", notes: "Primary workstation" },
      { assetId: asset2.id, employeeId: emp5.id, status: "active", notes: "Dev machine" },
      { assetId: asset3.id, employeeId: emp3.id, status: "active" },
    ],
  });
  console.log("✓ Assignments: 3 active");

  // ─── Movement Logs ─────────────────────────────────────────────────────────
  await prisma.movementLog.createMany({
    data: [
      { assetId: asset1.id, employeeId: emp1.id, type: "assignment", notes: "Initial assignment" },
      { assetId: asset2.id, employeeId: emp5.id, type: "assignment", notes: "Initial assignment" },
      { assetId: asset3.id, employeeId: emp3.id, type: "assignment", notes: "Initial assignment" },
      { assetId: asset4.id, type: "repair_send", notes: "Sent to service center for keyboard repair" },
    ],
  });
  console.log("✓ Movement logs: 4 entries");

  console.log("\nSeed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
