!function(t){function i(i,e){this.element=i,this.$el=t(i),this.settings=t.extend({},r,e),this.$container=t(this.settings.container),this.settings.width=parseInt(this.settings.width),this.settings.height=parseInt(this.settings.height),this.settings.width>=c?this.settings.width=c:this.settings.width<a&&(this.settings.width=a),this.settings.height>=l?this.settings.height=l:this.settings.height<d&&(this.settings.height=d);var s=["left","right"];t.inArray(this.settings.position,s)==-1&&(this.settings.position=r.position),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||this.init()}function e(){var i=[],e=[{name:"emotion",symbol:"grinning"},{name:"animal",symbol:"whale"},{name:"food",symbol:"hamburger"},{name:"folderol",symbol:"sunny"},{name:"thing",symbol:"kiss"},{name:"travel",symbol:"rocket"}],s={people:"emotion",symbol:"thing",undefined:"thing"},n={};t.each(t.fn.emojiPicker.emojis,function(t,i){var e=s[i.category]||i.category;n[e]=n[e]||[],n[e].push(i)}),i.push('<div class="emojiPicker">'),i.push("<nav>");for(var o in e)i.push('<div class="tab'+(0==o?" active":"")+'" data-tab="'+e[o].name+'"><div class="emoji emoji-'+e[o].symbol+'"></div></div>');i.push("</nav>");for(var o in e){i.push('<section class="'+e[o].name+(0==o?"":" hidden")+'">');for(var h in n[e[o].name]){var r=n[e[o].name][h];i.push('<div class="emoji emoji-'+r.shortcode+'"></div>')}i.push("</section>")}return i.push("</div>"),i.join("\n")}function s(i){for(var e=t.fn.emojiPicker.emojis,s=0;s<e.length;s++)if(e[s].shortcode==i)return e[s]}function n(t,i){if(document.selection){t.focus();var e=document.selection.createRange();e.text=i,t.focus()}else if(t.selectionStart||"0"==t.selectionStart){var s=t.selectionStart,n=t.selectionEnd,o=t.scrollTop;t.value=t.value.substring(0,s)+i+t.value.substring(n,t.value.length),t.focus(),t.selectionStart=s+i.length,t.selectionEnd=s+i.length,t.scrollTop=o}else t.focus(),t.value+=i}function o(t){var i=t.split("-").map(function(t){return parseInt(t,16)});return String.fromCodePoint.apply(null,i)}var h="emojiPicker",r={width:"200",height:"350",position:"right",fadeTime:100,iconColor:"black",iconBackgroundColor:"#eee",container:"body",button:!0},a=200,c=600,d=100,l=350,g=50;t.extend(i.prototype,{init:function(){this.active=!1,this.addPickerIcon(),this.createPicker(),this.listen()},addPickerIcon:function(){if(this.settings.button){var i=this.$el.outerHeight(),e=i>g?g:i,s=this.$el.width();this.$el.width(s),this.$wrapper=this.$el.wrap("<div class='emojiPickerIconWrap'></div>").parent(),this.$icon=t('<div class="emojiPickerIcon"></div>').height(e).width(e).addClass(this.settings.iconColor).css("backgroundColor",this.settings.iconBackgroundColor),this.$wrapper.append(this.$icon)}},createPicker:function(){this.$picker=t(e()).appendTo(this.$container).width(this.settings.width).height(this.settings.height).css("z-index",1e4),this.$picker.find("section").height(parseInt(this.settings.height)-40),this.settings.width<240&&this.$picker.find(".emoji").css({width:"1em",height:"1em"})},listen:function(){this.settings.button&&this.$wrapper.find(".emojiPickerIcon").click(t.proxy(this.iconClicked,this)),this.$picker.find("section div").click(t.proxy(this.emojiClicked,this)),this.$picker.find("nav .tab").click(t.proxy(this.emojiCategoryClicked,this)),this.$picker.click(t.proxy(this.pickerClicked,this)),t(document.body).click(t.proxy(this.clickOutside,this)),t(window).resize(t.proxy(this.updatePosition,this))},updatePosition:function(){var t=this.$picker.offsetParent(),i=t.offset(),e=this.$el.offset();"right"==this.settings.position&&(e.left+=this.$el.outerWidth()-this.settings.width),e.top+=this.$el.outerHeight();var s={top:e.top-i.top,left:e.left-i.top};return this.$picker.css({top:s.top,left:s.left}),this},hide:function(){this.$picker.hide(this.settings.fadeTime,"linear",function(){this.active=!1}.bind(this))},show:function(){this.$el.focus(),this.updatePosition(),this.$picker.show(this.settings.fadeTime,"linear",function(){this.active=!0}.bind(this))},iconClicked:function(){this.$picker.is(":hidden")?this.show():this.hide()},emojiClicked:function(i){var e=t(i.target).attr("class").split("emoji-")[1],h=o(s(e).unicode);n(this.element,h),t(this.element).trigger("keyup")},emojiCategoryClicked:function(i){var e="";this.$picker.find("nav .tab").removeClass("active"),t(i.target).parent().hasClass("tab")?(e=t(i.target).parent().attr("data-tab"),t(i.target).parent(".tab").addClass("active")):(e=t(i.target).attr("data-tab"),t(i.target).addClass("active")),this.$picker.find("section").addClass("hidden"),this.$picker.find("section."+e).removeClass("hidden")},pickerClicked:function(t){t.stopPropagation()},clickOutside:function(){this.active&&this.hide()}}),t.fn[h]=function(e){return"string"==typeof e?(this.each(function(){var i=t.data(this,h);switch(e){case"toggle":i.iconClicked()}}),this):(this.each(function(){t.data(this,h)||t.data(this,h,new i(this,e))}),this)},String.fromCodePoint||(String.fromCodePoint=function(){var t,i,e,s,n=[];for(s=0;s<arguments.length;++s)t=arguments[s],i=t-65536,e=t>65535?[55296+(i>>10),56320+(1023&i)]:[t],n.push(String.fromCharCode.apply(null,e));return n.join("")})}(jQuery);