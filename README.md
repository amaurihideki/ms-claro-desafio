# Whack-a-Mole Game

This is a simple browser-based Whack-a-Mole implementation created for a challenge. The objective is to hit randomly appearing moles within a time limit and accumulate points.

## Features

- 3x3 grid board where moles pop up at random.
- Moles appear in three different colors; each color gives different points (brown +1, green +2, red +3).
- Clickable holes to "whack" moles and increase score based on color.
- Score and timer displayed prominently, with a legend explaining color values.
- 30 second game session; after time expires the player can enter their name and the score is stored.
- Leaderboard showing top 20 scores in the corner using browser storage.

## Technical details

The project consists of `index.html`, `styles.css`, and `script.js`. The logic is straightforward:

1. Build the grid of holes dynamically in JavaScript.
2. Use `setInterval` to spawn moles every second; each mole is assigned a random color/score.
3. Handle clicks on holes to detect and score hits; points vary by mole color.
4. Count down the timer and end the game when time runs out. Prompt the player for a name and save the result.
5. Maintain and display a leaderboard of the top 20 scores stored in `localStorage`.

## Copilot Assistance

GitHub Copilot played a crucial role throughout development. Here are examples of how I interacted:

1. **Inline completions**: While typing the `showMole` function, Copilot suggested the `setTimeout` pattern to hide the mole after a short delay. Later I guided it with comments to add random color/points logic.

2. **Generating full functions**: I wrote a comment `// generate random hole for mole` and Copilot produced a complete `randomHole` function. I adjusted variable names slightly. For the leaderboard I wrote `// leaderboard persistence using localStorage` and Copilot scaffolded load/save functions.

3. **Refactor suggestions**: After writing the initial event listener, Copilot recommended extracting a `hitMole` helper. I triggered this by selecting the code, asking Copilot to refactor, and the completion produced the new helper function. Later I used the refactor panel again when changing hit logic to account for variable points.

Other interactions included editing CSS with Copilot suggestions for `grid-template-columns` and gradient background, plus using the side panel to cycle through alternatives when implementing the timer and leaderboard logic.

## Strategies to maximize Copilot

- I start by writing descriptive comments to guide Copilot's output. Comments like `// createBoard builds a 3x3 grid of holes` yielded boilerplate scaffolding that I then customized.

- Accepting completions early and iteratively modifying them kept my flow smooth. When a suggestion was off, I rewrote the comment or provided additional context to steer Copilot.

- I used Copilot in both the editor and the command palette for refactoring tasks, demonstrating its different interaction modes.

## Running the game

Serve the folder with a static server (e.g., `npx http-server`) and open `index.html` in a browser.

## Score storage example

The leaderboard uses browser storage (`localStorage`) to keep a JSON array of score objects. A typical stored value looks like:

```json
[
  { "name": "Alice", "score": 42, "date": "2026-03-02T12:34:56.789Z" },
  { "name": "Bob", "score": 37, "date": "2026-03-01T18:20:00.000Z" }
]
```

Even though there isn't a server‑side file, the structure is simple and could be adapted to read/write a `scores.json` if a backend were added.

The leaderboard panel in the top‑right corner displays the top 20 entries from this list.

Enjoy the game!
