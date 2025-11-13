# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Puzzle Quest is a React-based puzzle game featuring map-based progression, two difficulty modes (Easy: 2×2 grid, Hard: 3×3 grid), and an admin mode for creating custom stages. The game uses Canvas API for image slicing, WebGL shaders for confetti effects, and localStorage for data persistence.

## Development Commands

### Start Development Server
```bash
npm run dev
```
Starts Vite dev server on `http://localhost:3000` with auto-reload enabled.

### Build for Production
```bash
npm run build
```
Outputs optimized production build to `dist/` directory with sourcemaps.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally to verify before deployment.

### Lint Code
```bash
npm run lint
```
Runs ESLint on all `.js` and `.jsx` files in `src/`. Max warnings is set to 0.

## Architecture

### Application State Flow

The app uses a single-direction state flow managed in `App.jsx`:

1. **App.jsx** - Root component managing global state:
   - `screen`: Controls view navigation ('home', 'map', 'game')
   - `isAdmin`: Toggles admin mode for stage creation/deletion
   - `selectedMode`: Current difficulty ('easy' or 'hard')
   - `stages`: Array of all stages, persisted to localStorage
   - `currentStage`: Currently playing stage

2. **Component Hierarchy**:
   ```
   App
   ├─ HomePage (mode selection, admin toggle)
   ├─ MapView (stage list, upload modal, drag-to-reorder)
   └─ GameView (puzzle gameplay, timer, moves, confetti)
   ```

### Data Persistence Strategy

All game data is stored in browser localStorage:

- **Stages**: `localStorage.getItem('stages')` - JSON array of stage objects
- **Personal Bests**: `pb-{mode}-{stageId}` - Best completion time per stage
- **Completed Stages**: `completed-{stageId}` - Boolean completion status
- **Tutorial**: `hasSeenTutorial` - One-time tutorial display flag

Stage objects have this structure:
```javascript
{
  id: timestamp,
  name: string,
  image: base64DataURL,
  mode: 'easy' | 'hard'
}
```

### Puzzle Mechanics (GameView.jsx)

The puzzle system works as follows:

1. **Image Slicing**: Canvas API splits uploaded image into grid pieces (2×2 or 3×3)
2. **Piece State**: Each piece tracks:
   - `originalIndex`: Where it started
   - `currentIndex`: Current position in grid
   - `rotation`: Rotation angle (0, 90, 180, 270)
   - `displayRotation`: Visual rotation (for animation)
3. **Scrambling**: Randomizes rotations and positions (hard mode only for positions)
4. **Win Condition**: All pieces must have `rotation === 0` and `currentIndex === originalIndex`
5. **Interactions**:
   - Click piece → Rotate 90° clockwise with particle effects
   - Drag & drop (both modes) → Swap two pieces

### Visual Effects

- **Particle System** (GameView.jsx:237-261): Creates 8 particles on rotation using CSS custom properties for animation
- **WebGL Confetti** (GameView.jsx:263-338): Fragment shader-based falling confetti using noise functions
- **Drag Feedback** (MapView.jsx): Visual indicators during drag-and-drop reordering (admin mode)
- **CSS Animations**: Cloud movement (HomePage), hover effects, transitions

### Admin Mode Features

When `isAdmin === true`:
- MapView shows "+ Add Stage" button
- Stages become draggable for reordering
- Delete buttons appear on each stage
- UploadModal allows creating stages with "Apply to Both" option (creates easy + hard variants)

## Common Tasks

### Adding a New Component

1. Create file in `src/components/`
2. Create matching CSS file in `src/styles/`
3. Import CSS at top of component: `import '../styles/ComponentName.css'`
4. Import and use in parent component (typically App.jsx)

### Modifying Puzzle Logic

Key functions in GameView.jsx:
- `initializePuzzle()` (line 45): Image slicing setup
- `scramblePuzzle()` (line 95): Initial randomization
- `handleRotate()` (line 134): Rotation + particle effects
- `checkWin()` (line 214): Victory condition
- `handleDragStart/Drop()` (line 158-188): Drag-and-drop piece swapping

### Changing Game Difficulty

Grid size is determined by `stage.mode`:
- Easy: `gridSize = 2` (4 pieces)
- Hard: `gridSize = 3` (9 pieces)

Both modes now support drag-and-drop (`isDraggable = true` on line 17).

### localStorage Management

All localStorage operations should:
1. Use consistent key patterns (see Data Persistence Strategy above)
2. Stringify objects before saving: `JSON.stringify(data)`
3. Parse when reading: `JSON.parse(saved)`
4. Handle null/undefined gracefully

## Configuration Files

- **vite.config.js**: Dev server runs on port 3000, auto-opens browser, builds to `dist/`
- **.eslintrc.cjs**: React 18.2, prop-types disabled, react-refresh warnings enabled
- **package.json**: Uses ES modules (`"type": "module"`), React 18.2 dependencies

## File Size Considerations

This project was refactored from a single 2500-line HTML file. See `AVOIDING-MAX-LENGTH.md` for detailed strategies on:
- Keeping components under 300 lines
- Splitting large files
- Working effectively with Claude on modular codebases

When adding features, prefer creating new component files over expanding existing ones beyond ~400 lines.

## Image Handling

Images are stored as base64 data URLs in localStorage. When creating new stages:
1. User uploads image via UploadModal
2. FileReader converts to base64
3. Base64 stored in stage object
4. GameView converts base64 to Image, slices with Canvas API

This eliminates need for file hosting but limits total stages to localStorage quota (~5-10MB).

## Naming Conventions

- Components: PascalCase (HomePage.jsx)
- Styles: Match component name (HomePage.css)
- Functions: camelCase (handleModeSelect)
- Constants: UPPER_SNAKE_CASE if truly constant
- CSS classes: kebab-case (puzzle-piece)
