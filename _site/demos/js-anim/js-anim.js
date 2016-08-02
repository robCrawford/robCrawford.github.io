/**
 * @preserve Copyright 2013 Rob Crawford
 * https://github.com/robCrawford/js-anim
 * Released under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * jQuery JavaScript Library: Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license, http://jquery.org/license
 * Animation Step Value Generator by www.hesido.com
 */
/*
Stand-alone JS animations with easing
Date: 19th January 2013
NOTE:
	The namespace can easily be changed by supplying a third argument into the wrapping iife
*/
(function(window, document, namespace, undefined){ //Optionally supply namespace to attach animate() and quitAnims() methods
	"use strict";

	//Config
	var domElExpandoName = "animData"; //Name of property on DOM elements for registry index

	//Init
	var data = {}, //Registry
		currDataIndex = 1;
	namespace = namespace || window;
	namespace.animate = animate;
	namespace.quitAnims = quitAnims;

	/*------------------------------
	  Animation 
	 ------------------------------*/
	function animate(el, prop, to, unitsPerSecond, easing, callback){
	/**
	* Animate style property
	* i.e. animate(div1, "width", 1100, 1000, "out", function(){console.log('div1 anim end')});
	* 
	* @param el                   DOM element
	* @param prop                 Property to animate
	* @param to                   Destination property value
	* @param unitsPerSecond       Speed of animation in units per second
	* @param easing (optional)    Easing type: "in" or "out"
	* @param callback (optional)  Function to call when animation is complete
	*/
		var frameDur = 25, //ms, recommended shortest duration - http://answers.oreilly.com/topic/1506-yielding-with-javascript-timers/
			fromCSS = curCSS(el, prop),
			fromVal = parseFloat(fromCSS),
			units = (fromCSS || "").substr((fromVal+"").length),
			difference = Math.abs(to-fromVal),
			easeVal = (easing==="in")?1.5:(easing==="out")?0.5:1, // >1 ease-in, <1 ease-out
			elAnimData = getData(el, 'animData');

		//Quit if already at 'to' val (still fire callback)
		if(fromVal===to){
			if(callback)callback.call();
			return;
		}

		//Init animData for el if first anim
		if(!elAnimData){
			elAnimData = {};
			setData(el, {'animData':elAnimData});
		}

		//Get data for prop being animated or create entry
		var animDataOb = elAnimData[prop];
		if(!animDataOb)animDataOb = elAnimData[prop] = {};

		//Don't re-initialise an existing animation i.e. same prop/to
		if(animDataOb.to === to)return;
		animDataOb.to = to; //Store 'to' val

		//Clear any exisiting interval
		if(animDataOb.intId){
			clearInterval(animDataOb.intId);
			animDataOb.intId = null;
		}

		//Create new anim
		animDataOb.intId = (function(animDataOb){
			var totalSteps = Math.round((difference/unitsPerSecond)/(frameDur*.001)),
				thisStep = 0,
				multiplier = 1000; //Avoids problems with decimals i.e. opacity

			return setInterval(function(){
				var newVal = easeInOut(fromVal*multiplier, to*multiplier, totalSteps, thisStep++, easeVal);
				if(!isNaN(newVal))el.style[prop] = newVal/multiplier + units; //Allow 0
				if(thisStep > totalSteps)endAnim(animDataOb, callback);
			}, frameDur);
		})(animDataOb);
	}

	function endAnim(animDataOb, callback){
	//End anim
		clearInterval(animDataOb.intId);
		animDataOb.intId = animDataOb.to = null;
		if(callback)callback.call();
	}

	function quitAnims(el){
	/**
	* Quit all animations on element
	* i.e. quitAnims(div1);
	* 
	* @param el  DOM element
	*/
		var elAnimData = getData(el, "animData");
		for(var p in elAnimData){
			if(elAnimData.hasOwnProperty(p))endAnim(elAnimData[p]);
		}
	}

	/*------------------------------
	  Data registry 
	 ------------------------------*/
	function setData(domEl, dataOb){
	//Set data associated to a DOM element
		var dataIndex = domEl[domElExpandoName];
		if(!dataIndex){
			dataIndex = domEl[domElExpandoName] = currDataIndex++;
			data[dataIndex] = {};
		}
		for(var p in dataOb){
			if(dataOb.hasOwnProperty(p))data[dataIndex][p] = dataOb[p];
		}
	}

	function getData(domEl, p){
	//Get data associated to a DOM element
		if(!domEl[domElExpandoName])return;
		return data[domEl[domElExpandoName]][p];
	}

	function clearData(domEl, propOrArray){ //i.e. clearData(box1,'label') OR clearData(box1,['label','handle']) OR no args clears completely
	//Clear data associated to DOM element
		if(!domEl || !domEl[domElExpandoName])return;

		if(!propOrArray){ //If no props supplied, completely remove data entry and dataIndex expando
			delete data[domEl[domElExpandoName]];
			domEl[domElExpandoName] = null; //delete causes error in IE7
		}
		else if(typeof propOrArray==="string"){ //If just one prop supplied
			delete data[domEl[domElExpandoName]][propOrArray];
		}
		else if(propOrArray.length){ //If array of props supplied
			for(var i=0,len=propOrArray.length;i<len;i++){
				delete data[domEl[domElExpandoName]][propOrArray[i]];
			}
		}
	}

	/*------------------------------
	  Utilities
	 ------------------------------*/
	function easeInOut(minValue, maxValue, totalSteps, actualStep, powr){
	//Generic Animation Step Value Generator by www.hesido.com 
		var delta = maxValue - minValue;
		var stepp = minValue+(Math.pow(((1 / totalSteps) * actualStep), powr) * delta);
		return Math.ceil(stepp);
	}

	//Get current CSS - from jQuery-1.9.0
	var curCSS, getStyles, core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		rmargin = /^margin/, rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" );
	if(window.getComputedStyle){
		getStyles = function(elem){return window.getComputedStyle( elem, null )};
		curCSS = function( elem, name, _computed ){
			var width, minWidth, maxWidth, computed = _computed || getStyles( elem ),
				ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
				style = elem.style;
			if( computed ){
				/* Edit - removed edge case as requires lots more jQuery code
				if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {ret = jQuery.style( elem, name )}*/
				if( rnumnonpx.test( ret ) && rmargin.test( name )){
					width = style.width; minWidth = style.minWidth; maxWidth = style.maxWidth;
					style.minWidth = style.maxWidth = style.width = ret; ret = computed.width;
					style.width = width; style.minWidth = minWidth; style.maxWidth = maxWidth}}
			return ret;
		}
	}
	else if (document.documentElement.currentStyle){
		getStyles = function( elem ){return elem.currentStyle};
		curCSS = function( elem, name, _computed ){
			var left, rs, rsLeft, computed = _computed || getStyles( elem ),
				ret = computed ? computed[ name ] : undefined, style = elem.style;
			if( ret == null && style && style[ name ] ) {ret = style[ name ]}
			if( rnumnonpx.test( ret ) && !rposition.test( name ) ) {
				left = style.left; rs = elem.runtimeStyle;rsLeft = rs && rs.left;
				if ( rsLeft ) {rs.left = elem.currentStyle.left}
				style.left = name === "fontSize" ? "1em" : ret; ret = style.pixelLeft + "px";
				style.left = left; if ( rsLeft ) {rs.left = rsLeft}}
		return ret === "" ? "auto" : ret}
	}

})(window, document);