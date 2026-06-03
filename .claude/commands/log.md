Automatically update `planning/progress.md` based on the current state of the project. Do not ask the user what they did — derive everything from the code and git history.

## Steps

1. Read `planning/progress.md` to understand the current checklist and last log entry.
2. Run `git log --oneline -20` to see recent commits.
3. Run `git diff HEAD~1 HEAD --name-only` (or `git diff --name-only` if nothing committed yet) to see which files changed recently.
4. Scan `src/` to check which files and components actually exist and appear functional.
5. Based on the above, determine which checklist items are now complete and what was worked on since the last log entry.
6. Update the checklist by marking completed items with `[x]`.
7. Append a new dated entry to the Log section with a concise summary of what changed. Write in Chinese. Keep it to 1–3 bullet points maximum — group related changes together, omit implementation details and list only meaningful outcomes.

## Rules

Only mark a checklist item `[x]` if the corresponding file exists and has real implementation, not just an empty shell or placeholder.

Do not add items to the checklist that are not already there — the checklist is managed manually.

Append the log entry under today's date (YYYY-MM-DD). If there is already an entry for today, append to it rather than creating a duplicate.

Do not ask the user for confirmation before writing — just update the file and report what changed in a brief summary.
