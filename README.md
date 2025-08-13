# Inline Table Editor (Pure HTML/CSS/JS)

A minimal, rollback-safe inline editing interface for HTML tables. This single-file project demonstrates pixel-perfect input sizing, pure CSS layout stability, and intuitive toggling between static and editable states—without any frameworks or dependencies.

## 🔗 Live Demo

Try it out instantly: [Inline Table Editor Demo](https://malkalypse.github.io/inline-editor/)

## ✨ Features

- Inline Editing: Click “Edit” to transform table cells into inputs, preserving layout fidelity.
- Rollback-Safe: Edits are staged and only committed on “Save”—no accidental overwrites.
- Pixel-Perfect Input Sizing: Inputs match the original text width using dynamic measurement.
- Pure CSS Layout: No layout shifts or reflows during editing.
- Single File Simplicity: All logic and styling contained in one HTML file.

## 🧱 How It Works

- Clicking “Edit” replaces the first three cells in a row with `<input>` elements.
- Input widths are calculated using a hidden `<span>` that matches the cell’s font styling.
- “Save” commits the input values back into the table and restores static view.
- Button states toggle between “Edit” and “Save” with class swapping.

## 🧪 Styling Highlights

    td input {
      font: inherit;
      color: inherit;
      padding: 0;
      margin: 0;
      text-align: inherit;
      outline: 1px solid rgba(0, 0, 0, 0.2);
      transition: outline-color 0.2s ease;
      display: inline-block;
    }

- Inputs inherit all font and spacing properties from their parent cell.
- `box-sizing: content-box` ensures width matches text content precisely.
- Layout remains stable across browsers and zoom levels.

## 🚀 Usage

Just open the HTML file in any modern browser. No build steps, no dependencies.

    <button class="edit-btn">Edit</button>

- Click “Edit” to enter edit mode.
- Click “Save” to commit changes.

## 📁 File Contents

Everything is contained in a single HTML file:

- `<style>` block for table and input styling
- `<table>` with sample data
- `<script>` block for edit/save logic and width measurement

## 🧠 Philosophy

This project reflects a modular mindset applied to minimal UI:

- **Inspectable**: Easy to read, debug, and extend.
- **Rollback-Friendly**: Edits are intentional and reversible.
- **Precision-Driven**: Layout and input sizing are pixel-perfect.
- **No Bloat**: No libraries, no build tools—just clean, functional code.

## 🛠️ Customization

To adapt this for your own data:

- Modify the `<table>` rows and headers.
- Extend the `enterEditMode` and `exitEditMode` functions to handle more columns or validation.
- Style inputs further for accessibility or theming.