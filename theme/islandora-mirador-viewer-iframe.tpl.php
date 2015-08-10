<?php
/**
 * @file
 * Returns the a full HTML document for rendering the CWRC-Writer.
 *
 * It's meant only for use within an iFrame. This is meant to be used as a
 * #theme_wrapper for #theme page, it replaces html.tpl.php.
 *
 * Complete documentation of the variables this inherits from html.tpl.php
 * is available online.
 * @see https://drupal.org/node/1728208
 *
 * Variables available:
 * - $scripts: The same as html.tpl.php defines.
 * - $styles: The same as html.tpl.php defines.
 * - $mirador: The rendered page content aka mirador.
 <?php print $styles; ?>
 */
?>
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <link rel="stylesheet" type="text/css" href="sites/all/libraries/mirador/build/mirador/css/mirador-combined.css">
  <title>Mirador Viewer</title>
  <style type="text/css">
    body { padding: 0; margin: 0; overflow: hidden; font-size: 70%; }
    #viewer { background: #333 url(images/debut_dark.png) left top repeat; width: 100%; height: 100%; position: fixed; }
  </style>
</head>
<body>
  <div id="viewer"></div>
  <script src="sites/all/libraries/mirador/build/mirador/mirador.js"></script>
  <script type="text/javascript">
    $(function() {
      Mirador({
        "id": "viewer",
        "layout": "1x1",
        "data": [
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:48309543", "location": "Harvard University"}, // Harvard Scroll
          { "manifestUri": "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/manifest.json", "location": "Stanford University"},
          { "manifestUri": "http://dms-data.stanford.edu/data/manifests/Stanford/ege1/manifest.json", "location": "Stanford University"},
          { "manifestUri": "http://dms-data.stanford.edu/data/manifests/BnF/jr903ng8662/manifest.json ", "location": "Stanford University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/Admont23", "location": "Yale University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093", "location": "Harvard University"},
          { "manifestUri": "http://dams.llgc.org.uk/iiif/4574752/manifest.json", "location": "National Library of Wales"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/via:olvwork576793", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:14033171", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:46909368", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:18259372", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:48331776", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:299843", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:213052", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:169892", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:304136", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:311074", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:200515", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:320161", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:198021", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:165773", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:320567", "location": "Harvard University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/Admont43", "location": "Yale University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/BeineckeMS10", "location": "Yale University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/BodleianMSBodley113", "location": "Yale University"},
          { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b84539771/manifest.json", "location":'BnF' },
          { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b10500687r/manifest.json", "location": 'BnF'},
          { "manifestUri": "http://www.e-codices.unifr.ch/metadata/iiif/sl-0002/manifest.json", "location": 'e-codices'},
          { "manifestUri": "http://www.e-codices.unifr.ch/metadata/iiif/bge-cl0015/manifest.json", "location": 'e-codices'}
        ],
        "windowObjects": []
      });
    });
  </script>
</body>
</html>
<?php
/*
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <title>Mirador</title>
    <?php print $scripts; ?>
    <style type="text/css" media="all">
       @import url("http://localhost:8181/sites/all/libraries/mirador/build/mirador/css/mirador-combined.min.css?nsq5rl");
    </style>
    <style type="text/css">
    body { padding: 0; margin: 0; overflow: hidden; font-size: 70%; }
    #viewer { background: #333 url(images/debut_dark.png) left top repeat; width: 100%; height: 100%; position: fixed; }
  </style>
  </head>
  <body>
  <div id="viewer"></div>
  <script type="text/javascript">
    $(function() {
      Mirador({
        "id": "viewer",
        "layout": "1x1",
        "data": [
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:48309543", "location": "Harvard University"}, // Harvard Scroll
          { "manifestUri": "http://dms-data.stanford.edu/data/manifests/Walters/qm670kv1873/manifest.json", "location": "Stanford University"},
          { "manifestUri": "http://dms-data.stanford.edu/data/manifests/Stanford/ege1/manifest.json", "location": "Stanford University"},
          { "manifestUri": "http://dms-data.stanford.edu/data/manifests/BnF/jr903ng8662/manifest.json ", "location": "Stanford University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/Admont23", "location": "Yale University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:5981093", "location": "Harvard University"},
          { "manifestUri": "http://dams.llgc.org.uk/iiif/4574752/manifest.json", "location": "National Library of Wales"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/via:olvwork576793", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:14033171", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:46909368", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:18259372", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/drs:48331776", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:299843", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:213052", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:169892", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:304136", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:311074", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:200515", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:320161", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:198021", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:165773", "location": "Harvard University"},
          { "manifestUri": "http://oculus-dev.harvardx.harvard.edu/manifests/huam:320567", "location": "Harvard University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/Admont43", "location": "Yale University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/BeineckeMS10", "location": "Yale University"},
          { "manifestUri": "http://manifests.ydc2.yale.edu/manifest/BodleianMSBodley113", "location": "Yale University"},
          { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b84539771/manifest.json", "location":'BnF' },
          { "manifestUri": "http://iiif.biblissima.fr/manifests/ark:/12148/btv1b10500687r/manifest.json", "location": 'BnF'},
          { "manifestUri": "http://www.e-codices.unifr.ch/metadata/iiif/sl-0002/manifest.json", "location": 'e-codices'},
          { "manifestUri": "http://www.e-codices.unifr.ch/metadata/iiif/bge-cl0015/manifest.json", "location": 'e-codices'}
        ],
        "windowObjects": []
      });
    });
  </script>
  </body>
</html>
*/
?>
