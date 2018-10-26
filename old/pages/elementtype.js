(function () {

PC.pages.elementtype = {}

/**
 * Renders the categories list page
 *
 * The categories list first gets a list of all existing categories,
 * then uses the products page method to render that same code but only
 * with products from the selected category.
 * If no selected category exists, the first from the list is used.
 */
PC.pages.elementtype.renderHTML = function (params) {
  return PC.contentfulClient.getEntries({
    content_type: PC.config.elementtypeContentTypeId
  })
  .then(function (entries) {
    var query = {}
    if(params.selectedElementtypeId) {
      query.elementtypeId = params.selectedElementtypeId
    }
    return PC.pages.elements.renderHTML(query)
    .then(function (elementsHTML) {
      return renderElementtypeListPage(entries.items, elementsHTML)
    })
  })
}

function renderElementtypeListPage(elementtypes, elementsHTML) {
  return '<div class="categories">' +
      '<ul class="categories-list">' + renderElementtypeList(elementtypes) + '</ul>' +
      '<div>' + elementsHTML + '</div>' +
    '</div>'
}

function renderElementtypeList(elementtypes) {
  return '<li><a href="categories" data-nav>All</a></li>'+
    elementtype.map(function (elementtypes) {
      var fields = elementtype.fields
      return '<li>' +
        '<img src="' + fields.icon.fields.file.url + '" width="20" height="20" alt="' + fields.categoryDescription + '" title="' + fields.categoryDescription + '" />' +
        '<a href="categories/' + elementtype.sys.id + '" data-nav>' + fields.title + '</a>' +
        '</li>'
    }).join('\n')
}

}());
