// ================ BASIC SETUP =================

let express = require ("express");
const app = express();
const port = 8080;
const {v4 : uuidv4} = require ("uuid");
const methodOverride = require ("method-override");

const path = require("path");

app.use(methodOverride("_method"));

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
        id : uuidv4(),
        username : "apnaCollege",
        content : "I love coding!"
    },
    {
        id : uuidv4(),
        username : "shraddhaMa'am",
        content : "Hard work is important!"
    },
    {
        id : uuidv4(),
        username : "amanSir",
        content : "Do what you love!"
    },
    {
        id : uuidv4(),
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

    // give new id to the post
    let id = uuidv4();

    // push data into the array by push method
    // posts.push({username,content});

    //or to push at start select index [0]
    posts[0] = {id,username,content}; 

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
    res.render("show", {post});
});
 

// ===================== Update route ==============

// a form to accept the update in content 
app.get("/posts/:id/update", (req,res) => {
    // same as view route we collect id to display both id and username on the update route
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);

    // render the update form
    res.render("update", {post});
});

//  
app.patch("/posts/:id", (req, res) => {
    // this time we collect id to let PATCH know which post was updated
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);

    // like POST, even PATCH has a body and inside it is the posts content which we store in newContent
    let newContent = req.body.content;

    // then we update the post content 
    post.content = newContent;

    // taking a confirmation
    // res.send("patch request working");

    // redirecting
    res.redirect("/posts")
});


// ===================== Delete route =================

app.delete("/posts/:id/delete", (req, res) => {
    // again extract the id and post
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);

    // now we filter out everything other than the post to be deleted and store it in the posts again 
    posts = posts.filter((p) => id !== p.id);

    // the new posts array is printed automatically as the filtered objects are now stored in it 
    res.redirect("/posts");
});



// ==================== THANK YOU SO MUCH SHRADDHA MA'AM FOR HELPING ME BULID SUCH A GREAT APPLICATION ======================