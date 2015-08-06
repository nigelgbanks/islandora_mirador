## Introduction

This module was created as a proof of concept. Not as of yet integrated into islandora. The sample object is pulled from Stanford, so it may not alwasy be available.
Metadata should still be available.

## Requirements
  We will need an IIIF compatible image server to complete the integration. djatoka will do the job, but we will need to add to its functionality to pull
  content from it (IIIF translations on djatoka urls). This has not been tested yet, but internal testing has shown it can be done.
  Check out https://github.com/jronallo/djatoka for what was used to successfully pull this off.

## Installation
 
Install as usual, see [this](https://drupal.org/documentation/install/modules-themes/modules-7) for further information.
The sample object (pulled from Stanford University) can be viewed by navigating to {site}/islandora_mirador/view/islandora%3Aroot.


## References

Check out this link for more information on the image format, available viewers and image servers:
  http://iiif.io/apps-demos.html