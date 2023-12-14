## Interaction flow

Notes:

- _All actions with `date` param are performed for selected period_
- _Trailing slashes just for beauty in Markdown_

### First-time

1. Retrieve existing **payments systems** (`GET /api/payments-system/?date={DATE}`)
2. Add **payments systems**, configure **system's files** and fields mappings (`POST /api/payments-system/`)
3. Retrieve **revise objects** list (`GET /api/revise-object/?date={DATE}`)
4. Upload files to **revise objects** (`POST /api/revise-object/:fileId/`)
5. (Optional) Delete files to reupload in case of mistake (`DELETE /api/revise-object/:fileId/`)
6. Start **revise** (`POST /api/revise/:date/`)
7. Wait for **revise** ends and display summary table (`GET /api/revise/:date/`)
8. Download summary of **revise** (`GET /api/revise/:date/export/?filters=...`)

### Next times

1. Copy **payments systems** from previous period (`POST /api/payments-system/duplicate/`)
2. (Optional) Update some **payments systems** if needed (`PATCH /api/payments-system/:id/`)
3. Steps from [first-time](#first-time) section

## Questions

- Is allowed to reupload files without deleting it? - **not allowed**
- How to handle `POST /api/revise/:date/` from multiple users simultaneously?
  - Avoiding of unnecessary recalculations (revise process)
