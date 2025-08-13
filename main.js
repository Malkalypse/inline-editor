import ColumnWidthManager from './ColumnWidthManager.js';
import { enterEdit, saveEdit, cancelEdit } from './tableEditor.js';

// Attach click listener to each table
document.querySelectorAll( 'table' ).forEach( function ( table ) {
	table.addEventListener( 'click', function ( event ) {
		const button = event.target;

		// Make row editable
		if( button.classList.contains( 'edit-btn' ) ) {
			const row = button.closest( 'tr' );
			enterEdit( row );
		}
		// Commit edits and restore static view
		else if( button.classList.contains( 'save-btn' ) ) {
			const row = button.closest( 'tr' );
			saveEdit( row );

			// Recompute column widths after save
			ColumnWidthManager.refresh( table );
		}
		else if( button.classList.contains( 'cancel-btn' ) ) {
			const row = button.closest( 'tr' );
			cancelEdit( row );
		}
	} );
} );