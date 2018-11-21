(function () {

PC.utils = {}

/**
 * Renders the elements list page
 *
 * The elements list page can optionally be filtered by a category, and will
 * then only show elements from that category. This is only used from the
 * categories page, in order to render lists of elements with only elements
 * from a selected category.
 */

PC.utils.grabCategories = function () {
  var query = {
    order: 'fields.title',
    content_type: PC.config.categoryContentTypeId
  }
  return PC.contentfulClient.getEntries(query)

  .then(function (entries) {
   console.log(entries.items)
   return retrievedCategories = entries.items
  })
}

PC.utils.grabElements = function () {
  var query = {
    limit: 300,
    order: 'fields.name',
    content_type: PC.config.elementContentTypeId
  }
  return PC.contentfulClient.getEntries(query)

  .then(function (entries) {
   console.log(entries.items)
   return retrievedElements = entries.items
  })
}

PC.utils.grabExamples = function () {
  var query = {
    limit: 100,
    order: 'sys.createdAt',
    content_type: PC.config.exampleContentTypeId
  }
  return PC.contentfulClient.getEntries(query)

  .then(function (entries) {
   console.log(entries.items)
   return retrievedExamples = entries.items
  })
}


}());
