<?php

/**
 * @file
 * This is the template file for the object page for islandora_wellcome
 */
?>
<?php print $base_path; ?>/islandora_wellcome/data_uri
<div class="wellcomePlayer" data-config="/<?php print $path; ?>/player_viewer/src/examples/examples-config.js" data-uri="<?php print $base_path; ?>/islandora_wellcome/data_uri" style="width:100%; height:480px; background-color: #000"></div>
<script type="text/javascript" id="embedWellcomePlayer" src="/<?php print $path; ?>/player_viewer/src/js/embed.js"></script>
<script type="text/javascript">/* wordpress fix */</script>