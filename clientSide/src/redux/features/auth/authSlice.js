import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FormData, instance } from "../../axios/axios";

const state = {
  user: null,
  userList: [],
  allArts:{},
  userArt:{
userGallery:{},
userSound:{}
  },
  contacts:{
    MessagesDetail:{},
  },
  FvrtArts:{},
  SubscribeList:{},
  VipMemberList:{},
  queryList:{},
  card:{},
  userDetail:{},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};





export const registerUser = createAsyncThunk(
  "/register-user",
  async (userData, thunkAPI) => {
    try {
      const response = await instance.post("/auth/signup/", {...userData});
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const getBlogCatagaries = createAsyncThunk(
  "/getBlogCatagaries",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get("/blog/get-blog-categories");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const loginUser = createAsyncThunk("/login-user", async (userData, thunkAPI) => {
    try {
      const response = await instance.post("/auth/login/", {...userData});
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const contactUs = createAsyncThunk("/qeury-users", async (userData, thunkAPI) => {
    
    try {
      const response = await instance.post("/query/add-Query/",userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const userAccountDetail = createAsyncThunk("/userAccountDetail", async (userData, thunkAPI) => {
    
  try {
    const response = await instance.post("user-account-detail",userData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);


export const getAllUsers = createAsyncThunk("/all-user", async (_, thunkAPI) => {
    try {
      const response = await instance.get(`/auth/users/`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const SubscribedList = createAsyncThunk("/api/stripe/fetch-customer-list", async (_, thunkAPI) => {
  try {
    const response = await instance.get(`/api/stripe/fetch-customer-list`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);


export const SubscriberDetailApi = createAsyncThunk("/SubscriberDetail", async (data, thunkAPI) => {
  try {
    const response = await instance.get(`/api/stripe/customer-subscription/${data}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);





export const CancelSubscriptionApi = createAsyncThunk("/CancelSubscriptionApi", async (userData, thunkAPI) => {
  try {
    const response = await instance.get(`/api/stripe/cancel-subscription/${userData}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);


export const ArtistCancelSubscriptonRequestApi = createAsyncThunk("/ArtistCancelSubscriptonRequestApi", async (userData, thunkAPI) => {
  try {
    const response = await instance.post(`/api/stripe/cancel-user-subscription`,userData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);

export const VipMembersList = createAsyncThunk("/all-vip-user", async (userData, thunkAPI) => {
  try {
    const response = await instance.get(`/auth/users/${userData}`);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);


//Send message to a artist
export const SendMessage = createAsyncThunk(
  "SendMessage",
  async (userData, thunkAPI) => {
    try {
      const response = await instance.post("chat/send-message", userData);
     
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);




//get chats list
export const ChatsList = createAsyncThunk(
  "ChatsList",
  async (userData, thunkAPI) => {
    try {
      const response = await instance.post("chat/get-chats", userData);
     
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



//get chat detail
export const ChatDetail = createAsyncThunk(
  "ChatDetail",
  async (userData, thunkAPI) => {
    try {
      const response = await instance.post("chat/get-chat-details", userData);
     
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



//api for block user for admin
export const BlockUser = createAsyncThunk("BlockUser", async (userData, thunkAPI) => {
    try {
      const response = await instance.post("access/bolck-user", userData);
     
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


//api for block user for admin
export const UnBlockUser = createAsyncThunk("/UnBlockUser", async (userData, thunkAPI) => {
    try {
      const response = await instance.post("access/unbolck-user", userData);
     
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



//delete user for admin
export const DeleteUser = createAsyncThunk("/UnBlockUser", async (userData, thunkAPI) => {
    try {
      const response = await instance.post("auth/user-delete", userData);
     
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


//delete queries for admin
export const DeleteQuery = createAsyncThunk("/UnBlockUser", async (userData, thunkAPI) => {
    try {
      const response = await instance.post("query/delete-query", userData);
     
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);






export const newPassword = createAsyncThunk("/new-password", async (userData, thunkAPI) => {
  
    try {
      const response = await instance.post("/auth/changePassword/", userData);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const UpdateUser = createAsyncThunk("/update-user", async (userData, thunkAPI) => {
    console.log(userData)
    try {
      const response = await FormData.put("/auth/user-update/", userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const UserRoles = createAsyncThunk("/access/get-roles", async (_, thunkAPI) => {
  
  try {
    const response = await instance.get("/access/get-roles/");
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}
);




export const getUserDetails = createAsyncThunk("/details-user", async (userData, thunkAPI) => {
    try {
      const response = await instance.post("/auth/user-details/", userData);
     
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);





export const ChangePassowrd = createAsyncThunk("/update-password", async (userData, thunkAPI) => {
    
    try {
      const response = await instance.post("/auth/changePassword/", userData);
     
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);





export const getAllArts = createAsyncThunk("/get-all-arts", async (userData, thunkAPI) => {
    try {
      
      const response = await instance.post("/art/get-arts/" , userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const getFvrtArts = createAsyncThunk("/favourite/get-user-favourite", async (userData, thunkAPI) => {
  try {
    
    const response = await instance.post("/favourite/get-user-favourite/",userData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
}
);




export const AddFvrtArts = createAsyncThunk("/favourite/Add-user-favourite", async (userData, thunkAPI) => {
  try {
    
    const response = await instance.post("/favourite/add-item-in-favourite/",userData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
}
);

export const DeleteFvrtArts = createAsyncThunk("/favourite/delete-user-favourite", async (userData, thunkAPI) => {
  try {
    
    const response = await instance.post("/favourite/delete-item-user-favourite/",userData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
}
);




export const getArtDetails = createAsyncThunk("/details-Art", async (userData, thunkAPI) => {
   
    try {
      const response = await instance.post("/art/get-art-details/",userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const getUserArts = createAsyncThunk("/get-user-arts", async (userData, thunkAPI) => {
  
  try {
    
    const response = await instance.post("/art/get-user-arts/" , userData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
}
);

export const getAllSound = createAsyncThunk("/get-all-sound", async (_, thunkAPI) => {
    try {
      const response = await instance.get("/sound/get-all-sounds/");

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserSound = createAsyncThunk("/get-user-sound", async (userData, thunkAPI) => {
    
    try {
      const response = await instance.post("/sound/get-user-sound/", userData);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);




export const addUserArt = createAsyncThunk("/add-user-art", async (userData, thunkAPI) => {
    
    try {
      const response = await FormData.post("/art/add-art/", userData);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);




export const addUserSound = createAsyncThunk("/add-user-sound", async (userData, thunkAPI) => {
    
    try {
      const response = await FormData.post("/sound/add-sound/", userData);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//api for update sound values
export const EditUserSound = createAsyncThunk("/edit-user-sound", async (userData, thunkAPI) => {
    
    try {
      const response = await FormData.post(
        `/sound/update-sounds`,
        userData
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);




//api for update sound values
export const EditUserArtApi = createAsyncThunk("/edit-user-art", async (userData, thunkAPI) => {
    
  try {
    const response = await FormData.post(
      `/art/update-art`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
}
);




//api for update sound values
export const DeleteUserArtApi = createAsyncThunk("/delete-user-art", async (userData, thunkAPI) => {
    
  try {
    const response = await instance.post(`/art/delete-arts`,userData);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
}
);




export const ConfirmDeleteUserSound = createAsyncThunk("/confirm-delete-user-sound", async (userData, thunkAPI) => {
    
    try {
      const response = await instance.post(`/sound/get-sounds/`, userData);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const DeleteUserSound = createAsyncThunk("/delete-user-sound", async (userData, thunkAPI) => {
    
    try {
      const response = await instance.post(`/sound/delete-sounds/`,userData);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);



//this api is for getting sound detail
export const getSoundDetail = createAsyncThunk("/SoundDetail", async (userData, thunkAPI) => {
    
  try {
    const response = await instance.post(`/sound/sound-details`,userData);

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
}
);




export const AddToMyFvrt = createAsyncThunk("/favourite", async (userData, thunkAPI) => {
    
    try {
      const response = await instance.post(
        `/favourite/add-to-favourite/`,
        userData
      );

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const DownloadMusic = createAsyncThunk("/sound-download", async (userData, thunkAPI) => {
    
    try {
      const response = await instance.get(`/sound/sounds/download/`, userData);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const getAllFvrtCollection = createAsyncThunk("/get-all-collection", async (_, thunkAPI) => {
    try {
      const response = await instance.get(`/collection/get-collection/`);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);




export const addNewCollection = createAsyncThunk("/addNewCollection", async (userData, thunkAPI) => {
    try {
      const response = await instance.post(`/collection/add-collection/`,{...userData});

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const musicFvrtCollections = createAsyncThunk("/musicFvrtCollections", async (userData, thunkAPI) => {
    try {
      const response = await instance.post(`/collection/add-to-favorite/`,{...userData});

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const Visibility = createAsyncThunk("/Visibility", async (userData, thunkAPI) => {
    try {
      const response = await instance.post(`/visibility/add-sound-visibility/`,{...userData});

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const ThankYouNote = createAsyncThunk("/ThankYouNote", async (userData, thunkAPI) => {
    try {
      const response = await instance.post(`/note/add-note/`,{...userData});

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);




export const getAllQueries = createAsyncThunk("/all-qeuries", async (_, thunkAPI) => {
    
    try {
      const response = await instance.get("/query/get-Queries/");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const getQueryDetails = createAsyncThunk("/getDetails-qeuries", async (userData, thunkAPI) => {
    
    try {
      const response = await instance.post("/query/get-query-details/",userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const addItemCart = createAsyncThunk("/cart/add-item-in-cart", async (userData, thunkAPI) => {
    
    try {
      const response = await instance.post("/cart/add-item-in-cart/",userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const UserCardInfo = createAsyncThunk("/UserCardInfo", async (userData, thunkAPI) => {
    
    try {
      const response = await instance.post("/auth/add-user-card/",userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);




export const getUserCardInfo = createAsyncThunk("/GetUserCardInfo", async (userData, thunkAPI) => {
    try {
      const response = await instance.post("/auth/get-user-cards/",userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const DeleteCardInfo = createAsyncThunk("/DeleteCardInfo", async (userData, thunkAPI) => {
    try {
      const response = await instance.post("/auth/delete-user-card/",userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const authSlice = createSlice({
  name: "auth",
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





    .addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
      state.message = action.payload.message;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.SubscribeList = null;
    })



    .addCase(SubscribedList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(SubscribedList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.SubscribeList = action.payload;
   
    })
    .addCase(SubscribedList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.SubscribeList = null;
    })


    .addCase(VipMembersList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(VipMembersList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.VipMemberList = action.payload;
   
    })
    .addCase(VipMembersList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.VipMemberList = null;
    })


//get the contacts list of artists 
    .addCase(ChatsList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(ChatsList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.contacts = action.payload;
      state.message = action.payload.message;
    })
    .addCase(ChatsList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    })



    //get the contacts list of artists 
    .addCase(ChatDetail.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(ChatDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.contacts.MessagesDetail = action.payload;
      state.message = action.payload.message;
    })
    .addCase(ChatDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    })



    .addCase(contactUs.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(contactUs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
      state.message = action.payload.message;
    })
    .addCase(contactUs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    })




      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
       
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })




      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })





      .addCase(newPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload;
      })
      .addCase(newPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })




      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.userDetail = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userDetail = null;
      })



      .addCase(ChangePassowrd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ChangePassowrd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(ChangePassowrd.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })




     

      .addCase(getAllArts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllArts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.allArts = action.payload;
      })
      .addCase(getAllArts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })



      .addCase(getFvrtArts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFvrtArts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.FvrtArts = action.payload;
      })
      .addCase(getFvrtArts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.FvrtArts = null;
      })




      
      .addCase(getArtDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArtDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
       
      })
      .addCase(getArtDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
    
      })



      .addCase(getUserArts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserArts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userArt.userGallery = action.payload;
        
      })
      .addCase(getUserArts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })





      .addCase(getAllSound.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSound.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        let sound = action.payload;
        if (state?.userList) {
          state.userList = { ...state.userList, sound: sound };
        }
        state.userList = { ...state?.userList, sound: sound };
      })
      .addCase(getAllSound.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })






      .addCase(getUserSound.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserSound.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        state.userArt.userSound = action.payload;
      })
      .addCase(getUserSound.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })




      .addCase(addUserArt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserArt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
         state.userList = action.payload;
       
      })
      .addCase(addUserArt.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })




      .addCase(addUserSound.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserSound.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
         state.userList = action.payload;
       
      })
      .addCase(addUserSound.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })

      .addCase(EditUserSound.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(EditUserSound.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.userList = action.payload;
      })
      .addCase(EditUserSound.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })

      .addCase(ConfirmDeleteUserSound.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ConfirmDeleteUserSound.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.userList = action.payload;
      })
      .addCase(ConfirmDeleteUserSound.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })

      .addCase(DeleteUserSound.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteUserSound.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload.message;
   state.userList = action.payload
})
      .addCase(DeleteUserSound.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })

      .addCase(AddToMyFvrt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddToMyFvrt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.userList = action.payload;
      })
      .addCase(AddToMyFvrt.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })

      .addCase(DownloadMusic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DownloadMusic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.userList = action.payload;
      })
      .addCase(DownloadMusic.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })



      .addCase(getAllFvrtCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFvrtCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        let FvrtCollections = action.payload;
        if (state?.userList) {
          state.userList = { ...state.userList, FvrtCollections: FvrtCollections };
        }
        state.userList = { ...state?.userList, FvrtCollections: FvrtCollections };
     
      })
      .addCase(getAllFvrtCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })
      




      .addCase(addNewCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        let newCollection = action.payload;
        if (state?.userList?.FvrtCollections) {
          state.userList.FvrtCollections = {
            ...state.userList.FvrtCollections,
            FvrtCollections: newCollection,
          };
        }
        state.userList = {
          ...state?.userList.FvrtCollections,
          FvrtCollections: newCollection,
        };
      })
      .addCase(addNewCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })




      

      .addCase(musicFvrtCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(musicFvrtCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.userList = action.payload;
        
      })
      .addCase(musicFvrtCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })



      .addCase(Visibility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Visibility.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.userList = action.payload;
        
      })
      .addCase(Visibility.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })




      
      .addCase(ThankYouNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ThankYouNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.userList = action.payload;
        
      })
      .addCase(ThankYouNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userList = null;
      })




      .addCase(getAllQueries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllQueries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
         state.queryList = action.payload
      })
      .addCase(getAllQueries.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.queryList = null;
      })


    
      .addCase(getUserCardInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCardInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
         state.card = action.payload
      })
      .addCase(getUserCardInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.card = null;
      })



      //getSoundDetail state for loader
      .addCase(getSoundDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSoundDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

      })
      .addCase(getSoundDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
    
      })



      .addCase(EditUserArtApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(EditUserArtApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

      })
      .addCase(EditUserArtApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
    
      })




      .addCase(DeleteUserArtApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteUserArtApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

      })
      .addCase(DeleteUserArtApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
    
      })





   
  },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
