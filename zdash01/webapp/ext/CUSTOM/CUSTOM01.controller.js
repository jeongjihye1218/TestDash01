(function () {
    "use strict";

    /* controller for custom card  */
    // Controller : https://ui5.sap.com/#/topic/121b8e6337d147af9819129e428f1f75
    // controller class name can be like app.ovp.ext.customList.CustomList where app.ovp can be replaced with your application namespace
    sap.ui.define([ "sap/ovp/cards/generic/Card.controller",
                    "sap/ui/model/odata/ODataModel",
                    "sap/ui/model/json/JSONModel",
                    "sap/ui/model/Filter",
                    "sap/ui/model/FilterOperator"

    ], function(CardController,ODataModel,JSONModel) {

        var oModel;
        var _oFilter;
        return CardController.extend("zdash01.ext.CUSTOM.CUSTOM01"),
         {
            onInit: function () {
                

                
                 this.oModel = new ODataModel("/sap/opu/odata/sap/ZPJ_DASHBOARD_1910275_SRV/", true);
                 this.getView().setModel(oModel);

                 this.GloabalEventBus = sap.ui.getCore().getEventBus();
                 this.GloabalEventBus.subscribe("OVPGlobalfilter", "OVPGlobalFilterSeacrhfired", this.onfilterApply, this);
                 
                     
            },

            onAfterRendering: function () {              

            

            },

            onfilterApply: function (sChannelId, sEventName, aFilters, _this) {
                
              _oFilter = aFilters;
                var that = this;               


                this.oModel.read("/CUSTOM_BAPST_MSet" ,  {
                    filters : [aFilters],
        
                  success:function(oData , response) {    
                      var oSmartChart = that.byId("CUSTOM_CHART_BAPST_M");
                      
                      oSmartChart.getChart().getBinding("data").filter(aFilters);                                },
       
        
                  error: function(oError) {
        
                    alert(oError.message);
                  }  
        
                })
            },

            onDialogClose: function () {
              // alert("onDialogBtn");

              var oDialog = this.byId("CustomDialog");
              if (oDialog) {
                oDialog.close();  // Dialog 닫기
              }
          },
    
            onExit: function () {},         

            onClick: function(oEvent) {

                
                var that = this;
                var dateFrom = 20201231;
                var oFilter = new sap.ui.model.Filter("Grdat", 'EQ', dateFrom);  
                
                //var oFilter = sap.ui.model.Filter("Grdat", FilterOperator.EQ, dateFrom);    
                that.oModel.read("/BAPSTSet" ,  { 
                  filters : [_oFilter],
     
                 success:function(oData , response) {
                  
                  //alert('zzz');
                  var oSmartTable1 = that.byId("idSmartTable_0");                
                 
                  oSmartTable1.getTable().getBinding("rows").filter(_oFilter);                 
   
    
                 },
     
                 error: function(oError) {
     
                   alert(oError.message);
                 }
              }) 

               var oView = this.getView();
               var oDialog = oView.byId("CustomDialog");
  
        //  // create dialog lazily
          if (!oDialog) {
        //     // create dialog via fragment factory
             oDialog = sap.ui.xmlfragment(oView.getId(), "zdash01.ext.CUSTOM02.CUSTOM02",this);
             oView.addDependent(oDialog);
          }


          oDialog.open();


                
                // if (!this.oDialog){ //Dialog 객체가 없는 경우
                //     //특정 경로에 있는 Dialog Fragment를 로드하여 컨트롤러에 매핑
                //     this.oDialog = sap.ui.xmlfragment("zdash01.ext.CUSTOM02.CUSTOM02",this);
                    
                //     this.oDialog.open();
                //   } else { //Dialog 객체가 있으면
                //     this.oDialog.open();
                //   }


            }

        
            
        }
    });
})();