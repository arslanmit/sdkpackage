/**
 * Copyright 2014 Scn Community Contributors
 * 
 * Original Source Code Location:
 *  https://github.com/org-scn-design-studio-community/sdkpackage/
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at 
 *  
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 * See the License for the specific language governing permissions and 
 * limitations under the License. 
 */
var org_scn_community_basics = org_scn_community_basics || {};
var org_scn_community_require = org_scn_community_require || {};

/* IMPORTANT! ORIGINAL LOCATION - basics/res */

//set the version to assure cache is cleared
/*NO DELTA CHECK START*/org_scn_community_require.jsVersion = /*%TIMESTAMP-START%*/"2015-5-29"/*%TIMESTAMP-END%*/;/*NO DELTA CHECK END*/

var org_scn_community_components = org_scn_community_components || {};
org_scn_community_components.basics = org_scn_community_components.basics || {};
org_scn_community_components.databound = org_scn_community_components.databound || {};
org_scn_community_components.prototypes = org_scn_community_components.prototypes || {};
org_scn_community_components.utils = org_scn_community_components.utils || {};

(function() {
	
	org_scn_community_basics.readOwnScriptAccess = function(scriptSrc, componentFullName) {
		var packageAndName = componentFullName.substring("org.scn.community.".length);
		var componentName = packageAndName.substring(packageAndName.indexOf(".") + 1);
		var packageName = packageAndName.substring(0, packageAndName.indexOf("."));
		return org_scn_community_basics.readGenericScriptAccess(scriptSrc, "res/"+componentName+"/", packageName);
	};

	org_scn_community_basics.readGenericScriptAccess = function(scriptSrc, sctiptPath, packageName) {

		var myPluginSuffix = "org.scn.community."
		if(packageName != "") {
			packageName = myPluginSuffix+packageName;	
		}
		
		if(packageName == "") {
			packageName = myPluginSuffix+"basics";	
		}

		// this is in case 1.4
		if(scriptSrc && sap.zen.createStaticSdkMimeUrl == undefined) {
			var mainSDKPath = "";
			var ownScriptPath = "";

			var mainScriptPathIndex = scriptSrc.indexOf(sctiptPath);
			var mainSDKPathIndex = scriptSrc.indexOf(myPluginSuffix);

			mainSDKPath = scriptSrc.substring(0, mainSDKPathIndex);
			ownScriptPath = scriptSrc.substring(0, mainScriptPathIndex) + sctiptPath;

			return {
				myScriptPath : ownScriptPath,					// http://localhost:9091/aad/zen/mimes/sdk_include/org.scn.community.<packageName>/res/<component-name>/
				myPackagePath: mainSDKPath + myPluginSuffix, 	// http://localhost:9091/aad/zen/mimes/sdk_include/org.scn.community.<packageName>/
				mainSDKPath : mainSDKPath						// http://localhost:9091/aad/zen/mimes/sdk_include/
			};
		}
		
		// 1.5 api
		if(sap.zen.createStaticSdkMimeUrl != undefined) {
			var ownScriptPath = sap.zen.createStaticSdkMimeUrl(packageName, sctiptPath);
			var mainPluginPath = sap.zen.createStaticSdkMimeUrl(packageName, "");
			var mainSDKPath = sap.zen.createStaticSdkMimeUrl("", "").replace("//", "/");
			
			return {
				myScriptPath : ownScriptPath,					// http://localhost:9091/aad/zen/mimes/sdk_include/org.scn.community.<packageName>/res/<component-name>/
				myPackagePath: mainPluginPath, 					// http://localhost:9091/aad/zen/mimes/sdk_include/org.scn.community.<packageName>/
				mainSDKPath : mainSDKPath						// http://localhost:9091/aad/zen/mimes/sdk_include/
			};
		}
		
		return {
			// temporary hack for local mode in 1.5 release
			myScriptPath: "/aad/zen/mimes/sdk_include/org.scn.community."+packageName+"/" + sctiptPath + "/",
			myPackagePath: "/aad/zen/mimes/sdk_include/org.scn.community."+packageName+"/",
	 		mainSDKPath: "/aad/zen/mimes/sdk_include/"
	 	};
	};

	/** code for recognition of script path */
	var myScript = $("script:last")[0].src;
	org_scn_community_require.scriptInfo = org_scn_community_basics.readGenericScriptAccess(myScript, "res", "");

	org_scn_community_require.knownModules = {
			common_basics: {
				name: "common_basics",
				script: "org.scn.community.basics/res/common_basics",
				min: false
			},
			common_databound: {
				name: "common_databound",
				script: "org.scn.community.databound/res/common_databound",
				min: false
			},
			component_core: {
				name: "component_core",
				script: "org.scn.community.basics/aps/org.scn.community.component.Core",
				min: false
			},
			generic_aps: {
				name: "generic_aps",
				script: "org.scn.community.basics/aps/org.scn.community.generic.PropertyPage",
				min: false
			},
			generic_aps_ui5: {
				name: "generic_aps_ui5",
				script: "org.scn.community.basics/aps/org.scn.community.ui5.extensions",
				min: false
			},	
			generic_aps_arrays: {
				name: "generic_aps_arrays",
				script: "org.scn.community.basics/aps/org.scn.community.ui5.extensions.arrays",
				min: false
			},	
			chartjs: {
				name: "chartjs",
				script: "org.scn.community.databound/os/chartjs/Chart",
				min: true
			},
			scheme: {
				name: "scheme",
				script: "org.scn.community.databound/os/color/scheme",
				min: true
			},
			jshashtable: {
				name: "jshashtable",
				script: "org.scn.community.basics/os/jshashtable/jshashtable",
				min: true
			},
			numberformatter: {
				name: "numberformatter",
				script: "org.scn.community.basics/os/numberformat/numberformatter",
				min: true
			},
			dateformatter: {
				name: "dateformatter",
				script: "org.scn.community.basics/os/date/DateFormat",
				min: false
			},
	};
	
	org_scn_community_require.d3Modules = {
			d3: {
				name: "d3/d3",
				script: "org.scn.community.basics/os/d3/d3",
				min: true
			},
			d3plug_gantt: {
				name: "d3/d3plug_gantt",
				script: "org.scn.community.basics/os/d3-plug/gantt-chart-d3v2",
				min: false
			},
	};
	
	org_scn_community_require.knownComponents = org_scn_community_require.knownComponents || {};
	org_scn_community_require.knownComponents.basics = org_scn_community_require.knownComponents.basics || {};
	org_scn_community_require.knownComponents.databound = org_scn_community_require.knownComponents.databound || {};
	org_scn_community_require.knownComponents.prototypes = org_scn_community_require.knownComponents.prototypes || {};
	org_scn_community_require.knownComponents.utils = org_scn_community_require.knownComponents.utils || {};
	
	org_scn_community_require.collectRequire = function (arrayOfRequires) {
		
		org_scn_community_require.loadMinWHerePossible = true;
		
		var retObject = {};
		
		var plainNames = [];
		var plainScripts = [];
		var moduleList = [];
		var definition = {};
		
	    for (var iC = 0; iC < arrayOfRequires.length; iC++) {
	    	var requireKey = arrayOfRequires[iC];
	    	
	    	var requireDefinition = org_scn_community_require.knownModules[requireKey];
	    	
	    	if(!requireDefinition && requireKey.indexOf(".") > -1) {
	    		var packageName = requireKey.substring(0, requireKey.indexOf("."));
	    		var componentName = requireKey.substring(requireKey.indexOf(".")+1);
	    		
	    		requireDefinition = org_scn_community_require.knownComponents[packageName][componentName];
	    		requireKey = requireKey.replace(".", "");
	    		requireKey = requireKey.toLowerCase();
	    	}
	    	
	    	if(!requireDefinition && requireKey.indexOf("/") > -1) {
	    		var packageName = requireKey.substring(0, requireKey.indexOf("/"));
	    		var moduleName = requireKey.substring(requireKey.indexOf("/")+1);
	    		
	    		requireDefinition = org_scn_community_require[packageName + "Modules"][moduleName];
	    		requireKey = requireKey.replace(".", "");
	    		requireKey = requireKey.toLowerCase();
	    	}

	    	var minSuffix = "";
	    	if(org_scn_community_require.loadMinWHerePossible) {
	    		minSuffix = (requireDefinition.min?"-min":"");	
	    	}

	    	if(requireDefinition) {
	    		plainNames.push(requireKey);
	    		
	    		if(requireDefinition.scriptSpec) {
					plainNames.push(requireKey + "Spec");
					definition[requireKey + "Spec"] = org_scn_community_require.scriptInfo.mainSDKPath + requireDefinition.script + "Spec" + minSuffix;
					plainScripts.push(requireDefinition.scriptSpec);
				}
	    		
	    		definition[requireKey] = org_scn_community_require.scriptInfo.mainSDKPath + requireDefinition.script + minSuffix;
	    		moduleList.push(requireDefinition);
	    		plainScripts.push(requireDefinition.script);
	    	} else {
	    		throw new Error("Unknown SDK Require '" + arrayOfRequires[iC] + "'");
	    	}
	    }
		
	    retObject.plainNames = plainNames;
	    retObject.plainScripts = plainScripts;
	    retObject.moduleList = moduleList;
	    retObject.definition = definition;
	    
		return retObject;
	};
})();