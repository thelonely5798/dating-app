import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { result, startCase } from "lodash";
import { web3 } from "../../web3";
import { account, contractAddress, myContract, privateKey } from '../../web3/index';

const initialState = {
  address: "",
  logined: false,
  privateKey: "",
  error: {
    message: "",
    isError: false
  },
  isLoading: true
};

export const userLogin = createAsyncThunk("user/login", async (privateKey: string) => {
  privateKey = "0x".concat(privateKey)
  const address = web3.eth.accounts.wallet.add(privateKey).address
  web3.eth.defaultAccount = address
  const [id, name, , lng, lat, exists] = await myContract.methods.getUser().call({ from: address })
  if (!exists) {
    await myContract.methods.setUser().call({ from: address })
  }
  return { id, name, address, lng, lat, exists, privateKey }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoading: (state, action) => {
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true
    }),
      builder.addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.logined = true
        state.address = action.payload.address
      })
  }
});


export const { userLoading } = userSlice.actions;
export const isLogined = state => state.user.logined;
export const isLoginError = state => state.user.error.isError;
export const selectPrivateKey = state => state.user.privateKey;
export const selectAddress = state => state.user.address;
export default userSlice.reducer;