import {
  configureStore,
  combineReducers,
  createSlice,
  createAction,
} from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialVal = {
  name: "",
  img: [],
  quantity: "",
  color: [],
  volume: [],
  category: "Hair-Cosmetics",
  status: "Available",
  price: 0,
  guide: "",
  features: [],
  description: "",
};

const productSlice = createSlice({
  name: "product",
  initialState: initialVal,
  reducers: {
    setProduct: (state, action) => {
      return { ...action.payload.item };
    },
  },
});

const initialOrder = {
  status: "order sent",
  clientName: "",
  clientEmail: "",
  clientPhone1: "",
  clientPhone2: "",
  clientAddress: "",
  clientPostal: "",
  clientCity: "",
  total: 0,
  items: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrder,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload.item;
      const newItemList = [...state.items, item];

      return { ...state, items: newItemList };
    },
    removeItem: (state, action) => {
      const { name, measure } = action.payload;

      const newItemList = state.items.filter((single) => {
        if (single.name === name) {
          if (single.measure === measure) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      });
      return { ...state, items: newItemList };
    },
    setInfo: (state, action) => {
      let newInfo = action.payload;
      return { items: state.items, ...newInfo };
    },
    emptyItems: (state, action) => {
      return { ...state, items: [] };
    },
  },
});

const registerd = false;

const registerSlice = createSlice({
  name: "registered",
  initialState: registerd,
  reducers: {
    register: (state, action) => {
      return action.payload.state;
    },
  },
});

const brandSlice = createSlice({
  name: "brand",
  initialState: "",
  reducers: {
    changeBrand: (state, action) => {
      return action.payload;
    },
  },
});

const productReducer = productSlice.reducer;
const productAction = productSlice.actions;
const orderReducer = orderSlice.reducer;
const orderAction = orderSlice.actions;
const registerReducer = registerSlice.reducer;
const registerAction = registerSlice.actions;
const brandReducer = brandSlice.reducer;
const brandAction = brandSlice.actions;
const PersistConfig = {
  key: "persisit-key",
  storage,
};

const rootReducer = combineReducers({
  product: productReducer,
  order: orderReducer,
  registered: registerReducer,
  brand: brandReducer,
});
const resetAction = createAction("RESET");

const resetReducer = (state, action) => {
  if (action.type === resetAction.type) {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

const persistedReducer = persistReducer(PersistConfig, resetReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persisitor = persistStore(store);
export {
  persisitor,
  productAction,
  store,
  orderAction,
  registerAction,
  brandAction,
};
