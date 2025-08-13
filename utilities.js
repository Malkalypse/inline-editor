// Attach live width sync to input based on its text content
export function autoSizeInput( input, minWidth ) {

  // Measure width using hidden span with matched font
  function updateWidth() {
    const width = measureSpanWidth( input.value, input );
    input.style.width = Math.max( width, minWidth ) + 'px';
  }
  input.addEventListener( 'input', updateWidth );
  updateWidth();
}

// Measure pixel width of text using hidden span
export function measureSpanWidth( text, el ) {
  const span = document.createElement( 'span' );
  span.textContent = text;
  span.style.visibility = 'hidden';
  span.style.whiteSpace = 'nowrap';

  // Match font styling to reference cell
  const style = getComputedStyle( el );
  span.style.font = style.font;
  span.style.fontSize = style.fontSize;
  span.style.fontFamily = style.fontFamily;
  span.style.letterSpacing = style.letterSpacing;

  document.body.appendChild( span );
  const width = span.getBoundingClientRect().width;
  document.body.removeChild( span );

  return width;
}