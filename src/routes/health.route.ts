import { Router, Request, Response } from "express";
import os from "os";

const router = Router();

// Health check endpoint
router.get("/", (_req: Request, res: Response) => {
  const healthCheck = {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env["NODE_ENV"] || "development",
    version: process.env["npm_package_version"] || "1.0.0",
    memory: {
      used:
        Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100,
      total:
        Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100,
    },
    system: {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      cpuUsage: process.cpuUsage(),
    },
  };

  res.status(200).json(healthCheck);
});

// Detailed health check
router.get("/detailed", (_req: Request, res: Response) => {
  const detailedHealth = {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env["NODE_ENV"] || "development",
    version: process.env["npm_package_version"] || "1.0.0",
    memory: process.memoryUsage(),
    system: {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      cpuUsage: process.cpuUsage(),
      loadAverage: os.loadavg(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
    },
    process: {
      pid: process.pid,
      title: process.title,
      argv: process.argv,
    },
  };

  res.status(200).json(detailedHealth);
});

export { router as healthRouter };
