(function () {

PC.pages.elements = {}

/**
 * Renders the elements list page
 *
 * The elements list page can optionally be filtered by a category, and will
 * then only show elements from that category. This is only used from the
 * categories page, in order to render lists of elements with only elements
 * from a selected category.
 */

PC.pages.elements.renderHTML = function (params) {


  var query = {
    content_type: PC.config.elementContentTypeId
  }

  if (params && params.categoryId) {
    query['fields.categories.sys.id[in]'] = params.categoryId
  }

  return PC.contentfulClient.getEntries(query)

  .then(function (entries) {
    return renderElements(entries.items)

  })





}




function renderElements(elements) {
  return '<h1 class="category-title">Elements</h1>' +
    '<div class="elements">' +
    elements.map(renderSingleElement).join('\n') +
    '</div>'
}

function renderSingleElement(element) {
  var fields = element.fields
  return '<div class="element-in-list">' +
    '<div class="element-details">' +
      renderElementDetails(fields) +
    '</div>' +
  '</div>'
}

function renderElementDetails(fields) {
  return renderElementHeader(fields)

}

function renderElementHeader(fields) {
  return '<div class="element-header">' +
    '<h2>' +
      '<a href="element/' + fields.description + '" data-nav>' +
        fields.name +
      '</a>'+
    '</h2>' +
  '</div>'
}

function renderImage(image, caption) {
  if(image && image.fields.file) {
    return '<a href="element/' + caption + '" data-nav>' +
      '<img src="' + image.fields.file.url + '" width="150" height="150" />' +
    '</a>'
  } else {
    return ''
  }
}

function changeText()
{
 document.getElementById('category-title').innerHTML = 'Fred Flinstone';
}

}());
