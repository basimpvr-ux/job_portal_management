# Roadmap — Job Portal build (per approved plan)

## Backend
- [ ] Enable Lovable Cloud (done via tool)
- [ ] Enable email/password auth
- [ ] Migration: tables (profiles, companies, jobs, applications, user_roles) + RLS + grants + indexes + has_role fn + trigger
- [ ] Storage bucket `resumes` (private) + object policies
- [ ] Sample data migration (companies, recruiters, jobs, demo seeker)

## Auth
- [ ] Register (role choice: seeker/recruiter + company fields), login, forgot password
- [ ] /reset-password page
- [ ] Root onAuthStateChange + header session state + sign-out hygiene

## Routes
- [ ] /jobs — DB listings, filters (keyword, location, salary, skills), pagination
- [ ] /jobs/$id — detail + apply
- [ ] /jobs/$id/applicants — recruiter applicant management + statuses
- [ ] /dashboard — role-aware seeker/recruiter
- [ ] /profile — profile edit + resume upload
- [ ] /post-job — real posting/edit/close
- [ ] /admin — users, jobs, reports (admin-only)
- [ ] Landing live counts; wire /employer/register link to register?role=recruiter

## Polish
- [ ] Server fns with zod validation; admin role re-verify
- [ ] Tests (role access, apply flow, status updates)
- [ ] Prettier pass, README overhaul, head metadata
- [ ] Security scan
- [ ] E2E verification in preview
- [ ] Flag user's account as admin (needs their signup email — ask after preview)
