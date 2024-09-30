(function () {
    "use strict";

    /* controller for custom card  */
    // Controller : https://ui5.sap.com/#/topic/121b8e6337d147af9819129e428f1f75
    // controller class name can be like app.ovp.ext.customList.CustomList where app.ovp can be replaced with your application namespace
    sap.ui.define(["sap/ovp/cards/generic/Card.controller",
                    "sap/ui/model/odata/ODataModel",
                    "sap/ui/model/json/JSONModel",
                    "sap/ui/model/Filter",
                    "sap/ui/model/FilterOperator",
                    "sap/ui/core/Fragment"
        
        ], function(CardController,ODataModel,JSONModel) {

        var oModel;
        return CardController.extend("zdash01.ext.CUSTOM02.CUSTOM02"),
         {

  
            onInit: function () {

             
           
              //   var dateFrom = 20201231;
              this.oModel = new ODataModel("/sap/opu/odata/sap/ZPJ_DASHBOARD_1910275_SRV/", true);
              this.getView().setModel(oModel, 'CUSTOM02');

              this.GloabalEventBus = sap.ui.getCore().getEventBus();
              this.GloabalEventBus.subscribe("OVPGlobalfilter", "OVPGlobalFilterSeacrhfired", this.onfilterApply, this);

              



            },
    
            onAfterRendering: function () {
              
            },

            onExit: function () {},

            onfilterApply: function (sChannelId, sEventName, aFilters, _this) {

              

              //   var that = this;
              //   var dateFrom = 20200101;
              //   var oFilter = new sap.ui.model.Filter("Grdat", 'EQ', dateFrom);  
              //   that.oModel.read("/BAPSTSet" ,  {
              //     // filters : [oFilter],
              //     filters : [aFilters],
     
              //    success:function(oData , response) {
                  
              //     //alert('zzz');
              //     var oSmartTable1 = that.byId("idSmartTable_0");
                  
              //     // oSmartTable1.getTable().getBinding("rows").filter(oFilter);                 
              //     oSmartTable1.getTable().getBinding("rows").filter(aFilters);                 
              //     // alert(oData.results.length);
    
              //    },
     
              //    error: function(oError) {
     
              //      alert(oError.message);
              //    }
              // })  

            }

            
        }
    });
})();