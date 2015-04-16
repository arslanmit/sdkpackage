ApsContent = function () {
	var that = {
		"spec" : 
{
  "checkboxExample": {
    "onSet": "flattenData",
    "opts": {
      "apsControl": "checkbox",
      "cat": "Data",
      "desc": "Ignore Totals",
      "tooltip": "Whether to ignore totals",
      "ztlFunction": "",
      "ztlType": "boolean"
    },
    "type": "boolean",
    "value": true,
    "visible": true
  },
  "checkboxOnlyGetterExample": {
    "opts": {
      "apsControl": "checkbox",
      "cat": "Data",
      "desc": "Ignore Totals",
      "tooltip": "Whether to ignore totals (only getter)",
      "ztlFunction": "-get",
      "ztlType": "boolean"
    },
    "type": "boolean",
    "value": true,
    "visible": true
  },
  "colorExample": {
    "opts": {
      "apsControl": "color",
      "cat": "Data",
      "desc": "Simple Color",
      "tooltip": "A color",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "type": "Color",
    "value": "",
    "visible": true
  },
  "comboboxExample": {
    "opts": {
      "apsControl": "combobox",
      "cat": "Data",
      "desc": "Simple Choice",
      "options": [
        {
          "key": "quantile",
          "text": "Quantile"
        },
        {
          "key": "quantize",
          "text": "Quantize"
        }
      ],
      "tooltip": "Any choice",
      "ztlFunction": "",
      "ztlType": "choice"
    },
    "type": "String",
    "value": "quantile",
    "visible": true
  },
  "data": {
    "onChange": "flattenData",
    "opts": {
      "cat": "Data",
      "desc": "Data",
      "noAps": true,
      "noZtl": true,
      "tooltip": "Data from datasource",
      "type": "data",
      "value": null,
      "ztlFunction": ""
    },
    "type": "ResultSet",
    "value": "null",
    "visible": true
  },
  "paletteExample": {
    "opts": {
      "apsControl": "palette",
      "cat": "Data",
      "desc": "Color Palette",
      "tooltip": "A palette",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "type": "String",
    "value": "",
    "visible": true
  },
  "spinnerExample": {
    "opts": {
      "apsControl": "spinner",
      "cat": "Data",
      "desc": "Some numbers",
      "tooltip": "Add some numbers",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "type": "int",
    "value": "",
    "visible": true
  },
  "textExample": {
    "opts": {
      "apsControl": "text",
      "cat": "Data",
      "desc": "A saple text",
      "tooltip": "Place some text conent",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "type": "String",
    "value": "initial",
    "visible": true
  }
}, 
		"aboutSpec" : 
{
  "checkboxExample": {
    "onSet": "flattenData",
    "opts": {
      "apsControl": "checkbox",
      "cat": "Data",
      "desc": "Ignore Totals",
      "tooltip": "Whether to ignore totals",
      "ztlFunction": "",
      "ztlType": "boolean"
    },
    "type": "boolean",
    "value": true,
    "visible": true
  },
  "checkboxOnlyGetterExample": {
    "opts": {
      "apsControl": "checkbox",
      "cat": "Data",
      "desc": "Ignore Totals",
      "tooltip": "Whether to ignore totals (only getter)",
      "ztlFunction": "-get",
      "ztlType": "boolean"
    },
    "type": "boolean",
    "value": true,
    "visible": true
  },
  "colorExample": {
    "opts": {
      "apsControl": "color",
      "cat": "Data",
      "desc": "Simple Color",
      "tooltip": "A color",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "type": "Color",
    "value": "",
    "visible": true
  },
  "comboboxExample": {
    "opts": {
      "apsControl": "combobox",
      "cat": "Data",
      "desc": "Simple Choice",
      "options": [
        {
          "key": "quantile",
          "text": "Quantile"
        },
        {
          "key": "quantize",
          "text": "Quantize"
        }
      ],
      "tooltip": "Any choice",
      "ztlFunction": "",
      "ztlType": "choice"
    },
    "type": "String",
    "value": "quantile",
    "visible": true
  },
  "data": {
    "onChange": "flattenData",
    "opts": {
      "cat": "Data",
      "desc": "Data",
      "noAps": true,
      "noZtl": true,
      "tooltip": "Data from datasource",
      "type": "data",
      "value": null,
      "ztlFunction": ""
    },
    "type": "ResultSet",
    "value": "null",
    "visible": true
  },
  "paletteExample": {
    "opts": {
      "apsControl": "palette",
      "cat": "Data",
      "desc": "Color Palette",
      "tooltip": "A palette",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "type": "String",
    "value": "",
    "visible": true
  },
  "spinnerExample": {
    "opts": {
      "apsControl": "spinner",
      "cat": "Data",
      "desc": "Some numbers",
      "tooltip": "Add some numbers",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "type": "int",
    "value": "",
    "visible": true
  },
  "textExample": {
    "opts": {
      "apsControl": "text",
      "cat": "Data",
      "desc": "A saple text",
      "tooltip": "Place some text conent",
      "ztlFunction": "",
      "ztlType": "String"
    },
    "type": "String",
    "value": "initial",
    "visible": true
  }
}
	};

	org_scn_community_component_Core(that, that.spec);

	that.componentInfo.title = that.aboutSpec.title;
    that.componentInfo.description = that.aboutSpec.description;

    for(var index in that.aboutSpec.topics) {
    	that.componentInfo.topics.push(that.aboutSpec.topics[index]);
    }
    
	return that;
};