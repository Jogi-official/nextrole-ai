import { Router } from "express";

const router = Router();

// GET /api/jobs
router.get("/", (req, res) => {
  // TODO: read jobs from MySQL and apply filters from req.query
  res.json([]);
});

// GET /api/jobs/:id
router.get("/:id", (req, res) => {
  // TODO: read a single job from MySQL
  res.status(404).json({ error: "Job not found" });
});

export default router;
