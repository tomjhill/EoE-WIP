(function () {

PC.pages.category = {}

/**
 * Renders the elements list page
 *
 * The elements list page can optionally be filtered by a category, and will
 * then only show elements from that category. This is only used from the
 * categories page, in order to render lists of elements with only elements
 * from a selected category.
 */


PC.pages.category.renderHTML = function (params) {

console.log(params.categoryId)


  var query = {
    content_type: PC.config.categoryContentTypeId
  }

  if (params && params.categoryId) {
    query['fields.categories.sys.id[in]'] = params.categoryId
  }

  return PC.contentfulClient.getEntries(query)

  .then(function (entries) {
    return renderElements(entries.items)

  })

}

function renderElements(category) {
  return '<h1 class="category-title">Elements</h1>' +
    '<div class="elements">' +
    category.map(renderSingleElement).join('\n') +
    '</div>'
}



}());
