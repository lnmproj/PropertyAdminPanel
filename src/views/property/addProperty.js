import { mapActions, mapGetters } from "vuex";
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
      // Basic Information
      agentId: null,
      agentItems: [],
      pnlSettings: null,
      sellerName: null,
      priceAsked: null,
      landArea: null,
      propertyDescription: null,
      propertyHeadline: null,
      propertyName: null,
      buildingArea: null,
      productCategory: null,
      propertyClassification: null,
      propertyType: null,
      agryType: false,

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
      furnishing: null,
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
        "Basic – with stove and refrigerator",
        "Semi = basic, plus some furniture",
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
  async created() {
    this.agentItems = await this.getAgent("allagents", {});
    this.townItems = await this.getAll("GetTownWithoutPagination", {});
    this.provinceItems = await this.getAll("GetProvinceWithoutPagination", {});
    this.agencyProvinceItems = await this.getAll(
      "GetProvinceWithoutPagination",
      {}
    );
    this.propertyClassificationItems = await this.getAll(
      "GetPropertyClassificationWithoutPagination",
      {}
    );
    this.propertyTypeItems = await this.getAll(
      "GetPropertyTypeWithoutPagination",
      {}
    );
    this.productCategoryItems = await this.getAll(
      "GetProductCategoryWithoutPagination",
      {}
    );
  },
  computed: {
    ...mapGetters(["items"]),

    isLoaderActive() {
      return this.$store.state.login.isLoaderActive;
    },
    isDialogLoaderActive() {
      return this.$store.state.role.isDialogLoaderActive;
    },
    tableItems() {
      return this.$store.state.role.items;
    },
    totalItemsInDB() {
      return this.$store.state.role.totalItemsInDB;
    },
    tableDataLoading() {
      return this.$store.state.role.isTableDataLoading;
    },
  },
  mounted() {},

  methods: {
    getAgent(endPoint, payload) {
      this.isItemLoading = true;
      return new ApiService.get(endPoint, payload)
        .then((response) => {
          this.isItemLoading = false;
          return response.data.data;
        })
        .catch((error) => {
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    getAll(endPoint, payload) {
      this.isItemLoading = true;
      return new ApiService.get(endPoint, payload)
        .then((response) => {
          this.isItemLoading = false;
          return response.data.resultData;
        })
        .catch((error) => {
          if (error.response.status != 401 && error.response.status != 403) {
            Global.showErrorAlert(true, "error", "Something went wrong");
          }
        });
    },
    async changeProvince() {
      this.barangayItems = await this.getAll("GetBarangayWithoutPagination", {
        townId: this.town,
        provinceId: this.province,
      });
    },

    async changeBarangay() {
      this.subdivisionItems = await this.getAll(
        "GetSubdivisionWithoutPagination",
        {
          townId: this.town,
          provinceId: this.province,
          barangayId: this.barangay,
        }
      );
    },

    ...mapActions([
      "actionGetRoles",
      "actionSave",
      "actionUpdateRole",
      "actionEnableDisableRole",
      "actionDeleteRole",
    ]),

    // add edit role
    async addEditItem() {
      console.log(this.agryType);
      if (this.$refs.holdingFormAddEdit.validate()) {
        if (this.isAddEdit) {
          // save
          let payload = {
            seller_name: this.sellerName,
            price_asked: this.priceAsked,
            land_area: this.landArea,
            building_area: this.buildingArea,
            property_name: this.propertyName,
            property_headline: this.propertyHeadline,
            property_description: this.propertyDescription,
            property_classification_id: this.propertyClassification,
            property_type_id: this.propertyType,
            product_category_id: this.productCategory,
            agri_type: this.agryType ? "Yes" : "No",

            unit_no: this.unitNumber,
            house_lot_no: this.houseLotNumber,
            street_name: this.streetName,
            property_building_name: this.propertyBuildingName,
            town_id: this.town,
            province_id: this.province,
            barangay_id: this.barangay,
            subdivison_id: this.subdivision,
            zipcode: this.zipCode,
            select_floor_level: this.floorLevel,

            no_bedrooms: this.numberBedrooms,
            no_toilets: this.numberToilets,
            car_spaces_uncovered_property: this.carSpacesUncovered,
            garage_spaces_covered_property: this.garageSpacesCovered,
            longitude: this.longitude,
            latitude: this.latitude,

            rental_price_asked: this.rentalPriceAsked,
            minimum_rental_period_rent: this.minimumRentalPeriod,
            car_spaces_rent: this.maximumRentalPeriod,
            date_of_month_rent_due: this.dayMonthRentDue,
            period_can_extend: this.periodCanExtend,
            date_rental_started: this.dateRentalStarted,
            current_rental_expires: this.currentRentalExpires,
            rental_switch_on: this.rentalSwitchOn,

            sale_price: this.salePriceAsked,
            price_per_sq_m: this.pricePerSqm,
            minimum_rental_period_sale: this.productMode,
            sale_switch_on: this.saleSwitchOn,

            garage: this.garage ? "Yes" : "No",
            cooling: this.cooling,
            heatingtype: this.heatingtype,
            elevator: this.elevator ? "Yes" : "No",
            freewifi: this.freewifi ? "Yes" : "No",
            exteriour: this.exteriour,
            kitchen: this.kitchen,
            fireplace: this.fireplace ? "Yes" : "No",
            swimming_pool: this.swimmingPool ? "Yes" : "No",

            year: moment().format("YYYY"),
            agent_id: this.agentId,
            created_by:  secureLS.get(Global.userId),
            endPoint: `saveproperty`,
          };

          console.log(payload);
          await this.actionSave(payload);
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
