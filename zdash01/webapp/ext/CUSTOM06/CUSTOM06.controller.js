(function () {
    "use strict";

    var oModel;
    var _oFilter;

    /* controller for custom card  */
    // Controller : https://ui5.sap.com/#/topic/121b8e6337d147af9819129e428f1f75
    // controller class name can be like app.ovp.ext.customList.CustomList where app.ovp can be replaced with your application namespace
    sap.ui.define([
        "sap/ui/model/odata/ODataModel",
                    "sap/ui/model/json/JSONModel"
    ], function(ODataModel,JSONModel) {
        return {
            onInit: function () {
                this.oModel = new ODataModel("/sap/opu/odata/sap/ZPJ_DASHBOARD_1910275_SRV/", true);
                 this.getView().setModel(oModel);

                 this.GloabalEventBus = sap.ui.getCore().getEventBus();
                 this.GloabalEventBus.subscribe("OVPGlobalfilter", "OVPGlobalFilterSeacrhfired", this.onfilterApply, this);                 

            },
            onfilterApply: function (sChannelId, sEventName, aFilters, _this) {
                
                _oFilter = aFilters;
                  var that = this;               
  
  
                  this.oModel.read("/BAPSTSet" ,  {
                      filters : [aFilters],
          
                    success:function(oData , response) {    
                        var oSmartChart = that.byId("CUSTOM06");
                        
                        oSmartChart.getChart().getBinding("data").filter(aFilters);                                },
         
          
                    error: function(oError) {
          
                      alert(oError.message);
                    }  
          
                  })                 

              },
    
            onAfterRendering: function () {},

            onExit: function () {}
        }
    });
})();