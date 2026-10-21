const mongoose = require("mongoose");
const Note = require("./models/Note.js");

main().then(()=>{
    console.log("connection successful");
    
}).catch((err) => console.log(err));


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/notesApp")
}


let AllNotes = [
    {
    title: "Learning React",
    description: "Practice components, props and useState.",
    createdAt: new Date(),
  },
  {
    title: "Shopping List",
    description: "Buy milk, bread, fruits and vegetables.",
    createdAt: new Date(),
  },
  {
    title: "Daily Goals",
    description: "Complete backend routes and practice MongoDB.",
    createdAt: new Date(),
  },
  {
    title: "Project Ideas",
    description: "Build a Notes App using Node.js, Express and MongoDB.",
    createdAt: new Date(),
  },
  {
    title: "Interview Preparation",
    description: "Revise JavaScript, React and Node.js concepts.",
    createdAt: new Date(),
  }
]

Note.insertMany(AllNotes);