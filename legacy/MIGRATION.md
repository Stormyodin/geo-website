# Migration Notes from `Website.txt`

`Website.txt` contains many concatenated files from a Vite + React project.

Use this Next.js target structure:

- `app/page.tsx` -> Home page
- `app/packages/page.tsx` -> Packages page
- `app/booking/page.tsx` -> Booking page
- `app/hotel-booking/page.tsx` -> Hotel booking page
- `app/discover-pei/page.tsx` -> Discover PEI page
- `app/not-found.tsx` -> Page not found component
- `components/` -> shared sections such as:
  - `HeroSection.tsx`
  - `FeaturedPackages.tsx`
  - `InfoSection.tsx`
  - `PackageCard.tsx`
  - `Footer.tsx`
- `components/ui/` -> shadcn/radix UI primitives extracted from early blocks
- `lib/` -> utility helpers (`utils.ts`, URL helpers, constants)

## Important conversion changes

1. Replace `react-router-dom` `Link` usage with `next/link`.
2. Replace route helper usage (`createPageUrl`) with direct Next.js paths.
3. Add `"use client"` at the top of components that use:
   - `useState` / `useEffect`
   - browser APIs (`window`, `URLSearchParams`)
   - animation libs (`framer-motion`)
4. Keep server components default where possible.
5. Move environment variables from `VITE_*` names to `NEXT_PUBLIC_*` if needed.

## Current status

- Next.js scaffold created.
- Original `Website.txt` remains at the workspace root for source extraction.
