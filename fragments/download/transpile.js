// general transpiler for html to langauage

module.exports = function (dsl, $, loc) {

  dsl.mapElement($, loc['title'], 'download.titleType');
  dsl.mapIf($, loc['title'], 'download.title');
  dsl.mapText($, loc['title-text'], 'download.title');
  dsl.mapAttr($, loc['title-text'], 'href', 'download.url');
  dsl.mapIf($, loc['description'], 'download.description');
  dsl.mapRichText($, loc['description'], 'download.description');
  dsl.i18n($, loc['label']);

}