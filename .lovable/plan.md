# Job Portal Management System — Full Build Plan

Turn the current 6-page demo into the real system described in your report: a database-backed job portal with three roles (Job Seeker, Recruiter, Admin), working logins, resume uploads, applications with status tracking, and an admin panel. The existing design, branding, and pages are kept and upgraded — not redesigned.

## 1. Backend foundation (Lovable Cloud)

- Enable Lovable Cloud: database, authentication, and file storage with zero external accounts.
- Email/password sign-in enabled (currently off on new projects); email confirmation stays on by default for account safety.

## 2. Database (normalised per the report's ER model)

Tables (all with row-level security, explicit grants, and indexes for fast search):

- `profiles` — full name, phone, location; seeker fields: qualifications, experience, skills, resume file
- `companies` — name, location, industry, description; linked to the recruiter who owns it
- `jobs` — title, description, skills, location, salary range, job type, status (open/closed), timestamps; linked to company + recruiter
- `applications` — job + seeker, resume file, cover note, status (Applied / Reviewed / Shortlisted / Rejected), apply date
- `user_roles` — separate table (never on the profile) storing admin / recruiter / seeker, checked through a secure database function

Security rules:

- Seekers see and edit only their own profile; recruiters manage only their company's jobs and applicants; job listings are publicly readable (open jobs only); resumes stay in a private storage bucket — readable only by the owner, the job's recruiter, and admins.
- Recruiters update application statuses; seekers see their own applications with live status.

## 3. Authentication and accounts

- Register with a role choice (Job Seeker / Recruiter); real hashed-password login.
- Recruiter signup also collects company details; a database trigger creates each profile automatically at signup.
- Forgot-password flow with a `/reset-password` page.
- Header switches from "Sign In" to the signed-in state (avatar menu, Dashboard, Sign out) as soon as you log in.
- Admin: after the first preview you create your own account; I then flag it as admin in the database (as you chose).

## 4. Pages

Public (crawlable):

- `/` — landing page kept, with live counts (open jobs, companies, applications)
- `/jobs` — real listings from the database with search + filters (keyword, location, salary range, skills) and pagination, per the report's performance requirement
- `/jobs/$id` — job detail with an Apply button (shows "Sign in to apply" when logged out)
- `/login`, `/register` — working forms (register supports `?role=recruiter` so the existing "Create an employer account" link works)

Signed-in only:

- `/dashboard` — role-aware: seekers see their applications and status timeline; recruiters see their job posts with applicant counts
- `/profile` — edit profile; seekers upload a resume (PDF/DOC, private)
- `/post-job` — recruiters post, edit, and close jobs
- `/jobs/$id/applicants` — recruiters review applicants and set statuses (Applied → Reviewed → Shortlisted / Rejected)
- `/admin` — admin-only: manage users and job listings, view platform reports

## 5. Server functions

- All reads/writes go through typed server functions with schema validation; signed-in functions carry the session; admin functions re-verify the admin role server-side on every call.
- No demo logic left behind: the simulated login/posting toasts are replaced by real actions.

## 6. Sample data

- A database migration inserts sample companies, recruiters, and job listings (as you chose) so every page is populated on first look. All rows are insert statements in the migration — never seeded on page load.

## 7. Optimizations

- Database indexes + paginated queries for the under-2-seconds search target
- Code-split routes, memoised lists, and proper head metadata on every page
- Code formatting pass, updated README documenting setup, scripts, and features
- Automated tests for the rules that matter (role access, apply flow, status updates)
- Security scan of the database policies before finishing

## 8. Verification

- Build + typecheck + test suite pass
- End-to-end in the preview: register a seeker and a recruiter, post a job, apply with a resume, change a status, and check the admin panel — with screenshots at each step

## Technical notes

- Auth-gated pages live under a pathless protected layout; public pages stay server-rendered and shareable.
- Resume uploads use the platform's storage with policies on the bucket objects themselves.
- Roles are enforced in the database (row-level security), not just in the UI, so a tampered browser cannot read other users' data.
