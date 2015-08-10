/*jshint browser: true*/
/*global jQuery, Drupal*/
/**
 * @file
 * Loads the CWRC-Writer.
 *
Drupal.Mirador = Drupal.Mirador || {};
(function ($) {
  'use strict';

  Drupal.behaviors.mirador = {
    attach: function (context, settings) {
      $(function() {
	Mirador({
          'id': 'viewer',
          'layout': '1x1',
          'data': [
	    // This array holds the manifest URIs for the IIIF resources you want Mirador to make available to the user.
            // Each manifest object must have a manifest URI pointing to a valid IIIF manifest, and may also
            // provide a location to be displayed in the listing of available manifests.
            { "manifestUri": "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/manifest.json", "location": "Stanford University"},
            { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:48309543", "location": "Harvard University"},
            { "manifestUri": "http://dms-data.stanford.edu/data/manifests/Stanford/ege1/manifest.json", "location": "Stanford University"},
            { "manifestUri": "http://dms-data.stanford.edu/data/manifests/BnF/jr903ng8662/manifest.json ", "location": "Stanford University"},
            { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/Admont23", "location": "Yale University"},
            { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093", "location": "Harvard University"},
            { "manifestUri": "http://dams.llgc.org.uk/iiif/4574752/manifest.json", "location": "National Library of Wales"},
            { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/via:olvwork576793", "location": "Harvard University"},
            { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/Admont43", "location": "Yale University"},
            { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/BeineckeMS10", "location": "Yale University"},
            { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/BodleianMSBodley113", "location": "Yale University"},
            { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b84539771/manifest.json", "location":'BnF' },
            { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b10500687r/manifest.json", "location": 'BnF'},
            { "manifestUri": "http://www.e-codices.unifr.ch/metadata/iiif/sl-0002/manifest.json", "location": 'e-codices'},
            { "manifestUri": "http://www.e-codices.unifr.ch/metadata/iiif/bge-cl0015/manifest.json", "location": 'e-codices'}
          ],
          'windowObjects': []
	});
      });
    }
  }
}(jQuery));

*/
jQuery(document).ready(function() {
	Mirador({
          'id': 'viewer',
          'layout': '1x1',
          'data': [
	    // This array holds the manifest URIs for the IIIF resources you want Mirador to make available to the user.
            // Each manifest object must have a manifest URI pointing to a valid IIIF manifest, and may also
            // provide a location to be displayed in the listing of available manifests.
            { "manifestUri": "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/manifest.json", "location": "Stanford University"},
            { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:48309543", "location": "Harvard University"},
            { "manifestUri": "http://dms-data.stanford.edu/data/manifests/Stanford/ege1/manifest.json", "location": "Stanford University"},
            { "manifestUri": "http://dms-data.stanford.edu/data/manifests/BnF/jr903ng8662/manifest.json ", "location": "Stanford University"},
            { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/Admont23", "location": "Yale University"},
            { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093", "location": "Harvard University"},
            { "manifestUri": "http://dams.llgc.org.uk/iiif/4574752/manifest.json", "location": "National Library of Wales"},
            { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/via:olvwork576793", "location": "Harvard University"},
            { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/Admont43", "location": "Yale University"},
            { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/BeineckeMS10", "location": "Yale University"},
            { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/BodleianMSBodley113", "location": "Yale University"},
            { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b84539771/manifest.json", "location":'BnF' },
            { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b10500687r/manifest.json", "location": 'BnF'},
            { "manifestUri": "http://www.e-codices.unifr.ch/metadata/iiif/sl-0002/manifest.json", "location": 'e-codices'},
            { "manifestUri": "http://www.e-codices.unifr.ch/metadata/iiif/bge-cl0015/manifest.json", "location": 'e-codices'}
          ],
          'windowObjects': []
	});
});
