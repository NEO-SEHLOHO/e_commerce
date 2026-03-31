# Website Overview and Task Plan

## What This Website Is Currently Doing
This is currently a static school-uniform catalog and quotation website.

Current behavior:
- Shows products and categories (catalog-style pages)
- Lets users request quotations via WhatsApp, phone, email, and quote form
- Does **not** have a real e-commerce backend
- Does **not** have real cart/checkout payment processing
- No customer login/account persistence

## File-by-File Responsibility (Current Project)

### Root HTML pages
- `index.html`: Home page, hero sections, featured products, footer contact
- `shop.html`: Product/category listing and product cards
- `quote.html`: Quotation request page and quote support actions
- `contact.html`: Contact details and quotation contact channels
- `about.html`: Brand/company information page
- `legal.html`: Legal hub page
- `cart.html`: Placeholder page (quotation-only notice)
- `checkout.html`: Placeholder page (quotation-only notice)

### Legal subpages
- `legal/terms.html`: Terms and conditions
- `legal/privacy.html`: Privacy policy
- `legal/returns.html`: Returns/refund policy
- `legal/delivery.html`: Delivery policy
- `legal/disclaimer.html`: Disclaimer
- `legal/faq.html`: FAQ page

### Styling and scripts
- `styles.css`: Main stylesheet used by pages
- `main.js`: Shared frontend script logic
- `assets/js/scroll-anim.js`: Scroll animation behavior
- `assets/js/quote-builder.js`: Quote message builder/WhatsApp quote helper
- `assets/css/styles.css`: Additional stylesheet asset
- `assets/css/responsive.css`: Responsive rules asset

### Media/assets
- `assets/images/...`: Logos, product photos, showcase, icons

### Documentation
- `README.md`: Basic project readme
- `WEBSITE_EDITING_GUIDE.md`: Editing guidance for the website
- `DEPLOYMENT.md`: Deployment notes

## Gaps Raised by Client (Must Be Implemented)
The client reported the following missing requirements:
- No secured shopping cart and checkout
- No payment gateway
- Not PCI compliant
- Not optimized for Google SEO
- No customer account creation
- Social media not fully integrated (mostly WhatsApp only)
- Need visibility of backend system
- Need proof/training that client was taught backend management

## Required Extension Work (To Make It a Proper Website)

### 1) Secure Cart + Checkout
- Build server-backed cart and checkout flow
- Validate prices/stock on backend (not frontend-only)
- Add order creation and order status lifecycle

### 2) Payment Gateway (PayGate)
- Integrate PayGate server-to-server flow
- Implement return URL + notify/webhook endpoint
- Verify transaction signatures/checksums
- Update order payment status only after verification

### 3) PCI and Security Baseline
- Use HTTPS everywhere
- Do not store card data locally
- Use hosted/redirect payment flow where possible
- Add security headers, input validation, access controls, logs, backups

### 4) Google SEO Optimization
- Page-specific title/meta descriptions
- Open Graph + Twitter metadata
- `sitemap.xml` + `robots.txt`
- Structured data (Schema.org)
- Performance optimization (images, CSS/JS delivery, Core Web Vitals)

### 5) Customer Accounts
- User registration/login/logout
- Password reset flow
- Profile and addresses
- Order history page

### 6) Social Media Integration
- Add real profile links (Facebook/Instagram/TikTok/etc.)
- Add share metadata/buttons where relevant
- Optional tracking pixels/analytics integration

### 7) Backend/Admin System
- Admin login and roles
- Product management (CRUD)
- Stock management
- Order management
- Payment status monitoring
- Customer management
- Reports/export

### 8) Client Training and Handover
- Admin user manual (PDF/video)
- Live training session(s) recorded
- Handover credentials and operating checklist
- Signed training/handover confirmation

## Suggested Build Sequence
1. Backend + database foundation
2. Product, cart, order APIs
3. PayGate integration
4. Customer authentication
5. Admin dashboard
6. SEO + social integration
7. Security hardening + compliance checks
8. UAT, launch, and client training

## Step-by-Step Implementation Guide

### Step 1: Confirm Scope and Sign-Off
- Create a short specification document with exact features:
  - Cart/checkout behavior
  - Payment methods (PayGate)
  - Account features
  - Admin features
  - SEO/social requirements
- Get client approval in writing before development.
- Output of this step:
  - Signed scope
  - Priority feature list

### Step 2: Prepare Technical Foundation
- Choose stack (example: Node.js + Express + PostgreSQL).
- Create environments:
  - Local development
  - Staging
  - Production
- Set up Git workflow and deployment strategy.
- Output of this step:
  - Running backend skeleton
  - Database connection
  - Environment variable setup

### Step 3: Design Database
- Create schema/tables:
  - `users`, `roles`
  - `products`, `categories`, `inventory`
  - `carts`, `cart_items`
  - `orders`, `order_items`, `payments`
  - `addresses`
- Add migrations and seed sample data.
- Output of this step:
  - Versioned schema
  - Seeded dev database

### Step 4: Build Product and Catalog APIs
- Implement endpoints for:
  - Product listing/filtering
  - Product details
  - Admin product CRUD
  - Inventory update
- Connect current frontend product pages to API responses.
- Output of this step:
  - Dynamic product catalog from database

### Step 5: Build Secure Cart and Checkout
- Build backend cart APIs:
  - Add/remove/update item
  - Recalculate totals server-side
- Build checkout API:
  - Validate stock and totals on server
  - Create pending order
- Output of this step:
  - Real server-backed cart and order creation

### Step 6: Integrate PayGate Properly
- Register/prepare merchant credentials with PayGate.
- Add backend payment service:
  - Create PayGate request from order
  - Redirect customer to PayGate payment page
- Add return/callback endpoints:
  - Success/fail return handling
  - Notify/webhook verification (signature/checksum)
- Update order status only after verified callback.
- Output of this step:
  - End-to-end paid order flow

### Step 7: Add Customer Accounts
- Implement:
  - Register/login/logout
  - Password reset
  - Profile + addresses
  - Order history
- Protect customer routes and data by authenticated user.
- Output of this step:
  - Functional account system

### Step 8: Build Admin Backend System
- Add admin panel with role-based access.
- Screens/modules:
  - Product management
  - Stock/inventory management
  - Order management
  - Payment status review
  - Customer list
  - Basic reporting/export
- Output of this step:
  - Usable backend operations console

### Step 9: Implement Security + Compliance Baseline
- Enforce HTTPS in all environments.
- Do not store card data in your system.
- Add:
  - Input validation/sanitization
  - Password hashing
  - Security headers
  - Rate limiting
  - Access logging and backups
- Finalize legal content (privacy, terms, returns, POPIA-aligned handling).
- Output of this step:
  - Reduced PCI scope and hardened application

### Step 10: SEO + Social Integration
- Add page-level SEO:
  - Unique titles and meta descriptions
  - Open Graph and Twitter cards
  - Structured data (Schema.org)
  - `sitemap.xml` and `robots.txt`
- Add social:
  - Real Facebook/Instagram/TikTok links
  - Share metadata/buttons
  - Optional pixels/analytics
- Output of this step:
  - Search and social-ready website

### Step 11: Test, UAT, and Launch
- Execute test checklist:
  - Product browsing
  - Cart operations
  - Checkout success/failure
  - PayGate callback integrity
  - Account flows
  - Admin flows
- Run UAT with client and gather sign-off.
- Deploy production release.
- Output of this step:
  - Live verified system

### Step 12: Client Training and Handover
- Train client on admin operations:
  - Add/edit products
  - Manage stock
  - Process orders
  - Track payment status
- Provide:
  - Admin user guide
  - Training recording
  - Credentials handover sheet
  - Support period details
- Capture signed handover/training confirmation.
- Output of this step:
  - Client operational readiness and proof of training

## Current State Summary
This project is a quotation-focused static site. To satisfy the client specification, it must be extended into a full backend-driven e-commerce system with payment, accounts, admin operations, SEO, social integration, and formal handover/training.
