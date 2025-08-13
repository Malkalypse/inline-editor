import ColumnWidthManager from './ColumnWidthManager.js';
import { enterEditMode, updateButtonState, exitEditMode } from './tableEditor.js';

// Attach click listener to each table
document.querySelectorAll( 'table' ).forEach( function ( table ) {
  table.addEventListener( 'click', function ( event ) {
    const button = event.target;

    // Make row editable
    if( button.classList.contains( 'edit-btn' ) ) {
      const row = button.closest( 'tr' );
      enterEditMode( row );
      updateButtonState( button, 'Save', 'edit-btn', 'save-btn' );
    }
    // Commit edits and restore static view
    else if( button.classList.contains( 'save-btn' ) ) {
      const row = button.closest( 'tr' );
      exitEditMode( row );
      updateButtonState( button, 'Edit', 'save-btn', 'edit-btn' );

      // Recompute column widths after save
      ColumnWidthManager.refresh( table );
    }
  } );
} );