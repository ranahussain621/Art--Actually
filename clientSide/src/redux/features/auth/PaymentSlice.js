
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  FormData, instance } from "../../axios/axios";

const state = {
  paymentManagement: {
    AllPayments:{},
    AllPayoutList:{},
    Stripe:{}
  },
  blogList:{},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//get the list of all payment
export const getAllPayments = createAsyncThunk(
    "getAllPayments",
    async (userData, thunkAPI) => {
      
      try {
        const response = await instance.post("/payment/get-all-payments",userData);
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.error || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

//get the detail of single transcation
  export const paymentDetail = createAsyncThunk(
    "paymentDetail",
    async (userData, thunkAPI) => {
      
      try {
        const response = await instance.post("/payment/get-payment-details",userData);
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.error || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );



  //Send payout request to admin
  export const SendPayoutAmount = createAsyncThunk(
    "SendPayoutAmount",
    async (userData, thunkAPI) => {
      
      try {
        const response = await instance.post("/payment/request-payout",userData);
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.error || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  

  //upload receipt to complete payout request
  export const UploadReceipt = createAsyncThunk(
    "UploadReceipt",
    async (userData, thunkAPI) => {
      
      try {
        const response = await FormData.post("/payment/send-payout",userData);
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.error || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  ); 

  
  //add donation amount 
  export const AddDonation = createAsyncThunk(
    "UploadReceipt",
    async (userData, thunkAPI) => {
      
      try {
        const response = await instance.post("/payment/add-payment",userData);
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.error || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  ); 
  
  
  //get all payout records
  export const AllPayoutRequestList = createAsyncThunk(
    "AllPayoutRequestList",
    async (_, thunkAPI) => {
      
      try {
        const response = await instance.post("/payment/all-payout");
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.error || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );



  export const CreateUserForSubscription = createAsyncThunk("CreateUserForSubscription",
    async (userData, thunkAPI) => {
      
      
      try {
        const response = await instance.post("/api/stripe/create-user/",userData);
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.error || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );



//check the status of user subscription status
  export const CheckUserSubStatus = createAsyncThunk("CheckUserSubStatus",
    async (userData, thunkAPI) => {
      
      
      try {
        const response = await instance.get(`/api/stripe/customer-subscription-status/${userData}`,);
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.error || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );



  export const CreateSessionForSubscription = createAsyncThunk("CreateSessionForSubscription",
  async (userData, thunkAPI) => {
   
    
    try {
      const response = await instance.post("/api/stripe/create-session/",userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

  //get all blogs of website
  export const ListOfBlogs = createAsyncThunk("ListOfBlogs",async (data, thunkAPI) => {
      
      try {
        const response = await instance.post("/blog/blogs",data);
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.error || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

   //get all blogs of website
   export const SingleBlog = createAsyncThunk("SingleBlog",async (data, thunkAPI) => {
      
    try {
      const response = await instance.post("/blog/blogs",data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


    //upload blog by admin
    export const AddBlog = createAsyncThunk(
      "AddBlog",
      async (data, thunkAPI) => {
        
        try {
          const response = await FormData.post("/blog/add-blog",data);
          return response.data;
        } catch (error) {
          const message =
            error.response?.data?.error || error.message || error.toString();
          return thunkAPI.rejectWithValue(message);
        }
      }
    );
        //upload blog by admin
        export const EditBlogApi = createAsyncThunk(
          "EditBlogApi",
          async (data, thunkAPI) => {
            
            try {
              const response = await FormData.post("/blog/update-blog",data);
              return response.data;
            } catch (error) {
              const message =
                error.response?.data?.error || error.message || error.toString();
              return thunkAPI.rejectWithValue(message);
            }
          }
        );
    


      //get all payout records
  export const DeleteBlogApi = createAsyncThunk(
    "DeleteBlogApi",
    async (data, thunkAPI) => {
      
      try {
        const response = await instance.post("/blog/delete-blog",data);
        return response.data;
      } catch (error) {
        const message =
          error.response?.data?.error || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );


  export const paymentSlice = createSlice({
    name: "PaymentManagment",
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


    //get all payout records
      .addCase(getAllPayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentManagement.AllPayments = action.payload;
        state.message = action.payload.message;
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })




       //get all the list of payements
       .addCase(AllPayoutRequestList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllPayoutRequestList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentManagement.AllPayoutList = action.payload;
        state.message = action.payload.message;
      })
      .addCase(AllPayoutRequestList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })



      .addCase(CreateUserForSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateUserForSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentManagement.Stripe = action.payload;
      })
      .addCase(CreateUserForSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
     


      .addCase(CreateSessionForSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateSessionForSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentManagement.Stripe = action.payload;
      })
      .addCase(CreateSessionForSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
  
 //list of all blogs 
      .addCase(ListOfBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ListOfBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogList = action.payload;
      })
      .addCase(ListOfBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.blogList = null;
      })
  
     //upload blog by admin
      .addCase(AddBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
   
      })
      .addCase(AddBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
     
      })

         //Delete blog by admin
         .addCase(DeleteBlogApi.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(DeleteBlogApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
     
        })
        .addCase(DeleteBlogApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
       
        })


         //update blog by admin
         .addCase(EditBlogApi.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(EditBlogApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
     
        })
        .addCase(EditBlogApi.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
       
        })
    
  

    },
  });
  
  export default paymentSlice.reducer;
  export const { reset } = paymentSlice.actions;
  