# Bilingual School Management System — Technical Documentation
### Tech Stack | Scalability | Cost Breakdown | Feature Specification | Open Items for Decision

**Prepared for:** Client Review & Approval
**Stage:** Pre-Development Planning
**Date:** July 2026

---

## 1. Executive Summary

This document is meant to be shown to the decision-maker **before** any code is written. It answers four questions he will ask:

1. **What are we building it with, and why?**
2. **Will it still work when the school grows — more students, more branches, more users?**
3. **What will it cost — to build, and to run every month/year?**
4. **What decisions still need to be made before we start building?**

Once this is approved, we move to wireframes → demo → actual build.

---

## 2. Technology Stack

| Layer | Technology | Why This Choice |
|---|---|---|
| **Frontend** | React + Vite + TypeScript + Tailwind CSS | Fast dev experience, huge ecosystem, easy to find developers later, TypeScript catches bugs before production |
| **Backend** | Node.js + Express + TypeScript | Same language (JS/TS) across frontend & backend = one team can maintain both, huge community support |
| **Database** | PostgreSQL | Handles complex relationships (students↔classes↔sections↔subjects) reliably, strong data integrity, free & open-source, scales to millions of rows |
| **Authentication** | JWT + Refresh Tokens + bcrypt | Industry standard, stateless (scales horizontally), passwords never stored in plain text |
| **Authorization** | RBAC (Role-Based Access Control) | Fine-grained control — admin, teacher, student, parent, accountant all see only what they should |
| **File/Document Storage** | Cloud object storage (S3-compatible: AWS S3 / Cloudflare R2) | Certificates, ID cards, uploaded documents stored securely, not on the server disk |
| **i18n (Bilingual Engine)** | i18next / react-i18next | Battle-tested library for English↔Hindi switching across the entire app, including CMS content |
| **Caching (future)** | Redis | Speeds up dashboards, session management, rate-limiting for brute-force protection |
| **Hosting (App)** | VPS / Cloud (AWS Mumbai region, DigitalOcean, or Railway/Render for a lighter start) | Mumbai/India region = low latency for Indian users |
| **Hosting (Frontend)** | Vercel / Cloudflare Pages / Nginx on same VPS | Fast global delivery, free tier available for demo stage |
| **CI/CD** | GitHub Actions | Automated testing & deployment, reduces human error |
| **Monitoring & Logs** | Sentry (errors) + basic server logs → audit log table in DB | Required for the audit-log requirement you specified |
| **Backups** | Automated daily PostgreSQL dumps → cloud storage | Meets your automated-backup requirement |
| **SMS/Email (notifications)** | MSG91 / Twilio (SMS), SendGrid / Amazon SES (email) | For fee reminders, attendance alerts, result notifications |
| **Payment Gateway (fees)** | Razorpay (best UPI/India support) | For online fee payment module |

**Why not a no-code/low-code platform or WordPress?** A school ERP needs custom relational logic (attendance ↔ fees ↔ results ↔ RBAC), fine-grained security, and bilingual CMS — this needs a real custom-coded backend, not a plugin-based system. It costs more upfront but avoids being boxed in later.

---

## 3. Scalability Analysis

**Short answer: Yes, this stack is scalable — but scalability isn't just "the tech," it's how the system is designed from day one.** Here's the honest breakdown:

### 3.1 What scales well by default
- **Node.js + Express** — handles thousands of concurrent requests per server; horizontally scalable (just add more app servers behind a load balancer)
- **PostgreSQL** — can comfortably handle a single school (hundreds to a few thousand students) on modest hardware; scales to tens of thousands of students with proper indexing
- **JWT auth** — stateless, so it doesn't create a bottleneck as user count grows
- **Cloud file storage (S3-type)** — practically unlimited storage, doesn't touch your server capacity

### 3.2 What needs to be *designed* for scale now, even if not used immediately
| Concern | Recommendation |
|---|---|
| **Multiple schools/branches in future** (multi-tenancy) | Design the database with a `school_id` / `tenant_id` on every table **now**, even for a single school. Retrofitting multi-tenancy later is expensive; adding the column now costs nothing. |
| **Traffic spikes** (e.g., admission season, result day) | Use caching (Redis) for read-heavy pages (notices, results lookup) and a CDN for the public website |
| **Growing data volume** (years of attendance/fee records) | Partition large tables (e.g., attendance by academic year) and archive old data periodically |
| **More concurrent users** | Stateless backend + load balancer means we can add more app servers without redesigning anything |
| **Reporting/analytics load** | Keep heavy reports (e.g., yearly analytics) on a read-replica database later, so they don't slow down the live app |

### 3.3 Growth path (realistic, staged)
1. **Phase 1 (Year 1):** Single VPS, single PostgreSQL instance — handles one school comfortably (up to ~5,000 students)
2. **Phase 2 (if multiple branches/schools):** Add `tenant_id` filtering (already in schema), separate app server, connection pooling (PgBouncer)
3. **Phase 3 (large scale, 10,000+ users concurrent):** Load balancer + multiple app servers, Redis caching layer, read replica for reports, CDN for static/public site

**Bottom line for the client:** *"Yes, it's built to grow — from one school today to a multi-branch system later — without rebuilding it from scratch, as long as we plan the database correctly at the start (which we are doing)."*

---

## 4. Cost Breakdown

Costs are split into **one-time development** and **recurring/running costs**. Figures are indicative (India-focused), for planning-level approval — not a final quote.

### 4.1 One-Time Development Cost (indicative, by phase)

| Phase | Scope | Estimated Effort |
|---|---|---|
| Planning (current phase) | SRS, schema, wireframes, roadmap | 2–3 weeks |
| Demo/Design approval (current step) | Look-and-feel demo, all 4 modules | 3–5 days |
| Public Website + CMS | Home, About, Notices, Admissions, bilingual content | 2–3 weeks |
| Student Portal | Dashboard, attendance view, results, fee status, documents | 2–3 weeks |
| Teacher Portal | Attendance marking, result entry, class management | 2–3 weeks |
| Admin Panel | User/role management, fee management, reports, audit logs | 3–4 weeks |
| Security hardening | 2FA, encryption, rate-limiting, pen-testing | 1–2 weeks |
| Testing + Bug fixing | QA across all modules | 1–2 weeks |
| **Total build time** | | **~14–20 weeks** (~3.5–5 months) for a full first version |

*(Actual cost in ₹/$ depends on whether this is built in-house, freelance, or agency — happy to help you build a cost sheet once team structure is decided.)*

### 4.2 Recurring / Running Costs (Monthly, indicative — India-hosted)

| Item | Approx. Monthly Cost (₹) | Notes |
|---|---|---|
| VPS/Cloud server (app + DB) | ₹1,500 – ₹6,000 | Depends on student count; can start small |
| Database backups storage | ₹200 – ₹500 | Cloud storage for automated backups |
| Domain name | ~₹100/month (₹1,000–1,500/year) | .com or .in |
| SSL Certificate | ₹0 | Free via Let's Encrypt |
| File storage (documents, images) | ₹300 – ₹1,000 | Scales with usage |
| SMS notifications | ₹0.15 – ₹0.25 per SMS | Pay-as-you-go, budget based on volume |
| Email service | ₹0 – ₹1,000 | Free tiers available at low volume |
| Payment gateway (Razorpay) | ~2% per transaction | Only on fee payments processed |
| Monitoring/Error tracking | ₹0 – ₹1,500 | Free tier sufficient initially |
| **Estimated total (small-mid school)** | **₹2,500 – ₹10,000/month** | Excludes SMS/payment transaction fees |

### 4.3 Ongoing Maintenance (post-launch)
- Bug fixes, minor updates, security patches — typically budgeted as a monthly/annual retainer or on-demand
- Annual dependency/security updates recommended (Node.js, libraries, PostgreSQL version)

---

## 5. Feature Details by Module

### 5.1 Public Website (CMS)
- Home page, About, bilingual toggle (English/Hindi)
- Notices/Circulars board (bilingual content entry)
- Admissions info & online enquiry form
- Photo gallery, events, achievements
- Contact page with location map
- SEO-friendly structure

### 5.2 Student Portal
- Login (student ID + password, later 2FA optional)
- Attendance record view
- Results/report card view
- Fee status & online payment
- Document download (ID card, certificates)
- Notices relevant to their class

### 5.3 Teacher Portal
- Login with role-based access
- Mark daily attendance (class/section-wise)
- Enter/update exam results
- View assigned classes & subjects
- Communicate notices to students/parents

### 5.4 Admin Panel
- User & role management (RBAC)
- Student/Teacher onboarding & records
- Class, Section, Subject management
- Fee structure management & collection reports
- Audit log viewer (who did what, when)
- 2FA enforcement for privileged roles
- Backup status monitoring
- Bilingual content management for the public site

### 5.5 Security Features (cross-cutting, applies to all modules)
- HTTPS/TLS everywhere
- Parameterized queries (SQL injection protection)
- XSS & CSRF protection
- Brute-force login protection (rate limiting, account lockout)
- Encryption at rest for sensitive fields (Aadhaar, bank details, salary)
- 2FA for admin/accountant roles
- Automated daily backups
- Full audit trail of sensitive actions

---

## 6. Open Items for Decision (Before Actual Build Begins)

These don't block the look-and-feel demo, but they should be settled before real development starts — some affect the database design directly, others affect the business relationship.

### 6.1 Data Privacy & Legal Compliance ⚠️ *High Priority*
- The system stores Aadhaar numbers, bank details, and data belonging to minors — this falls under India's **DPDP Act 2023 (Digital Personal Data Protection Act)**.
- Needed: a documented data retention policy, a consent mechanism (parental consent for minors), and a process to delete/export a person's data on request.
- If the school reports to **UDISE+** or needs **RTE compliance**, this should be scoped now — it affects which fields the database must capture from day one.

### 6.2 Missing Role: Parent ⚠️ *High Priority*
- Current scope covers Student, Teacher, and Admin portals — there's no dedicated **Parent portal/login**.
- Most schools need parents to view attendance, fees, results, and notices.
- Decision needed: do parents get their own login, or do they access everything through the student's login/credentials?

### 6.3 Ownership & Handover Terms ⚠️ *High Priority*
- Who owns the source code and database once the system is built?
- Recommend a formal contract/Statement of Work (SOW) with milestones tied to payment, before build work starts.
- This is a business/legal item, not technical — but it protects both sides.

### 6.4 Testing, QA & Device Support
- Which devices/browsers must be supported? Many parents/teachers in India will use low-end Android phones and slower connections — this affects UI performance targets.
- Should there be a **UAT (User Acceptance Testing)** phase where the school's own staff test the system before go-live?

### 6.5 Training & Post-Launch Support
- Admins, teachers, and office staff will need training to use the system.
- Decide: is training in scope? What's the support arrangement after launch — bug fixes vs. new features vs. emergency/critical support, and under what terms?

### 6.6 Content & Data Migration
- Does the school already have student/staff records in Excel sheets, old software, or paper registers?
- If yes, migrating that existing data into the new system is real, separate work that needs its own plan — better to identify this now than discover it late.

### 6.7 Offline / Low-Connectivity Behavior
- Should attendance-marking (or other core actions) keep working if the internet drops mid-class?
- Many Indian schools have patchy connectivity — if offline support is needed, it changes the technical design of the teacher portal (offline-first behavior).

### 6.8 Exam Board–Specific Report Formats
- Result cards and academic reports often need to match board-specific formats (CBSE / ICSE / State Board).
- Confirming which board(s) the school follows now avoids rebuilding report templates later.

---

## 7. Bulk Excel Import / Export Feature

The client requested the ability to upload Excel sheets to bulk-add data into the system, and to extract/export data back out as Excel when needed (e.g., for reports or government submission). This is a standard, well-supported feature — not custom or exotic engineering.

### 7.1 What It Does

| Direction | Example Use Case | Who Uses It |
|---|---|---|
| **Import (Excel → System)** | Admin uploads a spreadsheet of new student admissions at the start of the year | Admin |
| Import | Teacher bulk-uploads marks for a whole class instead of entering one by one | Teacher |
| **Export (System → Excel)** | Admin downloads attendance/fee reports for a month as Excel | Admin/Accountant |
| Export | Generate a board/UDISE+-compliant data sheet for government submission | Admin |

### 7.2 Where It Connects in the Architecture

The feature lives entirely inside the backend already being built — it does not require any new server, service, or account. The flow has five stages, working in both directions:

1. **Admin/teacher browser** — uploads a `.xlsx` file (import) or clicks "export" (download)
2. **Backend API (Node.js + Express)** — same server handling attendance, fees, etc.; receives the file or the export request
3. **Excel engine (SheetJS or ExcelJS)** — a free, open-source npm library that converts `.xlsx → JSON` on import, and `JSON → .xlsx` on export
4. **Validation layer** — plain backend code checking required fields, correct formats, and duplicate entries (e.g., duplicate roll numbers) before anything touches the database
5. **PostgreSQL database** — final destination on import (via parameterized `INSERT`/`UPDATE` queries, same security model as the rest of the system), or source on export (`SELECT` query, converted back to Excel)

### 7.3 How the Data Is Actually Stored

Excel data is **not stored as JSON** — JSON is only a temporary stepping stone during processing:

1. Excel file is uploaded
2. SheetJS/ExcelJS reads it and converts each row into a JSON object **in memory** (e.g. `{ "name": "Ravi Kumar", "roll_no": "101", "class": "8", "section": "A" }`)
3. This JSON exists only for a few seconds during processing — it is never saved as a `.json` file
4. Validation runs on this JSON (correct fields? duplicate roll number? valid class?)
5. Each validated JSON object is mapped into a proper SQL `INSERT` and written into the correct PostgreSQL tables (e.g., the `students` table with real columns: `name`, `roll_no`, `class_id`, `section_id`)
6. The JSON is then discarded

**Why relational storage, not raw JSON:** this preserves referential integrity (a student's `class_id` must correctly link to a real class), enables fast queries ("show all students in Class 8 Section A"), and lets PostgreSQL enforce constraints (unique roll numbers, valid class references) at the database level — none of which raw JSON storage can guarantee.

*Exception:* PostgreSQL's JSON/JSONB column type may still be used for small, flexible fields (e.g., keeping a raw snapshot of the uploaded row for audit purposes) — but this is a minor addition, not how core student/teacher/fee data is stored.

**Simple analogy:** JSON here is like a delivery truck, not a warehouse. Excel data rides in the truck (JSON) just long enough to be sorted onto the correct shelves (PostgreSQL tables) — it isn't left sitting in the truck.

### 7.4 Resources Required

Nothing exotic — no new infrastructure, servers, or paid services:

| Resource | Purpose | Cost |
|---|---|---|
| SheetJS or ExcelJS (npm package) | Read/write Excel files | Free, open-source |
| Server memory/CPU during conversion | Parsing spreadsheet into JSON | Uses existing server — no separate machine |
| Temporary in-memory file handling | Holds file just long enough to process, then discards it | No extra storage cost |
| Existing PostgreSQL connection | Same database connection used everywhere else | No new infrastructure |
| Existing audit log table | Records who imported/exported what, when | Already planned |

### 7.5 Is This Tied to AWS?

**No.** This feature works identically on any hosting provider (AWS, DigitalOcean, Railway, etc.) — it runs entirely inside the Node.js backend using a plain code library, with standard HTML file upload/download on the browser side. No browser extension or third-party connector is needed.

AWS (or similar cloud object storage like S3) only becomes relevant as an **optional** add-on if the client wants the system to keep a permanent, re-downloadable archive of every uploaded/exported file for record-keeping — reusing the same cloud storage already planned for certificates and ID cards. It is not required for the feature to function.

### 7.6 Safeguards Built In

- **Preview before commit** — admin sees a preview table of what will be imported before it touches the real database
- **Row-level error reporting** — invalid rows are flagged individually with a reason, rather than failing or corrupting the whole batch silently
- **Audit log entry** — every bulk import/export is logged (who, when, how many records) — fits the existing audit-log requirement
- **Permission-gated (RBAC)** — only roles with the correct permission (e.g., admin) can bulk import/export sensitive data like fees or personal details

---

## 8. Next Steps

1. ✅ Review this document — confirm tech stack, scalability approach, and cost range are acceptable
2. ⬜ Discuss and decide on the **Open Items** in Section 6 — especially data privacy, the parent role, and ownership terms
3. ⬜ Confirm the **Bulk Excel Import/Export** feature scope (Section 7) — which modules need it first (admissions, marks, fees)
4. ⬜ Approve the **look-and-feel demo** (React/Vite starter, static pages, all 4 modules) — *next deliverable*
5. ⬜ Finalize wireframes based on demo feedback
6. ⬜ Begin actual development in phases as listed in Section 4.1

---

*This document is a planning-stage estimate. Final costs and timelines will be refined once the demo is approved, the open items in Section 6 are decided, and detailed requirements (student count, number of branches, specific integrations) are locked in.*
