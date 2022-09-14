import { Global } from "../../helpers/global";
import { validationMixin } from "../../mixins/validationMixin.js";
import { ApiService } from "../../helpers/apiService";
import SecureLS from "secure-ls";
var secureLS = new SecureLS({ encodingType: "aes" });
export const addProperty = {
         props: ["userPermissionDataProps"],
         mixins: [validationMixin],
         data() {
           return {
             //General
             isLoaderActive: false,
             pnlSettings: null,
             // Basic Information
             agentId: null,
             agentItems: [],

             sellerId: null,
             sellerItems: null,

             isFeatured: null,
             featureItems: ["Yes", "No"],
             furnishing: null,

             priceAsked: null,
             landArea: null,
             propertyDescription: null,
             propertyHeadline: null,
             propertyName: null,
             buildingArea: null,
             productCategory: null,
             propertyClassification: null,
             propertyType: null,
             agryId: null,
             agryItems: [],

             selectDate: null,
             //Address
             unitNumber: null,
             houseLotNumber: null,
             streetName: null,
             propertyBuildingName: null,
             subdivision: null,
             barangay: null,
             town: null,
             province: null,
             zipCode: null,
             floorLevel: null,
             subdivision: null,
             agencyCapabilities: null,
             agencyProvinces: null,
             //Property Type
             numberBedrooms: null,
             numberToilets: null,
             carSpacesUncovered: null,
             garageSpacesCovered: null,
         
             longitude: null,
             latitude: null,

             //For Rent
             rentalPriceAsked: null,
             minimumRentalPeriod: null,
             maximumRentalPeriod: null,
             dayMonthRentDue: null,
             periodCanExtend: null,
             picker: null,
             currentRentalExpires: new Date(
               Date.now() - new Date().getTimezoneOffset() * 60000
             )
               .toISOString()
               .substr(0, 10),
             menuCurrentRentalExpires: false,
             menuDateRentalStarted: false,
             dateRentalStarted: new Date(
               Date.now() - new Date().getTimezoneOffset() * 60000
             )
               .toISOString()
               .substr(0, 10),
             menuRentalSwitchOn: false,
             rentalSwitchOn: new Date(
               Date.now() - new Date().getTimezoneOffset() * 60000
             )
               .toISOString()
               .substr(0, 10),

             //Sale
             salePriceAsked: null,
             pricePerSqm: null,
             productMode: null,
             //Items
             propertyClassificationItems: [],
             productCategoryItems: [],
             propertyTypeItems: [],
             floorLevelItems: ["Basement", "Ground", "First", "Second"],
             agencyProvinceItems: [],
             agencyCapabilitiesItems: [],
             townItems: [],
             provinceItems: [],
             barangayItems: [],
             subdivisionItems: [],
             //Property Type Items
             numberBedroomsItems: ["One", "Two", "Three", "Four", "Five"],
             numberToiletsItems: ["One", "Two", "Three", "Four", "Five"],
             carSpacesUncoveredItems: ["One", "Two", "Three", "Four", "Five"],
             garageSpacesCoveredItems: ["One", "Two", "Three", "Four", "Five"],
             furnishingItems: [
               "None",
               "Basic – with stove and refrigerator",
               "Semi - basic, plus some furniture",
               "Fully – ready for occupation",
             ],

             //For Rent
             minimumRentalPeriodItems: ["Day", "Week", "Month", "Negotiable"],
             maximumRentalPeriodItems: ["Day", "Week", "Month"],
             dayMonthRentDueItems: Global.monthDays,
             garageSpacesCoveredItems: ["One", "Two", "Three", "Four", "Five"],
             periodCanExtendItems: Global.yesNo,
             //Sale
             productModeItems: ["Newly Built", "Renovated", "For Resale"],
             saleSwitchOn: new Date(
               Date.now() - new Date().getTimezoneOffset() * 60000
             )
               .toISOString()
               .substr(0, 10),
             menuSaleSwitchOn: false,
             //Details & Features
             heatingTypeItems: ["Forced Air"],
             exteriorItems: ["Finish Brick"],
             kitchenFeaturesItems: ["Modern Kitchen"],
             coolingItems: ["Central AC"],

             garage: false,
             cooling: null,
             heatingtype: null,
             elevator: false,
             freewifi: false,
             exteriour: null,
             kitchen: null,
             fireplace: false,
             swimmingPool: false,

             tab: null,

             pagination: {},
             entity: "Add Property",
             isFormAddEditValid: false,
             isItemLoading: false,

             // search
             searchText: "",

             // add edit
             defaultItem: {},
             item: {},
             addEditDialog: false,
             isFormAddEditValid: false,
             isAddEdit: true,
             addUpdateButtonText: "Add Role",
             addEditText: "Add",
             //end
           };
         },
         created() {
           //get agent
           this.getAgent();
           //get seller
           this.getSeller();
           //get town
           this.getTown();
           //get province
           this.getProvince();

           //get property classification
           this.getPropertyClassification();

           //get property type
           this.getPropertyType();
           //get product category
           this.getProductCategory();

           //get agri type
           this.getAgriType();
         },

         methods: {
           //get agent
           getAgent() {
             this.isLoaderActive = true;
             ApiService.get("allagents", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.agentItems = response.data.data;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },

           //get seller
           getSeller() {
             this.isLoaderActive = true;
             ApiService.get("GetSellerWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.sellerItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },

           //get town
           getTown() {
             this.isLoaderActive = true;
             ApiService.get("GetTownWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.townItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },
           //get province
           getProvince() {
             this.isLoaderActive = true;
             ApiService.get("GetProvinceWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.provinceItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },
           // get property classification
           getPropertyClassification() {
             this.isLoaderActive = true;
             ApiService.get("GetPropertyClassificationWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.propertyClassificationItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },
           // get property type
           getPropertyType() {
             this.isLoaderActive = true;
             ApiService.get("GetPropertyTypeWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.propertyTypeItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },
           // get product category
           getProductCategory() {
             this.isLoaderActive = true;
             ApiService.get("GetProductCategoryWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.productCategoryItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },

           // get agri type ;
           getAgriType() {
             this.isLoaderActive = true;
             ApiService.get("GetAgriTypeWithoutPagination", {})
               .then((response) => {
                 this.isLoaderActive = false;

                 this.agryItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },
           changeProvince() {
             this.isLoaderActive = true;
             ApiService.get("GetBarangayWithoutPagination", {
               townId: this.town,  
               provinceId: this.province,
             })
               .then((response) => {
                 this.isLoaderActive = false;

                 this.barangayItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },

           changeBarangay() {
             this.isLoaderActive = true;
             ApiService.get("GetSubdivisionWithoutPagination", {
               townId: this.town,
               provinceId: this.province,
               barangayId: this.barangay,
             })
               .then((response) => {
                 this.isLoaderActive = false;

                 this.subdivisionItems = response.data.resultData;
               })
               .catch((error) => {
                 this.isLoaderActive = false;
                 if (
                   error.response.status != 401 &&
                   error.response.status != 403
                 ) {
                   Global.showErrorAlert(true, "error", "Something went wrong");
                 }
               });
           },

           // add Property
            addEditItem() {
          console.log(this.$refs.holdingFormAddEdit.validate());
             if (this.$refs.holdingFormAddEdit.validate()) {
               if (this.isAddEdit) {
                 // save
                 let payload = {
                   seller_id: this.sellerId,
                   user_type: secureLS.get(Global.roleId),
                   user_id: secureLS.get(Global.userId),
                   price_asked: this.priceAsked,
                   land_area: this.landArea,
                   building_area: this.buildingArea,
                   property_name: this.propertyName,
                   property_headline: this.propertyHeadline,
                   property_description: this.propertyDescription,
                   property_classification_id: this.propertyClassification,
                   property_type_id: this.propertyType,
                   product_category_id: this.productCategory,
                   unit_no: this.unitNumber,
                   house_lot_no: this.houseLotNumber,
                   street_name: this.streetName,
                   property_building_name: this.propertyBuildingName,
                   barangay_id: this.barangay,
                   town_id: this.town,
                   province_id: this.province,
                   subdivison_id: this.subdivision,
                   zipcode: this.zipCode,
                   no_bedrooms: this.numberBedrooms,
                   no_toilets: this.numberToilets,
                   longitude: this.longitude,
                   latitude: this.latitude,
                   garage: this.garage ? "Yes" : "No",
                   cooling: this.cooling,
                   heatingtype: this.heatingtype,
                   elevator: this.elevator ? "Yes" : "No",
                   freewifi: this.freewifi ? "Yes" : "No",
                   exteriour: this.exteriour,
                   kitchen: this.kitchen,
                   year: moment().format("YYYY"),
                   isFeatured:this.isFeatured=='Yes'?1:0,
                   agent_id: this.agentId,
                   rental_price_asked: this.rentalPriceAsked,
                   minimum_rental_period_rent: this.minimumRentalPeriod,
                   car_spaces_rent: this.maximumRentalPeriod,
                   date_of_month_rent_due: this.dayMonthRentDue,
                   period_can_extend: this.periodCanExtend,
                   date_rental_started: this.dateRentalStarted,
                   sale_price: this.salePriceAsked,
                   sale_switch_on: this.saleSwitchOn,
                   price_per_sq_m: this.pricePerSqm,
                   select_floor_level: this.floorLevel,
                   current_rental_expires: this.currentRentalExpires,
                   rental_switch_on: this.rentalSwitchOn,
                   car_spaces_uncovered_property: this.carSpacesUncovered,
                   garage_spaces_covered_property: this.garageSpacesCovered,
                   minimum_rental_period_sale: this.productMode,
                   fireplace: this.fireplace ? "Yes" : "No",
                   swimming_pool: this.swimmingPool ? "Yes" : "No",
                   created_by: secureLS.get(Global.userId),
                   agri_type: this.agryId,
                   furnishing: this.furnishing,
                 };

                 this.isLoaderActive = true;
                 ApiService.post(`saveproperty`, payload)
                   .then((response) => {
                     this.isLoaderActive = false;

                     Global.showSuccessAlert(
                       true,
                       "success",
                       response.data.message
                     );
                     this.$router.push({
                       name: "PropertyList",
                     });
                   })
                   .catch((error) => {
                     this.isLoaderActive = false;
                     if (
                       error.response.status != 401 ||
                       error.response.status != 403
                     ) {
                       Global.showErrorAlert(
                         true,
                         "error",
                         "Something went wrong"
                       );
                     }
                   });
               } else {
                 // update
                 //  let payload = {
                 //    Name: this.item.user_skills,
                 //    Id: this.item.user_skills_id,
                 //    isActive: this.item.user_skills_status,
                 //    updated_by: Global.loggedInUser,
                 //    endPoint: `Update${this.endPoint}`,
                 //  };
                 //  await this.actionUpdate(payload);
               }
             }
           },
         },
       };
