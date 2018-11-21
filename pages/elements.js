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

    content_type: PC.config.elementContentTypeId,
    order: 'fields.name'

  }

  if (params && params.categoryId) {

    query['fields.categories.sys.id[in]'] = params.categoryId

  }




  return PC.contentfulClient.getEntries(query)
  .then(function (entries) {
    return renderElements(entries.items)
  })






}


function renderCategoryTitle(elements) {
  return '<h1 class="category-title">Elements</h1>' +
    '<div class="elements">' +
    elements.map(renderSingleElement).join('\n') +
    '</div>'
}


function renderElements(elements) {
  return '<div class="elements">' +
    elements.map(renderSingleElement).join('\n') +
    '</div>'
}

function renderSingleElement(element) {
  var fields = element.fields
  var elementId = element.sys
  return '<div class="element-in-list">' +
    '<div class="element-details">' +
      renderElementDetails(fields, elementId) +
    '</div>' +
  '</div>'
}

function renderElementDetails(fields, elementId) {
  return renderElementHeader(fields, elementId)

}

function renderElementHeader(fields, elementId) {
  var currentPath = location.pathname.split('/')
  return '<div class="element-header">' +
    '<h2>' +
      '<a href='+ currentPath[1] + '/' + currentPath[2] + '/element/' + elementId.id + ' data-nav>' +
        fields.name +
      '</a>'+
    '</h2>' +
  '</div>'
}


function renderImage(image, caption) {
  var currentPath = location.pathname.split('/')
  if(image && image.fields.file) {
    return '<a href='+ currentPath[1] + '/' + currentPath[2]  + '/element/' + elementId.id + '" data-nav>' +
      '<img src="' + image.fields.file.url + '" width="150" height="150" />' +
    '</a>'
  } else {
    return ''
  }
}



}());
