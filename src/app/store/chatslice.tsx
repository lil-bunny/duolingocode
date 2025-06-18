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
        const res = await axios.get('http://127.0.0.1:8000/load_data/amit'); // your backend API
        console.log("res.data",res.data)
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
        // const res = await axios.post('/api/messages', message); // your backend API
        // return res.data;
        console.log({
            uid: 'amit',
            message: message.parts,
          })
        const response = await axios.post('http://127.0.0.1:8000/chat', {
            uid: 'amit',
            message: message.parts,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log(response.data)
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
         
                state.messages = action.payload;
              })
              .addCase(loadMessageAsync.rejected, () => {
            
              })
  
        .addCase(addMessageAsync.pending, () => {
        
        })
        .addCase(addMessageAsync.fulfilled, (state, action: PayloadAction<MessageState>) => {
            console.log("balerr state",action.payload.parts)
            // const match = action.payload.parts.match(/"teacher_text"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/);
            const res=action.payload.parts
            let final_res=''
            try {
                const parsed = JSON.parse(JSON.parse(res));
                console.log('dadur=----',typeof(parsed));
                final_res=parsed.teacher_text
              } catch (e) {
                console.error("Invalid JSON", e);
              }
            // console.log(teacherText);

            state.messages.push({"role":"model","parts":final_res})
            console.log("baler state",state.messages)
            console.log(state.messages)
        })
        .addCase(addMessageAsync.rejected, () => {

        });
    }


})


export default chatSlice.reducer;
