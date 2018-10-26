(function () {

PC.pages.examples = {}

/**
 * Renders the elements list page
 *
 * The elements list page can optionally be filtered by a category, and will
 * then only show elements from that category. This is only used from the
 * categories page, in order to render lists of elements with only elements
 * from a selected category.
 */

PC.pages.examples.renderHTML = function (params) {


  var query = {
    content_type: PC.config.exampleContentTypeId
  }

  if (params && params.elementId) {

    query['fields.element.sys.id[in]'] = params.elementId

  }

  return PC.contentfulClient.getEntries(query)
  .then(function (entries) {
    console.log(entries)
    return renderExamples(entries.items)


  })






}

function renderCategoryTitle(examples) {
  return '<h1 class="category-title">Examples</h1>' +
    '<div class="examples">' +
    examples.map(renderSingleExample).join('\n') +
    '</div>'
}


function renderExamples(examples) {
  return '<div class="examples">' +
    examples.map(renderSingleExample).join('\n') +
    '</div>'
}

function renderSingleExample(example) {
  var fields = example.fields
  return '<div class="example-in-list">' +
    '<div class="example-details">' +
      renderExampleDetails(fields) +
    '</div>' +
  '</div>'
}

function renderExampleDetails(fields) {
  return renderExampleHeader(fields)

}

function renderExampleHeader(fields) {
  return '<div class="example-header">' +
    '<h2>' +
      '<a href="example/' + fields.description + '" data-nav>' +
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



}());
