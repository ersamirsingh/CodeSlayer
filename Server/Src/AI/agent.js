import { ChatGroq } from "@langchain/groq";
import { createToolCallingAgent, AgentExecutor } from "langchain/agents";
import { z } from "zod";
import { tool } from "langchain/tools";

// Import your models

// import Job from "../Models/Job.js";
import User from "../Models/User.js";
import Job from "../Models/Job.js";

// Llm

const llm = new ChatGroq({
  model: groq / compound,
  temperature: 0.4,
});

const findJobsTool = tool(
  async ({ userId }) => {
    const user = await User.findById(userId);
    if (!user) return "User not Found";

    const jobs = await Job.find({ status: "open" }).limit(10);

    return JSON.stringify(jobs);
  },
  {
    name: "find_jobs",
    description: "Find open jobs nearby for a user",
    Schema: z.object({
      userId: z.string(),
    }),
  }
);

const updateProfileTool = tool(
  async ({ userId, field, value }) => {
    await User.findByIdAndUpdate(userId, { [field]: value });
    return `Updated ${field} successfully.`;
  },
  {
    name: "update_profile",
    description: "Update a user's profile field",
    schema: z.object({
      userId: z.string(),
      field: z.string(),
      value: z.string(),
    }),
  }
);

const applyJobTool = tool(
  async ({ jobId, userId }) => {
    const job = await Job.findById(jobId);
    if (!job) return "Job not found";

    job.applicants.push(userId);
    await job.save();

    return "Successfully applied for the job.";
  },
  {
    name: "apply_job",
    description: "Apply to a specific job",
    schema: z.object({
      jobId: z.string(),
      userId: z.string(),
    }),
  }
);

const tools = [findJobsTool, updateProfileTool, applyJobTool];

export const agent = await createToolCallingAgent({
  llm,
  tools,
});

export const agentExecutor = new AgentExecutor({
  agent,
  tools,
});
