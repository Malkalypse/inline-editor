// ColumnWidthManager.js
// Memoizes column widths per table for fast, rollback-safe access
import { measureSpanWidth } from './utilities.js';

const ColumnWidthManager = ( () => {
	const map = new WeakMap(); // table → columnWidths[]

	function get( table, i ) {
		if( !map.has( table ) ) compute( table );
		return map.get( table )?.[i] ?? 0;
	}

	function invalidate( table ) {
		map.delete( table );
	}

	function refresh( table ) {
		invalidate( table );
		return compute( table );
	};

	// Returns: Array of max widths for each column, based on visible text content
	function compute( table ) {

		// table.rows[0]:	First row of table
		// ?.cells:				Access <td> or <th> elements (optional chaining for safety)
		// || []:					Fall back to empty arraw if .cells is nullish (ensures valid iterable)
		// ( _, i ):			Ignore cell value, use index to compute max column width

		const widths = Array.from(
			table.rows[0]?.cells || [],
			( _, i ) => getMaxColumnTextWidth( table, i )
		);
		map.set( table, widths );
	}

	/**
	 * Returns the pixel width of the widest cell in a given column.
	 * Uses span-based measurement for accurate text rendering width.
	 *
	 * @param {HTMLTableElement} table - The table element to inspect.
	 * @param {number} columnIndex - The zero-based index of the column.
	 * @returns {number} - Maximum text width in pixels.
	 */
	function getMaxColumnTextWidth( table, columnIndex ) {
		return Array.from( table.querySelectorAll( 'tbody tr' ) ).reduce( ( max, row ) => {
			const cell = row.children[columnIndex];
			return cell ? Math.max( max, measureSpanWidth( cell.textContent, cell ) ) : max;
		}, 0 );
	}

	return { get, compute, invalidate, refresh };
} )();

export default ColumnWidthManager;