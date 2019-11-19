module.exports = {

  mapElement($, selector, field) {
    $(selector).attr('data-sly-element','${'+field+'}');
  },

  mapIf($, selector, field) {
    $(selector).attr('data-sly-test','${'+field+'}');
  },

  mapText($, selector, field) {
    $(selector).text('${'+field+'}');
  },

  mapRichText($, selector, field) {
    $(selector).text('${'+field+' @ context=;QUOT;html;QUOT;}');
  },

  mapAttr($, selector, attribute, value) {
    $(selector).attr(attribute, '${'+value+'}');
  },

  i18n($, selector) {
    const els = $(selector).each( (idx, el) => {
      idx, $(el).text("${;APOS;"+$(el).text()+";APOS; @ i18n}");
    });
  }

}