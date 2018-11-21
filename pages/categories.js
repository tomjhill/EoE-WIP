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

  console.log(params)



  return PC.contentfulClient.getEntries({
    content_type: PC.config.categoryContentTypeId,
    order: 'fields.title'
  })
  .then(function (entries) {


    var query = {}
    if(params.selectedCategoryId) {
      query.categoryId = params.selectedCategoryId
    }




    function isSelectedCategory(entries) {
      if(params.selectedCategoryId) {
        return entries.sys.id === params.selectedCategoryId;
      }
    }


    var selectedCategory = (entries.items.find(isSelectedCategory));




    return PC.pages.elements.renderHTML(query)
    .then(function (elementsHTML) {
      console.log(query)
      return renderCategoryListPage(entries.items, elementsHTML, selectedCategory )
    })





  })


}

PC.pages.categories.postRender = function (category, element) {

console.log("herewego" + category + element)

  return PC.pages.examples.renderHTML(category, element)
  .then(function (entries) {
    injectInPage(entries)

  })

  function injectInPage (HTMLContent) {
    PC.examples.innerHTML = HTMLContent
  }

}








function renderCategoryListPage(categories, elementsHTML, selectedCategory ) {


  return '<div class="categories">' +
      '<ul class="categories-list">' + renderCategoryList(categories) + '</ul>' +
      '<div class="elements-list">' + renderSelectedCategory(selectedCategory) + elementsHTML +'</div>'+'</div>' +
    '<div class="examples-list"></div>'+
  '</div>'
}




function renderCategoryList(categories) {
  return '<li><a href="categories" data-nav>All</a></li>'+
    categories.map(function (category) {
      var fields = category.fields
      return '<li>' +
        '<a href="#category/' + category.sys.id + '" data-nav>' + fields.title + '</a>' +
        '</li>'
    }).join('\n')
}

function renderSelectedCategory(selectedCategory) {
  if(selectedCategory) {

    return '<div class ="selected-category"> <div class="category-background">' + selectedCategory.fields.background + '</div> <div class="selectedelementinfo"><h2 href="categories/' + selectedCategory.fields.title + '" data-nav>' + selectedCategory.fields.title + '</h2>'+
    '<p>' +  selectedCategory.fields.description + '</p></div></div>'



  }
}



}());
