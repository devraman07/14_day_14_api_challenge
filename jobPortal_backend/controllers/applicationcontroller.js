import { and, eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { jobs } from "../configs/schemas/jobs.js";
import { applications } from "../configs/schemas/applications.js";

export const applicationHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.id;

    const existingJob = await db.select().from(jobs).where(eq(jobs.id, jobId));

    if (existingJob.length === 0) {
      return res.json({
        message: "job not found",
      });
    }

    const existingApplication = await db
      .select()
      .from(applications)
      .where(
        and(eq(applications.userId, userId), eq(applications.jobId, jobId)),
      );

    if (existingApplication.length > 0) {
      return res.status(400).json({
        message: "already applied",
      });
    }

    const applied = await db
      .insert(applications)
      .values({
        jobId : jobId,
        userId : userId
      })
      .returning();

    return res.status(201).json({
      message: "applied to job successfully",
      data: applied,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while job application",
      error: error.message,
    });
  }
};

export const getownApplications = async (req , res) => {
    try {
        const userId = req.user.id;

        const myapplications = await db.select().from(applications).where(eq(applications.userId, userId));

        if(myapplications.length === 0){
            return res.json({
                message : "frist apply to a job",
            })
        }
        return res.status(200).json({
            message : "found your applications",
            data : myapplications
        })
    } catch (error) {
         return res.status(500).json({
      message: "Error while fetching own job application ",
      error: error.message,
    });
    }
}
