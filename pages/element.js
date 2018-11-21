(function () {

PC.pages.element = {}

/**
 * Renders the individual brand page
 */

PC.pages.element.renderHTML = function (params) {


  console.log(params.selectedElementId)


  return PC.contentfulClient.getEntries({
    content_type: PC.config.elementContentTypeId,
    order: 'fields.name',
  })
  .then(function (entries) {
    var query = {}
    if(params.selectedElementId) {
      query.elementId = params.selectedElementId


    }




    function isSelectedElement(entries) {
      if(params.selectedElementId) {
        return entries.sys.id === params.selectedElementId;
      }

  }


    var selectedElement = (entries.items.find(isSelectedElement));
  // { name: 'cherries', quantity: 5 }





    return PC.pages.elements.renderHTML(query)
    .then(function (elementsHTML) {
      return renderCategoryListPage(entries.items, elementsHTML, selectedCategory )
    })




  })





}




function renderSingleElement(element) {
  var fields = element.fields
  return '<div class="brand">' +
    '<h2>' + fields.name+ '</h2>'
  '</div>'
}



}());
