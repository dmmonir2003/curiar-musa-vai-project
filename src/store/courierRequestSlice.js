import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Step 1: Book Your Transport
  fromAddress: '',
  toAddress: '',

  // Step 2: Type of Transport
  pickupType: '',
  itemSource: '',

  // Step 3: Items
  items: [],

  // Step 4: Date & Time
  pickupDate: null,
  timeSlot: {
    start: '',
    end: '',
    cost: 0
  },

  // Step 5: Extra Services
  extraServices: {
    helpers: 1, // Default to 1 helper (No Help)
    floor: '0',
    elevator: false
  },

  // Step 6: Contact
  contactDetails: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  },
  pickupContact: {
    smartHomeAddress: '',
    city: '',
    zipCode: '',
    additionalInfo: ''
  },
  deliveryContact: {
    smartHomeAddress: '',
    city: '',
    zipCode: '',
    additionalInfo: ''
  },
  subscribeToNewsletter: false,
  agreedToTerms: false,
  agreedToPrivacy: false,

  // Calculated Fields
  totalPrice: 0,
  status: 'pending'
};

const courierRequestSlice = createSlice({
  name: 'courierRequest',
  initialState,
  reducers: {
    // Step 1: Book Your Transport
    setLocation: (state, action) => {
      state.fromAddress = action.payload.from;
      state.toAddress = action.payload.to;
    },

    // Step 2: Type of Transport
    setTransportType: (state, action) => {
      state.pickupType = action.payload.pickupType;
      state.itemSource = action.payload.itemSource;
    },

    // Step 3: Items
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },
    updateItem: (state, action) => {
      const { index, item } = action.payload;
      state.items[index] = item;
    },

    // Step 4: Date & Time
    setPickupDate: (state, action) => {
      state.pickupDate = action.payload;
    },
    setTimeSlot: (state, action) => {
      state.timeSlot = action.payload;
    },

    // Step 5: Extra Services
    setExtraServices: (state, action) => {
      state.extraServices = {
        ...state.extraServices,
        ...action.payload
      };
    },

    // Step 6: Contact
    setContactDetails: (state, action) => {
      state.contactDetails = {
        ...state.contactDetails,
        ...action.payload
      };
    },
    setPickupContact: (state, action) => {
      state.pickupContact = {
        ...state.pickupContact,
        ...action.payload
      };
    },
    setDeliveryContact: (state, action) => {
      state.deliveryContact = {
        ...state.deliveryContact,
        ...action.payload
      };
    },
    setNewsletterSubscription: (state, action) => {
      state.subscribeToNewsletter = action.payload;
    },
    setAgreements: (state, action) => {
      state.agreedToTerms = action.payload.agreedToTerms;
      state.agreedToPrivacy = action.payload.agreedToPrivacy;
    },

    // Calculated Fields
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },

    // Reset the entire state
    resetRequest: () => initialState
  }
});

export const {
  setLocation,
  setTransportType,
  setItems,
  addItem,
  removeItem,
  updateItem,
  setPickupDate,
  setTimeSlot,
  setExtraServices,
  setContactDetails,
  setPickupContact,
  setDeliveryContact,
  setNewsletterSubscription,
  setAgreements,
  setTotalPrice,
  setStatus,
  resetRequest
} = courierRequestSlice.actions;

export default courierRequestSlice.reducer;