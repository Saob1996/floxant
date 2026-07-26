# TRUST HEALTH REPORT

Status: FAIL
Generated: 2026-07-26T11:16:32.831Z

| Status | Check | Detail |
| --- | --- | --- |
| FAIL | required trust files | Missing files: docs/REVIEW_TRUST_CLAIM_AUDIT.md, docs/PROJECT_STORY_AND_CASE_STUDY_GUIDELINES.md, docs/DUAL_LOCATION_GBP_LOCAL_PROOF_PLAN.md, docs/SIGNATURE_SERVICE_TRUST_MAP.md, docs/SERVICE_SPECIFIC_TRUST_MAP.md |
| PASS | trust signal data gates | 10 trust signals include visibility and risk gates. |
| FAIL | prioritized route coverage | [<br>  {<br>    "route": "/",<br>    "missingFiles": [],<br>    "missingTokens": [<br>      "LocationClarityPanel",<br>      "FloxantObjectBrief"<br>    ]<br>  },<br>  {<br>    "route": "/diskret-service",<br>    "missingFiles": [],<br>    "missingTokens": [<br>      "/diskret-service"<br>    ]<br>  }<br>] |
| PASS | fake review and claim scan | No positive fake-review, rating, certification or guaranteed-cheaper claims found in app/components. |
| PASS | review structured-data scan | No Review or AggregateRating schema claims found without documented guardrail context. |
| PASS | legacy review UI | Legacy star/rating UI is neutralized or guarded. |
| PASS | project story and visual proof gates | Real cases/photos remain hidden unless consent and privacy gates are satisfied. |
| PASS | local proof signals | Düsseldorf and Regensburg show customer-facing location guidance without internal proof labels. |
