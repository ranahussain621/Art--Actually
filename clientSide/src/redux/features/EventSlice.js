import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FormData, instance } from "../axios/axios";

const state = {
  Events: {
    addEvent: {},
    getAllEvents: {},
  },

  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const AddEvent = createAsyncThunk(
  "/event/add-event",
  async (userData, thunkAPI) => {
    try {
      const response = await FormData.post("/exhibition/add-exhibition", userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const GetAllEvents = createAsyncThunk(
  "/event/events",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get("/exhibition/list-of-exhibition");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//edit event api
export const EditEvents = createAsyncThunk(
  "//event/update-event",
  async (userData, thunkAPI) => {
    try {
      const response = await FormData.put("/exhibition/update-exhibition", userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//add event api
export const EventDetail = createAsyncThunk(
  "//event/EventDetail-event",
  async (userData, thunkAPI) => {
    try {
      const response = await instance.post("/exhibition/detail-of-exhibition", userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const DeleteEvents = createAsyncThunk(
  "/event/delete-event",
  async (userData, thunkAPI) => {
    try {
      const response = await instance.delete(`/exhibition/delete-exhibition/${userData}`, );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const EventSlice = createSlice({
  name: "Event",
  initialState: state,
  reducers: {
    reset: (state, action) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(AddEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.Events.addEvent = action.payload;
      })
      .addCase(AddEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // get all event state
      .addCase(GetAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.Events.getAllEvents = action.payload;
      })
      .addCase(GetAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      //edit event state
      .addCase(EditEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(EditEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      
      })
      .addCase(EditEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })


      //delete event state
      .addCase(DeleteEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
       
      })
      .addCase(DeleteEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
     
      });
  },
});

export default EventSlice.reducer;
export const { reset } = EventSlice.actions;
