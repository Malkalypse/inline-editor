
import ColumnWidthManager from './ColumnWidthManager.js';
import { autoSizeInput } from './utilities.js';

// Replace first 3 cells in row with styled inputs
export function enterEditMode( row ) {
	row.classList.add( 'editing' );

	const table = row.closest( 'table' );
	const cells = row.querySelectorAll( 'td' );

	for( let i = 0; i < 3; i++ ) {
		const cell = cells[i];
		const value = cell.textContent;
		const maxWidth = ColumnWidthManager.get( table, i );
		const style = getComputedStyle( cell );

		cell.innerHTML = `<input type="text" value="${value}" style="
			width:${maxWidth}px;
			box-sizing: content-box;
			padding: 0;
			border: none;
			font: ${style.font};
			letter-spacing: ${style.letterSpacing};
		" />`;

		const input = cell.querySelector( 'input' );
		autoSizeInput( input, maxWidth );
	}
}

// Replace inputs with their values
export function exitEditMode( row ) {
	row.classList.remove( 'editing' );
	const cells = row.querySelectorAll( 'td' );

	for( let i = 0; i < 3; i++ ) {
		const cell = cells[i];
		const input = cell.querySelector( 'input' );
		if( input ) {
			cell.textContent = input.value;
		}
	}
}

// Swap button label and class
export function updateButtonState( button, label, removeClass, addClass ) {
	button.textContent = label;
	button.classList.remove( removeClass );
	button.classList.add( addClass );
}