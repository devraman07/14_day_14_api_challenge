import { desc, lt, eq, and } from "drizzle-orm";
import { db } from "../configs/db.js";
import { jobs } from "../configs/schemas/jobs.js";

export const addJobs = async (req, res) => {
  const { title, company, location, salary, jobType } = req.body;

  try {
    const job = await db
      .insert(jobs)
      .values({
        title: title,
        company: company,
        location: location,
        jobType: jobType,
        salary: salary,
        creatorId: req.user.id,
      })
      .returning();

    return res.status(201).json({
      message: "jobs added successfully",
      data: job,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error while adding blogs",
      error: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.json({
      message: "enter job id",
    });
  }
  try {
    const { title, company, location, salary, jobType } = req.body;

    const currentjob = await db.select().from(jobs).where(eq(jobs.id, id));

    if (currentjob.length === 0) {
      return res.status(404).json({
        message: "job not found",
      });
    }

    const job = currentjob[0];

    if (job.authorId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        message: "not allowed to update this blog",
      });
    }

    const updatedjob = await db
      .update(jobs)
      .set({
        title,
        company,
        location,
        salary,
        jobType,
        updatedAt: new Date(),
      })
      .where(eq(jobs.id, id))
      .returning();

    return res.status(201).json({
      message: "job updated successfully",
      data: updatedjob,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error while updating Blog",
      error: error.message,
    });
  }
};

export const deletejob = async (req, res) => {
  const id = req.params.id;

  try {
    const job = await db.select().from(jobs).where(eq(jobs.id, id));

    const existingjob = job[0];

    if (existingjob.authorId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        message: "not allowed to delete this job",
      });
    }

    await db.delete(jobs).where(eq(jobs.id, id));

    return res.status(200).json({
      message: "job deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting job",
      error: error.message,
    });
  }
};

export const getpostedJobs = async (req, res) => {
  const userId = req.user.id;

  try {
    const myjobs = await db
      .select()
      .from(jobs)
      .where(eq(jobs.creatorId, userId));

    return res.status(200).json({
      message: "admin posted jobs fetched successfully",
      data: myjobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching admin posted jobs",
      error: error.message,
    });
  }
};

export const alljobs = async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 5, 20);
  const cursor = req.query.cursor;

  const location = req.query.location;
  const jobType = req.query.jobType;
  const sort = req.query.sort;

  try {
    let query = db.select().from(jobs);

    const conditions = [];

    // filtering
    if (location) {
      conditions.push(eq(jobs.location, location));
    }

    if (jobType) {
      conditions.push(eq(jobs.jobType, jobType));
    }

    // cursor pagination
    if (cursor) {
      conditions.push(lt(jobs.id, Number(cursor)));
    }

    // apply filters
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // sorting
    if (sort === "salary") {
      query = query.orderBy(desc(jobs.salary));
    } else {
      query = query.orderBy(desc(jobs.id));
    }

    // limit
    query = query.limit(limit);

    const result = await query;

    const nextCursor =
      result.length > 0 ? result[result.length - 1].id : null;

    const hasMore = result.length === limit;

    return res.status(200).json({
      message: "Jobs fetched successfully",
      data: result,
      limit,
      nextCursor,
      hasMore
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching jobs",
      error: error.message
    });
  }
};
