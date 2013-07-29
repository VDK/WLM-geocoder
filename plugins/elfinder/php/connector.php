<?php

//Force admin rights.
try{

	//Tell TX who we are.
	define('WHOAMI', 'elFinder 2.0-rc1');
	
	//Override url_path.
	$url_path = str_replace('/plugins/elfinder/php/connector.php', '', $_SERVER['PHP_SELF']);
	if(isset($url_path[0]) && $url_path[0] === '/'){ //Not an array, but first string character.
	  $url_path = substr($url_path, 1);
	}
	$_SERVER['x-tx-urlpath'] = $url_path;
	
	//Do the validation.
	require('../../../admin/tx-require-admin.php');
	
} catch(\Exception $ex) {
	die('{"error":"'.$ex->getMessage().'"}');
}

error_reporting(0); // Set E_ALL for debuging

//load config files
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderConnector.class.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinder.class.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeDriver.class.php';
include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeLocalFileSystem.class.php';
// Required for MySQL storage connector
// include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeMySQL.class.php';
// Required for FTP connector support
// include_once dirname(__FILE__).DIRECTORY_SEPARATOR.'elFinderVolumeFTP.class.php';


/**
 * Simple function to demonstrate how to control file access using "accessControl" callback.
 * This method will disable accessing files/folders starting from  '.' (dot)
 *
 * @param  string  $attr  attribute name (read|write|locked|hidden)
 * @param  string  $path  file path relative to volume root directory started with directory separator
 * @return bool|null
 **/
function access($attr, $path, $data, $volume) {
	return strpos(basename($path), '.') === 0       // if file/folder begins with '.' (dot)
		? !($attr == 'read' || $attr == 'write')    // set read+write to false, other (locked+hidden) set to true
		:  null;                                    // else elFinder decide it itself
}


$opts = array(
	// 'debug' => true,
	'roots' => array(
		array(
			'driver'        => 'LocalFileSystem',   // driver for accessing file system (REQUIRED)
			'path'          => '../../../files/explorer/',         // path to files (REQUIRED)
			'URL'           => (array_key_exists('HTTPS', $_SERVER) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http').
													'://'.$_SERVER['HTTP_HOST'].
													str_replace('/plugins/elfinder/php/connector.php', '', $_SERVER['PHP_SELF']).
													'/files/explorer/', // URL to files (REQUIRED)
			'accessControl' => 'access'             // disable and hide dot starting files (OPTIONAL)
		)
	)
);

// run elFinder
$connector = new elFinderConnector(new elFinder($opts));
$connector->run();
