// ================ BASIC SETUP =================

let express = require ("express");
const app = express();
const port = 8080;

const path = require("path");

app.use(express.urlencoded({extended : true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));


app.listen(port, () => {
    console.log("App is listening on port : 8080")
});

//  ============================================= 


// pseudo databse
let posts = [
    {
        id : "1a",
        username : "apnaCollege",
        content : "I love coding!"
    },
    {
        id : "2b",
        username : "shraddhaMa'am",
        content : "Hard work is important,"
    },
    {
        id : "3c",
        username : "amanSir",
        content : "Do what you love!"
    },
    {
        id : "4d",
        username : "masamasaowl",
        content : "Working on backend Quora!"
    }
];


// ======================== PATHS =====================

// homepage
app.get("/", (req,res) => {
    res.render("home")
});

// ====================== Index Route =================
// to get data of all post 
app.get("/posts", (req, res) => {
    res.render("index", {posts})
});


// ==================== Create Route =================
// a form to accept the new username and content 
app.get("/posts/new", (req,res) => {
    res.render("newUser" );
});

// we set action of form as /posts so we expect a POST request (method) on path /posts
app.post("/posts", (req,res) => {
    // store username and content from req.body
    let {username,content} = req.body;
    console.log(req.body);

    // push data into the array by push method
    // posts.push({username,content});

    //or to push at start select index [0]
    posts[0] = {username,content}; 

    // now automatically redirect to /posts 
    res.redirect('/posts');
    // see instead of 
    // res.send("your post was created") we simply redirect it after creating the new object in the array
});
 

// ====================== View route ================

// we retrive our id via GET request
app.get("/posts/:id", (req,res) => {

    // when we type /posts/1a it is stored
    let {id} = req.params;

    // we use the find method of array (p is the parameter representing the array)
    let post = posts.find((p) => id === p.id);
    console.log(post);

    // when the requested id is entered, we render back the alotted post 
    // the single post is stored in show.ejs
    res.render("show", {post})
});
 

