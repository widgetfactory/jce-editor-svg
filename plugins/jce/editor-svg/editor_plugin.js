/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2017 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
(function () {
    var each = tinymce.each,
        extend = tinymce.extend,
        Node = tinymce.html.Node;

    // list of SVG tags
    var tags = [
        'defs','pattern','desc','metadata','g','mask','path','line','marker','rect','circle','ellipse','polygon','polyline','linearGradient','radialGradient','stop','image','view','text','textPath','title','tspan','glyph','symbol','switch','use'
    ];

    tinymce.create('tinymce.plugins.SvgPlugin', {
        init: function (ed, url) {
            var self = this;
            this.editor = ed;

            ed.onPreInit.add(function () {
                ed.schema.addValidElements('+svg[*]');

                each(tags, function (v, k) {
                    ed.schema.addValidElements(v + '[*]');
                });

                ed.schema.addValidChildren('svg[' + tags.join(',') + ']');
            });

            // Cleanup callback
            ed.onBeforeSetContent.add(function (ed, o) {
                o.content = o.content.replace(/<\/svg>/g, '&nbsp;</svg>');
            });

            // Cleanup callback
            ed.onPostProcess.add(function (ed, o) {
                o.content = o.content.replace(/(&nbsp;|\u00a0)<\/svg>/g, '</svg>');
            });
        }
    });

    // Register plugin
    tinymce.PluginManager.add('svg', tinymce.plugins.SvgPlugin);
})();
