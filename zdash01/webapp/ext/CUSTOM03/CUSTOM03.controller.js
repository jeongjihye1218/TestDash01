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
                ], function(CardController,ODataModel,JSONModel,Filter,FilterOperator) {
                
                    var oModel;
                    var _oFilter;

        return CardController.extend("zdash01.ext.CUSTOM.CUSTOM03"),
        {
            onInit: function () {

                this.oModel = new ODataModel("/sap/opu/odata/sap/ZPJ_DASHBOARD_1910275_SRV/", true);
                 this.getView().setModel(oModel);

                 this.GloabalEventBus = sap.ui.getCore().getEventBus();
                 this.GloabalEventBus.subscribe("OVPGlobalfilter", "OVPGlobalFilterSeacrhfired", this.onfilterApply, this);

                 this.fragments = {};
            },
    
            onAfterRendering: function () {},

            onDialogClose: function () {
              // alert("onDialogBtn");

              var oDialog = this.byId("CustomDialog2");
              if (oDialog) {
                oDialog.close();  // Dialog 닫기
              }
          },

            onExit: function () {},

            onfilterApply: function (sChannelId, sEventName, aFilters, _this) {
                
                _oFilter = aFilters;
                  var that = this;               
  
  
                  this.oModel.read("/STACK_BAPST_MSet" ,  {
                      filters : [aFilters],
          
                    success:function(oData , response) {    
                        var oSmartChart = that.byId("CUSTOM03");
                        
                        oSmartChart.getChart().getBinding("data").filter(aFilters);                                },
         
          
                    error: function(oError) {
          
                      alert(oError.message);
                    }  
          
                  })
              },

              onClick: function(oEvent) {
                
                var AssetCodeT = oEvent.getParameter("data")[0].data.AssetCodeT;
                var GrdatM = oEvent.getParameter("data")[0].data.GrdatM;

                var dateFrom = _oFilter[0].aFilters[0].aFilters[0].oValue1;                
                dateFrom = new Date(dateFrom);

                var year = dateFrom.getFullYear();
                var month = GrdatM.slice(0,-1);
                month = String(month).padStart(2, "0");
                
                var last = new Date(year,month,0).getDate(); // 월말일자

                var str = year + '-' + month + '-' + last;
                console.log(str);

                var odate = new Date(str);
                console.log(odate);


                var that = this;
        //         var dateFrom = 20201231;
        //         var oFilter = new sap.ui.model.Filter("Grdat", 'EQ', dateFrom);  
                
                // var oFilter = new sap.ui.model.Filter("Grdat", FilterOperator.EQ, odate); 
                // var oFilter = new Filter([new Filter("Grdat", FilterOperator.EQ, odate)], false);

                var oFilter1 = new Filter("Grdat", FilterOperator.EQ, odate);  
                var oFilter2 = new Filter("AssetCodeT", FilterOperator.EQ, AssetCodeT);    
                
                var aFilters = [oFilter1, oFilter2];  // 필터 배열

                // 두 개의 필터를 AND 조건으로 결합
                var oCombinedFilter = new Filter({
                  filters: aFilters,
                  and: true  // true는 AND 조건, false는 OR 조건
                });

                  that.oModel.read("/BAPSTSet" ,  { 
                  filters : [oCombinedFilter],
     
                 success:function(oData , response) {
                  
                  // alert('zzz');
                  var oSmartTable1 = that.byId("idSmartTable_2");                
                 
                  oSmartTable1.getTable().getBinding("rows").filter(oCombinedFilter);                 
   
    
                 },
     
                 error: function(oError) {
     
                   alert(oError.message);
                 }
              }) 

               var oView = this.getView();
               var oDialog = oView.byId("CustomDialog2");
  
        //  // create dialog lazily
          if (!oDialog) {
        //     // create dialog via fragment factory
             oDialog = sap.ui.xmlfragment(oView.getId(), "zdash01.ext.CUSTOM04.CUSTOM04",this);
             oView.addDependent(oDialog);

             // 다이얼로그의 버튼에 이벤트 명시적으로 바인딩
            // var oButton = oDialog.getBeginButton();
            // oButton.attachPress(this.onDialogClose.bind(this));
          }

          oDialog.open();


              },
              


        }
    });
})();