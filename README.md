
ISLANDORA WELLCOME PLAYER
-------------------------
Experimental implementation of the Wellcome player.
More info: http://blog.wellcomelibrary.org/2014/02/open-sourcing-the-library/

TEST OBJECT
-----------
CCITT_1.TIF is a test object, for convience in testing.

CONFIGURATION
-------------
1.) Download and enable the islandora_wellcome module.
2.) Clone the git repo into the islandora_wellcome directory 
    (https://github.com/wellcomelibrary/player).
3.) Follow the instructions in the player git readme here:
    https://github.com/wellcomelibrary/player
    NOTE: Currently, this module is configured to use the 
      release version of the player. Use 'grunt build' in 
      the player directory.
4.) Only the sample document is available. Network access required.

NOTE: This module was tested on i7latest puppet environment. 

Further data model description here: http://player.digirati.co.uk/data-model.html

usefull discussion: https://github.com/jcupitt/libvips/issues/31

install dependencies: 
sudo apt-get install gawk libtiff4-dev libv4l-dev libvpx-dev libtiff4-dev libglib2.0-dev libglib2.0-cil-dev libexif-dev libexif-gtk-dev libmatio-dev gtk-doc-tools libmagick++-dev liborc-0.4-dev libcfitsio3-dev

install vips (v7.30 or greater) (https://launchpad.net/ubuntu/+source/vips)
unzip the vips-7.38.45.tar (ubuntu version) in the data directory, cd into extracted folder and run "sudo make install".

RUNNING
-------
visiting islandora_wellcome/view menu path will load a statically typed object (Be sure to update pid in the .module file with one in your local repo).
A directory called "my_dz_dir_files", with generated dzi image tiles, will be made in the module directory, and a file called "my_dz_dir.dzi". These need to be moved to a temp dir.