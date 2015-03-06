/**
 * Base Visualization Class for use in databound D3 (V3) Visualizations.
 */
org_scn_community_databound_BaseViz.prototype = org_scn_community_databound_Base;
org_scn_community_databound_BaseViz.constructor = org_scn_community_databound_BaseViz;
function org_scn_community_databound_BaseViz(d3, options){
	var that = this;
	this.formatter = d3.format(',.2f');			// Make a DS property
	var properties = {
		styleCSS : { 
			value : "/* CSS */",
			onChange : function(value){
				this.props.styleCSS.value = value.replace(/__n__/g,"\n");
			},
			onSet : function(value){
				return value.replace(/__n__/g,"\r\n");
			},
			opts : {
				desc : "SVG CSS",
				cat : "CSS",
				onSet : true,
				apsControl : "textbox"
			}
		},
		legendOn : { 
			value : true,
			opts : {
				desc : "Show Legend",
				cat : "Legend",
				apsControl : "checkbox"	
			}
		},
		showValues : { 
			value : true,
			opts : {
				desc : "Show Values",
				cat : "Cosmetics",
				apsControl : "checkbox"	
			}
		},
		legendTitle : { 
			value : "Legend",
			opts : {
				desc : "Legend Title",
				cat : "Legend",
				apsControl : "text"
			}
		},
		legendWidth : {
			value : 150,
			opts : {
				desc : "Legend Width",
				cat : "Legend",
				apsControl : "spinner"	
			}
		},
		legendX : {
			value : 0,
			opts : {
				desc : "Legend X Offset",
				cat : "Legend",
				apsControl : "spinner"	
			}
		},
		legendY : {
			value : 0,
			opts : {
				desc : "Legend Y Offset",
				cat : "Legend",
				apsControl : "spinner"	
			}
		},
		makeRoomX : { 
			value : true,
			opts : {
				desc : "Chart Avoids Legend",
				cat : "Legend",
				apsControl : "checkbox"	
			}
		},
		legendScale : {
			value : 1,
			opts : {
				desc : "Legend Scale",
				cat : "Legend",
				apsControl : "spinner"	
			}
		},
		margin : {
			value : 15,
			opts : {
				desc : "Margins",
				cat : "Cosmetics",
				apsControl : "spinner"	
			}
		},
		plotAlpha : {
			value : 95,
			opts : {
				desc : "Plot Alpha (0-100)",
				cat : "Cosmetics",
				apsControl : "spinner"	
			}
		},
		ms : {
			value : 750,
			opts : {
				desc : "Animation Time",
				cat : "Cosmetics",
				apsControl : "spinner"	
			}
		},
		colorPalette :  { 
			value : "#F0F9E8,#CCEBC5,#A8DDB5,#7BCCC4,#43A2CA,#0868AC",
			opts : {
				desc : "Color Palette",
				cat : "Cosmetics",
				apsControl : "palette"	
			}
		},
		selectedColor :  { 
			value : "#000000",
			opts : {
				desc : "Selected Color",
				cat : "Cosmetics",
				apsControl : "color"	
			}
		}
	};
	for(var prop in options) properties[prop] = options[prop];
	org_scn_community_databound_Base.call(this,properties);
	/**
	 * Update Cosmetics
	 */
	this.updateCosmetics = function(){ 
		// Resize main SVG
		this.svg
			.transition().duration(this.ms())
			.attr("width", this.dimensions.width)
			.attr("height", this.dimensions.height);
		this.svgStyle.text(this.styleCSS());
		// Reorient Canvas Group
		this.canvas
			.transition().duration(this.ms())
			.attr("transform", "translate(" + (this.dimensions.margin) + "," + this.dimensions.margin + ")");
		// Reorient Plot Area
		this.plotArea
			.transition().duration(this.ms())
			.attr("transform", "translate(" + (this.dimensions.plotLeft) + "," + this.dimensions.plotTop + ")");
		var legendTransition;
		if(this.legendOn()){
			legendTransition = this.legendGroup
				.attr("display", "inline")
				.transition().duration(this.ms())
				.attr("opacity", 1);
		}else{
			legendTransition = this.legendGroup
				.transition().duration(this.ms())
				.attr("opacity", 0)
				//.transition().delay(this.ms())	// Buggy
				.attr("display", "none");
		}
		// Reorient and Resize Legend Group		
		legendTransition
			//.transition().duration(this.ms())
			.attr("transform", "translate("+this.dimensions.legendX+","+this.dimensions.legendY+") "+
				  "scale(" + this.legendScale() + ")");

		// Reorient and Resize Message Box
		this.messageRect
			.transition().duration(this.ms())	
			.attr("width",this.dimensions.width)
			.attr("height",this.dimensions.height);
		
		return this;

	};
	this.calculateDimensions = function(){
		this.dimensions = {
			width : this.$().width(),
			height : this.$().height(),
			margin : this.margin(),
			plotLeft : 0,
			plotTop : 0,
			plotRight : 0,
			plotBottom : 0,
			legendWidth : this.legendWidth() || (this.$().width() / 5),
			legendY : this.legendY(),
			legendX : this.legendX()
		};
		// If Legend is on and Make Room for Legend is set, make room		
		if(this.legendOn()){
			if (this.makeRoomX()) this.dimensions.plotLeft += (this.dimensions.legendWidth + this.legendX());
		}
		// Calculate remaining plot area
		this.dimensions.plotWidth = this.dimensions.width - this.dimensions.plotLeft - this.dimensions.margin - this.dimensions.margin;
		this.dimensions.plotHeight = this.dimensions.height - this.dimensions.margin - this.dimensions.margin;
		return this;
	};
	/**
	 * Calculates new and old sizes and if different, trigger afterUpdate.
	 */
	this.measureSize = function(that){
		var currentWidth = that.$().innerWidth();
		var currentHeight = that.$().innerHeight();
		if(currentWidth != that._previousWidth || currentHeight != that._previousHeight){
			that._previousHeight = currentHeight;
			that._previousWidth = currentWidth;	
			this.afterUpdate();
		}else{
			// Sizes are the same.  Don't redraw, but poll again after an interval.
			that._poller = window.setTimeout(function(){that.measureSize(that)},that._pollInterval);	
		}
	};
	this.preReqCheck = function() {
		var success = true;
		var reason = "";
		if(this.flatData && this.flatData.values && this.flatData.values.length > 0){
			
		}else{
			success = false;
			reason = "No data found.  Try assigning a datasource and ensure Load in Script is set to false.";
		}
		return {
			success : success,
			reason : reason
		};
	};
	this.updateMessage = function(){
		this.messageRect
	    	.attr("width",this.dimensions.width)
	    	.attr("height",this.dimensions.height)
	    	
	 	this.messageText
	 		.attr("x",this.dimensions.width/2)
	 		.attr("y",this.dimensions.height/2);
		
		return this;
	}
	this.updatePlot = function() {
		this.messageGroup
			.transition().duration(this.ms())
			.attr("display", "none")
			.attr("opacity", 0);
		return this;
	};
	this.afterUpdate = function() {
		var that = this;
		this.calculateDimensions()
			.updateMessage()
			.updateCosmetics();
		
		var check = this.preReqCheck();
		if(check.success){
			this.updatePlot()
				.updateLegend();
		}else{
			// Give informational window
			this.displayMessage(check.reason);
		}
		this._poller = window.setTimeout(function(){that.measureSize(that)},that._pollInterval);
	};
	/**
	 * Update Legend
	 */
	this.updateLegend = function(){
		this.legendLabel.text(this.legendTitle());
		return this;

	};
	this.displayMessage = function(message){
		this.messageText.text(message);
		this.messageGroup
			.attr("display", "inline")
			.transition().duration(this.ms())
			.attr("opacity", 1);
	}
	var parentInit = this.init;
	this.init = function(){
		parentInit.apply(this);
		this.$().addClass("Viz");
		this.calculateDimensions();
		this.svg = d3.select("#" + this.$().attr("id")).select("svg");
		if(this.svg.empty()){
			this.svg = d3.select("#" + this.$().attr("id")).append("svg");
			this.svgDefs = this.svg.append("defs");
			this.svgStyle = this.svgDefs.append("style")
				.attr("type","text/css");
			
			// Main Plot Area
			this.canvas = this.svg.append("g");
			// Clip Path
			this.clip = this.canvas.append("clipPath")
				.attr("id",this.$().attr("id")+"_clip");
			// Rectangle Shape for clip path
			this.clipRect = this.clip.append("rect")
				.attr("class","clipRect");
			// Plot Area
			this.plotArea = this.canvas.append("g");
			// Plot Layer
			this.plotLayer = this.plotArea.append("g")
				.attr("clip-path","url(#" + this.$().attr("id")+"_clip)");
			/*
			 * Axes
			 */
			this.yAxisGroup = this.plotArea.append("g")
				.attr("class", "y axis");
			this.xAxisGroup = this.plotArea.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + this.dimensions.plotHeight + ")");
			/*
			 * Legend
			 */
			this.legendGroup = this.canvas.append('g')
        		.attr('class', "legend-group" );
			this.legendRect = this.legendGroup.append('rect')
	        	.attr("class", "legend-container")	
	        	.attr('x', 0)
	        	.attr('y', 0);
			this.legendLabel = this.legendGroup.append('text')
	        	.attr('class', 'legend-label');
			/*
			 * Messages
			 */
			this.messageGroup = this.svg.append("g")
		    	.attr("display", "none")
		    	.attr("opacity", 0);
	    
		    this.messageRect = this.messageGroup.append("rect")
		    	.attr("fill", "#006699")
		    	.attr("x",0).attr("y",0)
		    	.attr("width",this.dimensions.width)
		    	.attr("height",this.dimensions.height)
		    	
	    	this.messageText = this.messageGroup.append("text")
		    	.style("text-anchor","middle")
		    	.style("fill","#FFFFFF")
		    	.attr("x",this.dimensions.width/2).attr("y",this.dimensions.height/2)
		    	.text("Message");
		}
	}
};