// Michael Stone - u21497682
import express from "express";
import path from "path";

//CREATE APP
const app = express();

//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static(path.join(__dirname, "../../frontend/public")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public', 'index.html'));
});

//PORT TO LISTEN TO
// app.listen(process.env.PORT, () => {
//     console.log(`Listening on http://localhost:${process.env.PORT}`);
// });

//Original without docker
app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});