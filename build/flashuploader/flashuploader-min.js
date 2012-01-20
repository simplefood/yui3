YUI.add("flashuploader",function(c){var a=c.substitute;function b(d){b.superclass.constructor.apply(this,arguments);}c.FlashUploader=c.extend(b,c.Widget,{_swfReference:null,_uploadQueue:null,_swfContainerId:null,initializer:function(){this._swfContainerId=c.guid("uploader");this.publish("fileselect");},_uploadEventHandler:function(d){switch(d.type){case"file:uploadprogress":this.fire("uploadprogress",d);break;case"uploadqueue:totaluploadprogress":this.fire("totaluploadprogress",d);break;case"file:uploadcomplete":this.fire("uploadcomplete",d);break;case"uploadqueue:alluploadscomplete":this.fire("alluploadscomplete",d);break;case"uploadqueue:uploaderror":this.fire("uploaderror",d);break;}},_setMultipleFiles:function(){if(this._swfReference){this._swfReference.callSWF("setAllowMultipleFiles",[this.get("multipleFiles")]);}},_setFileFilters:function(){if(this._swfReference&&this.get("fileFilters")!=null){this._swfReference.callSWF("setFileFilters",[this.get("fileFilters")]);}},_updateFileList:function(g){var f=g.fileList,i=[],e=[],d=this._swfReference;c.each(f,function(k){var j={};j.id=k.fileId;j.name=k.fileReference.name;j.size=k.fileReference.size;j.type=k.fileReference.type;j.dateCreated=k.fileReference.creationDate;j.dateModified=k.fileReference.modificationDate;j.uploader=d;i.push(j);});c.each(i,function(j){e.push(new c.File(j));});this.fire("fileselect",{fileList:e});var h=this.get("fileList");this.set("fileList",this.get("appendNewFiles")?h.concat(e):e);},renderUI:function(){var d=this.get("contentBox");d.append(this.get("selectFilesButton"));d.append(c.Node.create(a(b.FLASH_CONTAINER,{swfContainerId:this._swfContainerId})));var e=c.one("#"+this._swfContainerId);var f={version:"10.0.45",fixedAttributes:{wmode:"transparent",allowScriptAccess:"always",allowNetworking:"all",scale:"noscale"},};this._swfReference=new c.SWF(e,this.get("swfURL"),f);d.append(this._fileInputField);},bindUI:function(){console.log("Binding UI...");this._swfReference.on("swfReady",function(){this._setMultipleFiles();this._setFileFilters();this.after("multipleFilesChange",this._setMultipleFiles,this);this.after("fileFiltersChange",this._setFileFilters,this);},this);console.log("Listening to fileselect...");this._swfReference.on("fileselect",this._updateFileList,this);},syncUI:function(){},upload:function(g,e,h){var f=e||this.get("uploadURL"),d=h||this.get("postVarsPerFile");if(g instanceof c.File){this._uploadQueue=new c.Uploader.UploadQueue({simUploads:this.get("simLimit"),errorAction:"restart",fileList:[g],uploadURL:f,perFileParameters:d});this._uploadQueue.on("uploadprogress",this._uploadEventHandler,this);this._uploadQueue.on("totaluploadprogress",this._uploadEventHandler,this);this._uploadQueue.on("uploadcomplete",this._uploadEventHandler,this);this._uploadQueue.on("alluploadscomplete",this._uploadEventHandler,this);this._uploadQueue.startUpload();}},uploadAll:function(e,g){console.log("Starting upload of all selected files");var f=e||this.get("uploadURL"),d=g||this.get("postVarsPerFile");console.log("Creating a new instance of upload queue");this._uploadQueue=new c.Uploader.UploadQueue({simUploads:this.get("simLimit"),errorAction:"restart",fileList:this.get("fileList"),uploadURL:f,perFileParameters:d});console.log("Subscribing to uploadqueue's events");this._uploadQueue.on("uploadprogress",this._uploadEventHandler,this);this._uploadQueue.on("totaluploadprogress",this._uploadEventHandler,this);this._uploadQueue.on("uploadcomplete",this._uploadEventHandler,this);this._uploadQueue.on("alluploadscomplete",this._uploadEventHandler,this);console.log("Starting upload in the queue");this._uploadQueue.startUpload();},uploadThese:function(h,e,g){var f=e||this.get("uploadURL"),d=g||this.get("postVarsPerFile");this._uploadQueue=new c.Uploader.UploadQueue({simUploads:this.get("simLimit"),errorAction:"restart",fileList:h,uploadURL:f,perFileParameters:d});this._uploadQueue.on("uploadprogress",this._uploadEventHandler,this);this._uploadQueue.on("totaluploadprogress",this._uploadEventHandler,this);this._uploadQueue.on("uploadcomplete",this._uploadEventHandler,this);this._uploadQueue.on("alluploadscomplete",this._uploadEventHandler,this);this._uploadQueue.on("uploaderror",this._uploadEventHandler,this);this._uploadQueue.startUpload();}},{FLASH_CONTAINER:"<div id='{swfContainerId}' style='position:absolute; top:0px; left: 0px; width:100%; height:100%'></div>",NAME:"flashuploader",ATTRS:{selectFilesButton:{value:c.Node.create("<button type='button' style='height:100%;width:100%'>Select Files</button>")},multipleFiles:{value:false},fileFilters:{value:null},appendNewFiles:{value:true},simLimit:{value:2,validator:function(e,d){return(e>=2&&e<=5);}},fileList:{value:[]},postVarsPerFile:{value:[]},uploadURL:{value:""},swfURL:{value:"assets/flashuploader.swf"}}});},"@VERSION@",{requires:["swf","widget","substitute","base","node","event-custom","file","uploadqueue"]});