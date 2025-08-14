# Inline Table Editor (Modular HTML/CSS/JS)

A minimal, rollback-safe inline editing interface for HTML tables—now modularized for clarity, inspectability, and future-proofing. This project demonstrates pixel-perfect input sizing, pure CSS layout stability, and intuitive toggling between static and editable states—without any frameworks or dependencies.

## 🔗 Live Demo

Try it out instantly: [Inline Table Editor Demo](https://malkalypse.github.io/table-editor/)

## ✨ Features

- **Inline Editing**: Click “Edit” to transform table cells into inputs, preserving layout fidelity.
- **Rollback-Safe**: Edits are staged and only committed on “Save”—no accidental overwrites.
- **Memoized Column Widths**: Inputs match original cell widths using cached measurements.
- **Pure CSS Layout**: No layout shifts or reflows during editing.
- **Modular Architecture**: Logic is split into inspectable, purpose-driven files.

## 🧱 How It Works

1. **Edit Mode**  
   `enterEdit()` replaces cells with `<input>` elements sized to match original column widths.

2. **Save Mode**  
   `saveEdit()` commits changes and triggers `ColumnWidthManager.refresh()` to recalculate widths.

3. **Cancel**  
   `cancelEdit()` restores original values using `data-original-value`.

4. **Width Measurement**  
   `utilities.js` uses hidden `<span>` elements to measure text width precisely.

## 📁 File Structure

| File                  | Purpose                                                                 |
|-----------------------|-------------------------------------------------------------------------|
| `index.html`          | Loads the table, links styles and scripts                               |
| `style.css`           | Defines styling for table layout and editable inputs                    |
| `main.js`             | Attaches event listeners and manages edit/save/cancel flow              |
| `tableEditor.js`      | Contains core editing functions (`enterEdit`, `saveEdit`, `cancelEdit`) |
| `utilities.js`        | Provides width measurement and input sizing utilities                   |
| `ColumnWidthManager.js` | Memoizes and recalculates column widths for stable UI editing         |

## 🧪 Styling Highlights

Example input styling from `style.css`:

    td input {
      font: inherit;
      color: inherit;
      padding: 0;
      margin: 0;
      text-align: inherit;
      outline: 1px solid rgba(0, 0, 0, 0.2);
      transition: outline-color 0.2s ease;
      display: inline-block;
      box-sizing: content-box;
    }

- Inputs inherit all font and spacing properties from their parent cell.
- `box-sizing: content-box` ensures width matches text content precisely.
- Layout remains stable across browsers and zoom levels.

## 🚀 Usage

Just open `index.html` in any modern browser. No build steps, no dependencies.

    <button class="edit-btn">Edit</button>

- Click “Edit” to enter edit mode.
- Click “Save” to commit changes.
- Click “Cancel” to discard edits.

## 🧠 Philosophy

This project reflects a modular mindset applied to minimal UI:

- **Inspectable**: Easy to read, debug, and extend.
- **Rollback-Friendly**: Edits are intentional and reversible.
- **Precision-Driven**: Layout and input sizing are pixel-perfect.
- **No Bloat**: No libraries, no build tools—just clean, functional code.
- **Modular by Design**: Each file has a clear purpose and minimal cognitive overhead.

## 🛠️ Customization

To adapt this for your own data:

- Modify the `<table>` rows and headers in `index.html`.
- Extend `tableEditor.js` to handle more columns or validation.
- Update `style.css` for accessibility, theming, or responsive behavior.
