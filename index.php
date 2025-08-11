<!DOCTYPE html>
<html lang="en">
<head>
	<style>
		table {
			border-collapse: collapse;
		}

		th, td {
			border: 1px solid #ccc;
			padding: 4px 8px;
			text-align: left;
			white-space: nowrap;
			overflow: hidden;
			background-color: #fff;
			font-family: sans-serif;
			font-size: 14px;
		}

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
	</style>
</head>
<body>

<h2>Editable Table</h2>

<table id="editable-table">
	<thead>
		<tr>
			<th>ID</th>
			<th>Word</th>
			<th>Description</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>1023</td>
			<td>Alpha</td>
			<td>This is a short description.</td>
			<td><button class="edit-btn">Edit</button></td>
		</tr>
		<tr>
			<td>847</td>
			<td>Beta</td>
			<td>Another brief line of text here.</td>
			<td><button class="edit-btn">Edit</button></td>
		</tr>
		<tr>
			<td>3921</td>
			<td>Gamma</td>
			<td>Yet another concise description.</td>
			<td><button class="edit-btn">Edit</button></td>
		</tr>
	</tbody>
</table>

<script>
  // Attach click listener to each table
  document.querySelectorAll( 'table' ).forEach( function( table ) {
    table.addEventListener( 'click', function( event ) {
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
      }
    } );
  } );

  // Replace first 3 cells in row with styled inputs
  function enterEditMode( row ) {
    row.classList.add( 'editing' );
    const cells = row.querySelectorAll( 'td' );

    for( let i = 0; i < 3; i++ ) {
      const cell = cells[i];
      const value = cell.textContent;
      const width = measureTextWidth( value, cell );
      const style = getComputedStyle( cell );

      // Inline input with matched font and measured width
      cell.innerHTML = `<input type="text" value="${value}" style="
        width:${width}px;
        box-sizing: content-box;
        padding: 0;
        border: none;
        font: ${style.font};
        letter-spacing: ${style.letterSpacing};
      " />`;
    }
  }

  // Replace inputs with their values
  function exitEditMode( row ) {
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
  function updateButtonState( button, label, removeClass, addClass ) {
    button.textContent = label;
    button.classList.remove( removeClass );
    button.classList.add( addClass );
  }

  // Measure pixel width of text using hidden span
  function measureTextWidth( text, referenceCell ) {
    const span = document.createElement( 'span' );
    span.textContent = text;
    span.style.visibility = 'hidden';
    span.style.whiteSpace = 'nowrap';

    // Match font styling to reference cell
    const style = getComputedStyle( referenceCell );
    span.style.font = style.font;
    span.style.fontSize = style.fontSize;
    span.style.fontFamily = style.fontFamily;
    span.style.letterSpacing = style.letterSpacing;

    document.body.appendChild( span );
    const width = span.getBoundingClientRect().width;
    document.body.removeChild( span );

    return width;
  }
</script>

</body>
</html>