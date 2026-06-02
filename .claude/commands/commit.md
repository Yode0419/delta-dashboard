Analyze the current git changes and propose a commit message for the user to confirm before committing.

## Steps

1. Run `git status` and `git diff HEAD` to understand what changed (captures both staged and unstaged changes).
2. Propose a commit message in the format below.
3. Ask the user: "Does this commit message look good? (y to confirm, or tell me what to change)"
4. Only run `git add -A && git commit -m "..."` after the user confirms.

## Commit message format

```
<type>(<scope>): <short description>

<detail line 1>
<detail line 2>
<detail line 3 if needed>
```

**Type** — pick the most accurate one:
- `feat` new feature or behavior
- `fix` bug fix
- `refactor` restructure without behavior change
- `style` visual / CSS only
- `chore` config, tooling, deps, setup

**Scope** — the area of code changed (e.g. `simulation`, `store`, `MetricCard`, `types`, `mock`). Omit if the change spans too many areas.

**Short description** — what changed, in plain language. No period at the end.

**Detail lines** — use bullet points (`-`). Only include changes that are non-obvious or worth calling out. 2 to 4 bullets is ideal; omit entirely if the first line says it all.

## Example

```
feat(simulation): add tick-driven simulation engine

- setInterval at 2000ms, 8 total ticks
- each tick updates metrics, fires alerts, and appends a log entry
- auto-completes experiment when totalTicks is reached
```

## Tone

Write like a developer explaining a PR to a teammate: clear, direct, no filler. Avoid words like "implement", "utilize", "enhance" when simpler ones work.
