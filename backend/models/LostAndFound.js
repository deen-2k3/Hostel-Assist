import mongoose from "mongoose";
const LostFoundSchema=new mongoose.Schema({
  Title:{
    type:String,
    require:true,
  },
  Description:{
    type:String,
    require:true,
  },
  Location:{
     type:String,
     require:true,
  },
  Status:{
    type: String,
      enum: ["Pending", "Found", "Returned"],
     // required: true,
  },
  Image:{
    type:String

  },
  reportedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
});
export const LostAndFound = mongoose.model("LostAndFound", LostFoundSchema);
