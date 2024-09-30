(function () {
    "use strict";
    var oModel;

    /* controller for custom card  */
    // Controller : https://ui5.sap.com/#/topic/121b8e6337d147af9819129e428f1f75
    // controller class name can be like app.ovp.ext.customList.CustomList where app.ovp can be replaced with your application namespace
    sap.ui.define([], 
        function() {
        return {
            onInit: function () {
            //     this.oModel = new ODataModel("/sap/opu/odata/sap/ZPJ_DASHBOARD_1910275_SRV/", true);
            //   this.getView().setModel(oModel, 'CUSTOM04');

            //   this.GloabalEventBus = sap.ui.getCore().getEventBus();
            //   this.GloabalEventBus.subscribe("OVPGlobalfilter", "OVPGlobalFilterSeacrhfired", this.onfilterApply, this);
          

            },            
    
            onAfterRendering: function () {},

            onExit: function () {}
        }
    });
})();