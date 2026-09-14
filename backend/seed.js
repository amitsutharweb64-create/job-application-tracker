import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import Application from "./src/models/application.model.js";

dotenv.config({ path: new URL("./src/.env", import.meta.url) });

const SEED_PREFIX = "[SEED:job-tracker-v1:";
const SEED_TOTAL = 100;

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Infosys",
  "TCS",
  "Wipro",
  "Accenture",
  "IBM",
  "Adobe",
  "Meta",
  "Flipkart",
  "Razorpay",
  "Swiggy",
  "Zomato",
  "Paytm",
  "PhonePe",
  "Cognizant",
  "Capgemini",
  "Deloitte",
  "Oracle",
  "Salesforce",
  "Zoho",
  "Freshworks",
  "Meesho",
  "Ola",
  "Uber",
  "Netflix",
  "LinkedIn",
  "NVIDIA",
  "SAP",
];

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "MERN Stack Developer",
  "React Developer",
  "Node.js Developer",
  "Full Stack Developer",
  "Software Engineer",
];

const statuses = ["Applied", "Interview", "Selected", "Rejected"];

const noteTemplates = [
  "Applied through LinkedIn. Resume tailored for the role.",
  "Applied from company careers page. Waiting for recruiter response.",
  "Referral requested before applying. Follow-up planned next week.",
  "Initial screening expected. Prepared project notes and resume points.",
  "Good match for MERN and JavaScript experience.",
  "Added portfolio and GitHub links in application.",
  "Role matches frontend and API integration experience.",
  "Follow-up email scheduled after one week.",
  "Application submitted with updated resume.",
  "Saved job description for interview preparation.",
];

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function pick(list, random) {
  return list[Math.floor(random() * list.length)];
}

function randomAppliedDate(random) {
  const today = new Date();
  const daysBack = Math.floor(random() * 180);
  const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  date.setUTCDate(date.getUTCDate() - daysBack);
  return date;
}

function createSeedApplications() {
  const random = seededRandom(20260905);

  return Array.from({ length: SEED_TOTAL }, (_, index) => {
    const seedNumber = String(index + 1).padStart(3, "0");
    const company = companies[index % companies.length];
    const role = roles[(index + Math.floor(random() * roles.length)) % roles.length];
    const status = pick(statuses, random);
    const appliedDate = randomAppliedDate(random);
    const note = pick(noteTemplates, random);

    return {
      company,
      role,
      status,
      appliedDate,
      notes: `${SEED_PREFIX}${seedNumber}] ${note}`,
    };
  });
}

async function seedApplications() {
  try {
    await connectDB();

    const seedApplications = createSeedApplications();
    const seedNotes = seedApplications.map((application) => application.notes);

    const existingSeedApplications = await Application.find({
      notes: { $in: seedNotes },
    }).select("notes");

    const existingNotes = new Set(
      existingSeedApplications.map((application) => application.notes)
    );

    const applicationsToInsert = seedApplications.filter(
      (application) => !existingNotes.has(application.notes)
    );

    if (applicationsToInsert.length === 0) {
      console.log(`Seed complete. 0 new applications inserted. ${SEED_TOTAL} seed applications already exist.`);
      return;
    }

    const insertedApplications = await Application.insertMany(applicationsToInsert, {
      ordered: false,
    });

    console.log(
      `Seed complete. ${insertedApplications.length} applications inserted successfully.`
    );
    console.log(
      `${existingNotes.size} seed applications already existed and were skipped.`
    );
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedApplications();
