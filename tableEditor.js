
import ColumnWidthManager from './ColumnWidthManager.js';
import { autoSizeInput } from './utilities.js';

// Replace first 3 cells in row with styled inputs
export function enterEdit( row ) {
	row.classList.add( 'editing' );

	const table = row.closest( 'table' );
	const cells = row.querySelectorAll( 'td' );

	for( let i = 0; i < 3; i++ ) {
		const cell = cells[i];
		const value = cell.textContent;
		const maxWidth = ColumnWidthManager.get( table, i );
		const style = getComputedStyle( cell );

		cell.innerHTML = `<input type="text" value="${value}" data-original-value="${value}" style="
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

	// Show Save and Cancel, hide Edit
	setActionButtons( row, 'edit' );
}

// Replace inputs with their values
export function saveEdit( row ) {
	row.classList.remove( 'editing' );
	const cells = row.querySelectorAll( 'td' );

	for( let i = 0; i < 3; i++ ) {
		const cell = cells[i];
		const input = cell.querySelector( 'input' );
		if( input ) cell.textContent = input.value;
	}

	// Hide Save and Cancel, show Edit
	setActionButtons( row, 'view' );
}

export function cancelEdit( row ) {
	row.classList.remove( 'editing' );

	const cells = row.querySelectorAll( 'td' );

	for( let i = 0; i < 3; i++ ) {
		const input = cells[i].querySelector( 'input' );
		if( input ) {
			const original = input.dataset.originalValue;
			cells[i].textContent = original;
		}
	}

	// Hide Save and Cancel, show Edit
	setActionButtons( row, 'view' );
}

function setActionButtons( row, mode ) {
	const actionCell = row.querySelector( '.action-cell' );
	const editBtn = actionCell.querySelector( '.edit-btn' );
	const editControls = actionCell.querySelectorAll( '.save-btn, .cancel-btn' );

	if( mode === 'view' ) {
		editBtn.style.display = '';
		editControls.forEach( btn => btn.style.display = 'none' );
	}
	else if( mode === 'edit' ) {
		editBtn.style.display = 'none';
		editControls.forEach( btn => btn.style.display = '' );
	}
}

