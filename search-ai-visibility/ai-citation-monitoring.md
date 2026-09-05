# AI Citation and Answer-Engine Monitoring

Use a fixed prompt set to measure whether AI-assisted search can identify, describe, and cite a business accurately.

## Test conditions

Record:

- date and time
- tool or answer engine
- signed-in or signed-out state when known
- approximate location
- exact prompt
- whether live web search was used
- business mention
- linked citation
- factual accuracy
- competitors mentioned
- recommended corrective action

Do not compare results collected under materially different conditions without labeling the difference.

## Benchmark prompt groups

### Branded discovery

- What is [BUSINESS NAME]?
- What services does [BUSINESS NAME] provide?
- Is [BUSINESS NAME] legitimate?
- How can I contact [BUSINESS NAME]?

### Local commercial discovery

- Who builds websites for small businesses in [CITY]?
- Affordable website designer in [CITY]
- Website maintenance for small businesses in [REGION]
- [SPECIALTY] website developer in [REGION]

### Problem and comparison discovery

- What should a small business prepare before hiring a website designer?
- What is the difference between domain, hosting, and maintenance?
- Website versus social-media page for a local business
- Questions to ask a website developer before hiring

## Scoring

Score each prompt separately:

- 0 - not mentioned
- 1 - mentioned inaccurately or without a usable source
- 2 - accurate mention without a direct citation
- 3 - accurate mention with a relevant citation
- 4 - recommended appropriately with supporting evidence

Keep branded and non-branded scores separate. A strong branded result does not prove competitive local discovery.

## Corrective-action mapping

- Missing brand: improve crawlability, entity consistency, and profile links.
- Wrong facts: correct the controlling page and third-party profiles.
- No citation: publish a stronger direct answer and pursue reputable mentions.
- Missing non-branded visibility: strengthen service pages, evidence, reviews, and local authority.
- Competitor dominance: document what evidence competitors have that the site lacks.
- Stale answer: update the controlling page and wait for recrawl; do not make repeated unchanged submissions.

## Reporting rule

An answer-engine observation is a dated snapshot. Never represent it as guaranteed future placement, ranking, traffic, or sales.
