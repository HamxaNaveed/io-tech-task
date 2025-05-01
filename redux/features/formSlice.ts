import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SubscriptionStatus {
  type: "success" | "error" | null
  message: string
}

interface FormState {
  subscriptionStatus: SubscriptionStatus
  isSubmitting: boolean
}

const initialState: FormState = {
  subscriptionStatus: {
    type: null,
    message: "",
  },
  isSubmitting: false,
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSubscriptionStatus: (state, action: PayloadAction<SubscriptionStatus>) => {
      state.subscriptionStatus = action.payload
    },
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload
    },
    clearSubscriptionStatus: (state) => {
      state.subscriptionStatus = {
        type: null,
        message: "",
      }
    },
  },
})

export const { setSubscriptionStatus, setIsSubmitting, clearSubscriptionStatus } = formSlice.actions
export default formSlice.reducer
