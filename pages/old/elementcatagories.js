(function () {

PC.pages.categories = {}

/**
 * Renders the categories list page
 *
 * The categories list first gets a list of all existing categories,
 * then uses the elements page method to render that same code but only
 * with elements from the selected category.
 * If no selected category exists, the first from the list is used.
 */
PC.pages.categories.renderHTML = function (params) {
  return PC.contentfulClient.getEntries({
    content_type: PC.config.categoryContentTypeId
  })
  .then(function (entries) {
    var query = {}
    if(params.selectedCategoryId) {
      query.categoryId = params.selectedCategoryId
    }
    return PC.pages.elements.renderHTML(query)
    .then(function (elementsHTML) {
      return renderCategoryListPage(entries.items, elementsHTML)
    })
  })
}

function renderCategoryListPage(categories, elementsHTML) {
  return '<div class="categories">' +
      '<ul class="categories-list">' + renderCategoryList(categories) + '</ul>' +
      '<div>' + elementsHTML + '</div>' +
    '</div>'
}

function renderCategoryList(categories) {
  return '<li><a href="categories" data-nav>All</a></li>'+
    categories.map(function (category) {
      var fields = category.fields
      return '<li>' +
        '<a href="categories/' + category.sys.id + '" data-nav>' + fields.title + '</a>' +
        '</li>'
    }).join('\n')
}

}());
