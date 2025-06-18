import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface MessageState{
    role: string,
    parts: string
}
interface ChatState{
    messages:MessageState[]
}
const initialState:ChatState={
    messages:[]
}

export const loadMessageAsync=createAsyncThunk<
MessageState[],void,{rejectValue:string}
>
('chat/loadMessageAsync',async(_,thunkAPI)=>{
    try {
        const pathSegments = window.location.pathname.split("/");
        const uid = pathSegments[1]; 
        // const res = await axios.get('https://1f4f-150-129-64-107.ngrok-free.app/load_data/amit', {
        //     headers: {
        //       Accept: 'application/json',
        //     },
        //   }); // yo
        // const res = await axios.get('/api/load_data');
        const res = await axios.get(`/api/load_data?uid=${uid}`);


          // 
          // ur backend API
          
        // console.log(res.data)
        return res.data; // should be an array of messages
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load messages';
        return thunkAPI.rejectWithValue(errorMessage);
      }

})

export const addMessageAsync=createAsyncThunk<
MessageState,MessageState,
{rejectValue:string}>("chat/addMessageAsync",async (message,thunkAPI)=>{
    try{
        const pathSegments = window.location.pathname.split("/");
        const uid = pathSegments[1]; 
        // console.log({
        //     uid: uid,
        //     message: message.parts,
        //   })

        const response = await axios.post('/api/chat', {
            uid: uid,
            message: message.parts,
          });
        //   console.log('bal1',response.data)
          return {"role":"model","parts":response.data};
    }catch(err: unknown){
        const errorMessage = err instanceof Error ? err.message : 'api error';
        return thunkAPI.rejectWithValue(errorMessage);
    }
})
const chatSlice=createSlice({
    name:"chat",
    initialState,
    reducers:{
        addMessage(state,action:PayloadAction<MessageState>){
            state.messages.push(action.payload)
        }
        

    },extraReducers:(builder)=>{
        builder
              .addCase(loadMessageAsync.pending, () => {
             
              })
              .addCase(loadMessageAsync.fulfilled, (state, action) => {
                // console.log("babr badul", action.payload)
                state.messages = action.payload;
              })
              .addCase(loadMessageAsync.rejected, () => {
            
              })
  
        .addCase(addMessageAsync.pending, () => {
        
        })
        .addCase(addMessageAsync.fulfilled, (state, action: PayloadAction<MessageState>) => {
            // console.log("balerr state",action.payload.parts)

            // console.log(teacherText);
          
            state.messages =[{"role":"model","parts":action.payload.parts}]
            
            // console.log("baler state",state.messages)
            // console.log(state.messages)
        })
        .addCase(addMessageAsync.rejected, () => {

        });
    }


})


export default chatSlice.reducer;
