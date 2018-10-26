(function () {

PC.pages.elements = {}

/**
 * Renders the products list page
 *
 * The products list page can optionally be filtered by a category, and will
 * then only show products from that category. This is only used from the
 * categories page, in order to render lists of products with only products
 * from a selected category.
 */

PC.pages.elements.renderHTML = function (params) {
  var query = {
    content_type: PC.config.elementContentTypeId
  }

  if (params && params.elementtypeId) {
    query['fields.elementtypes.sys.id[in]'] = params.elementtypeId
  }

  return PC.contentfulClient.getEntries(query)
  .then(function (entries) {
    return renderElements(entries.items)
  })
}

function renderElements(elements) {
  return '<h1>elements</h1>' +
    '<div class="elements">' +
    elements.map(renderSingleElement).join('\n') +
    '</div>'
}

function renderSingleElement(element) {
  var fields = element.fields
  return '<div class="product-in-list">' +
    '<div class="product-image">' +
      renderImage(fields.images[0], fields.caption) +
    '</div>' +
    '<div class="product-details">' +
      renderElementDetails(fields) +
    '</div>' +
  '</div>'
}

function renderElementDetails(fields) {
  return renderElementHeader(fields) +
    '<p class="product-categories">' +
    // fields.elementtypes.map(function (elementtypes) {
    //   return elementtypes.fields.title
    // }).join(', ') +
    '</p>' +
    PC.utils.truncate(marked(fields.caption), 100) +
    '<p>' + fields.price + ' &euro;</p>'
}

function renderElementHeader(fields) {
  return '<div class="product-header">' +
    '<h2>' +
      '<a href="product/' + fields.caption + '" data-nav>' +
        fields.elementtype +
      '</a>'+
    '</h2>' +
'</div>'
}

function renderImage(images, slug) {
  if(images && images.fields.file) {
    return '<a href="element/' + slug + '" data-nav>' +
      '<img src="' + images.fields.file.url + '" width="150" height="150" />' +
    '</a>'
  } else {
    return ''
  }
}

}());
